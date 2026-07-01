import BlackList from "../models/BlackListModel.js"
import Complaint from "../models/ComplaintModel.js"

import jwt from 'jsonwebtoken'
export async function AnalyticsController(req, resp) {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1]
        if (!accessToken) {
            return resp.status(401).json({ message: "Access Token required" })
        }
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        const blackList = await BlackList.findOne({Id:decoded.id,accessToken})
        if(blackList){
            return resp.status(401).json({message:"Token is BlackListed"})
        }
        const totalComplaints  =await Complaint.countDocuments()
        const pendingComplaint = await Complaint.countDocuments(
            {
                status:'pending'
            }
        )
        const analyzedComplaint = await Complaint.countDocuments({
            status:'analyzed'
        })
        const categoryWiseComplaint = await Complaint.aggregate([
            {
                $group:{
                    _id:"$aiResponse.category",
                    count:{
                        $sum:1
                    }
                }
            },
            {
                $project:{
                    _id:0 ,// id ko hide karo
                    category:"$_id",
                    count:1
                }
            },
            {
                $sort:{
                    count:-1
                }
            }
        ])
        const subcategoryWise = await Complaint.aggregate([
            {
                $group:{
                    _id:"$aiResponse.subcategory",
                    count:{
                        $sum:1
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    subcategory:"$_id",
                    count:1
                }
            },{
                $sort:{
                    count:-1
                }
            }
        ])
        const villageWiseComplaint = await Complaint.aggregate([
            {
                $group:{
                    _id:"$village",
                    count:{
                        $sum:1
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    village:"$_id",
                    count:1
                }
            },
            {
                $sort:{
                    count:-1
                }
            }
        ])
        return resp.status(200).json({
    totalComplaints: totalComplaints ,
    pending: pendingComplaint,
    analyzed: analyzedComplaint,
    categoryWise: categoryWiseComplaint,
    subcategoryWise:subcategoryWise,
    villageWise:villageWiseComplaint
})
    }

    catch (error) {
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