import BlackList from "../models/BlackListModel.js"
import Complaint from "../models/ComplaintModel.js"
import jwt from 'jsonwebtoken'
import { analyzeComplaint } from "../services/ai.service.js"
export async function ComplaintController(req,resp){
    try{
        const {village,originalComplaint} = req.body
        if(!village||!originalComplaint){
            return resp.status(400).json({message:"All Fields are required"})
        }
      const accessToken = req.headers.authorization?.split(" ")[1]
      if(!accessToken){
        return resp.status(401).json({message:"Authentication Required"})
      }
      const decoded = jwt.verify(accessToken,process.env.JWT_SECRET_KEY)
      const blacklist = await BlackList.findOne({Id:decoded.id,accessToken})
      if(blacklist){
        return resp.status(400).json({message:"Access Token is Blacklisted"})
      }
      const complaint = await Complaint.create({
        village,
        originalComplaint,
        userId:decoded.id
      })
      if(complaint){
       const aiResponse = await analyzeComplaint(originalComplaint); 
       complaint.aiResponse  = aiResponse
       complaint.status = 'analyzed'
       await complaint.save()
      }
      return resp.status(201).json({message:"Ai response analyasis fetched successfully",complaint})
    }
    catch(error){
        return resp.status(500).json({message:"Internal server error",error})
    }
}

export async function getMyComplaintsController(req, resp) {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      return resp.status(401).json({ message: 'Authentication Required' });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const complaints = await Complaint.find({ userId: decoded.id }).sort({ createdAt: -1 });

    return resp.status(200).json({ message: 'Complaints fetched successfully', complaints });
  } catch (error) {
    return resp.status(500).json({ message: 'Internal server error', error });
  }
}

// export async function getMySpecificComplaintController(req,resp){
//   try{

//   }
//   catch(error)
// }