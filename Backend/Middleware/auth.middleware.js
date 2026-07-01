import BlackList from "../models/BlackListModel.js"
import jwt from 'jsonwebtoken'

export async function AuthMiddleware(req, resp, next) {
    try {
        const refreshToken = req.cookies.refreshToken
        const accessToken = req.headers.authorization?.split(" ")[1]

        if (!accessToken) {
            return resp.status(401).json({ message: "Access Token required" })
        }

        if (!refreshToken) {
            return resp.status(401).json({ message: "Refresh Token required" })
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        const blackList = await BlackList.findOne({ Id: decoded.id, accessToken })

        if (blackList) {
            return resp.status(401).json({ message: "Token is BlackListed" })
        }

        // req.user = decoded
        return next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return resp.status(401).json({
                message: "Access token expired"
            })
        }

        if (error.name === "JsonWebTokenError") {
            return resp.status(401).json({
                message: "Invalid access token"
            })
        }

        return resp.status(500).json({ message: "Intenal server error", error })
    }
}