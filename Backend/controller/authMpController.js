import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import MPModel from "../models/MpModel.js"
import SessionMp from "../models/sessionMpModel.js"
import BlackList from "../models/BlackListModel.js"
export async function RegisterMpController(req,resp){
    try{
        const {name,email,password, state,governmentId,constituencyNumber,constituencyName} = req.body
        if(!name||!email||!password||!state||!constituencyName||!constituencyNumber||!governmentId){
            return resp.status(400).json({message:"All fields are required"})
        }
        const isMpExists = await MPModel.findOne({email})
        if(isMpExists){
return resp.status(409).json({
    message:"MP already registered"
})
        }
        const hashPassword = await bcrypt.hash(password,10)
        if(!hashPassword){
            return resp.status(400).json({message:"Password is not hashed properly"})
        }
        const mp = await MPModel.create({
            name,
            email,
            password:hashPassword,
            governmentId,
            constituencyName,
            constituencyNumber,
            state
        })
        if(!mp){
            return resp.status(400).json({message:"Registration is not doing properly"})
        }
        const refreshToken = await jwt.sign(
            {id:mp._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"7d"}
        )
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
        const session = await SessionMp.create({
            ip:req.ip,
            userAgent:req.headers["user-agent"],
            roleId:mp._id,
            refreshTokenHash
        })
        const accessToken = await jwt.sign(
            {id:mp._id,sessionId:session._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"15m"}
        )
        resp.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:7 * 24 * 60 * 60 * 1000
        })
        return resp.status(201).json({message:"mp is registered Successfully",accessToken,mp})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}
export async function loginMpController(req,resp){
    try{
        const {email,password} = req.body
        if(!email||!password){
            return resp.status(400).json({message:"All Fields are required"})
        }
        const isUserExists = await MPModel.findOne({email})
        if(!isUserExists){
           return resp.status(401).json({
    message:"Invalid email or password"
})
        }
        const compare = await bcrypt.compare(password,isUserExists.password)
        if(!compare){
return resp.status(401).json({
    message:"Invalid email or password"
})
        }
        const refreshToken = await jwt.sign(
            {id:isUserExists._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"7d"}
        )
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
        const session = await SessionMp.create({
            refreshTokenHash,
            ip:req.ip,
            userAgent:req.headers["user-agent"],
            roleId:isUserExists._id
        })
        const accessToken = await jwt.sign(
            {id:isUserExists._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"15m"}
        )
        resp.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:7 * 24 * 60 * 60 * 1000
        })
        return resp.status(200).json({message:"Login Successfully",isUserExists,accessToken})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}
export async function logoutMpController(req,resp){
    try{
        const accessToken = req.headers.authorization?.split(" ")[1]
        const refreshToken = req.cookies.refreshToken
           if(!accessToken||!refreshToken){
return resp.status(401).json({
    message:"Authentication required"
})
        }
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
        const decoded =  jwt.verify(accessToken,process.env.JWT_SECRET_KEY)
        const session = await SessionMp.findOne({
            revoked:false,
            refreshTokenHash,
            roleId:decoded.id
        })
        if(session){        
        session.revoked = true
        await session.save()
        }
        const blacklist = await BlackList.create({
            Id:decoded.id,
            accessToken
        })
        if(blacklist){
            resp.clearCookie("refreshToken")
            return resp.status(200).json({message:"Logout Successfully"})
        }
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}
export async function RefreshTokenMpController(req,resp){
    try{
        const refreshToken = req.cookies.refreshToken
       
       if (!refreshToken) {
    return resp.status(401).json({
        message: "Refresh token required"
    })
}
 const decoded = jwt.verify(refreshToken,process.env.JWT_SECRET_KEY)
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
        const session = await SessionMp.findOne({
            refreshTokenHash,
            revoked:false,
            roleId:decoded.id
        })
        if(!session){
            return resp.status(401).json({
    message:"Invalid or expired refresh token"
})
        }
        const accessToken = await jwt.sign(
            {id:decoded.id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"15m"}
        )
        const newrefreshToken = await jwt.sign(
            {id:decoded.id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"7d"}
        )
        const newrefreshTokenHash = crypto.createHash("sha256").update(newrefreshToken).digest("hex")
        session.refreshTokenHash = newrefreshTokenHash
        await session.save()
        resp.cookie("refreshToken",newrefreshToken,{
            httpOnly:true,
            sameSite:"strict",
            secure:true,
            maxAge:7 * 24 * 60 * 60 * 1000
        })
       return resp.status(200).json({
    message:"Access token refreshed",
    accessToken
})
    }
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}

export async function getMeMpController(req,resp){
    try{
        const accessToken = req.headers.authorization?.split(" ")[1]
        const refreshToken = req.cookies.refreshToken
        if(!accessToken||!refreshToken){
return resp.status(401).json({
    message:"Authentication required"
})
        }
        const decoded = jwt.verify(accessToken,process.env.JWT_SECRET_KEY)
        const userProfile = await MPModel.findById(decoded.id)
        if(!userProfile){
          return resp.status(404).json({
    message:"MP not found"
})
        }
        return resp.status(200).json({
    message:"MP profile fetched successfully",
    userProfile
})
    }   
    catch(error){
        return resp.status(500).json({message:"Internal Server Error",error})
    }
}