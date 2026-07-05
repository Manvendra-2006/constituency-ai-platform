import BlackList from "../models/BlackListModel.js"
import Complaint from "../models/ComplaintModel.js"
import jwt from 'jsonwebtoken'
import {
  analyzeComplaint,
  analyzeImageComplaint,
} from "../services/ai.service.js";
// ye api compaint create kregi - User Dashboard


// User Complaint Create API
export async function ComplaintController(req, resp) {
  try {
const {
    village,
    originalComplaint,
    latitude,
    longitude,
} = req.body;
    const complaintText = typeof originalComplaint === "string" ? originalComplaint.trim() : "";

    // Village mandatory
    if (!village) {
      return resp.status(400).json({
        message: "Village is required",
      });
    }

    // Complaint text ya image me se koi ek hona chahiye
    if (!complaintText && !req.file) {
      return resp.status(400).json({
        message: "Either complaint text or image is required",
      });
    }

    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return resp.status(401).json({
        message: "Authentication Required",
      });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY
    );

    
    const complaint = await Complaint.create({
    village,
    originalComplaint: complaintText,
    latitude,
    longitude,
    userId: decoded.id,
    image: req.file ? req.file.path : null,
});
    console.log("Complaint created:", complaint._id);

    let aiErrorMessage = null;
    if (req.file || complaintText) {
      try {
        console.log("Body:", req.body);
        console.log("File:", req.file);
        console.log("Complaint:", complaintText);

        console.log("AI request started:", complaint._id);
        let aiResponse;

        if (req.file && complaintText) {
          // Image + Text dono
          aiResponse = await analyzeImageComplaint(
            req.file.path,
            complaintText
          );
        } else if (req.file) {
          // Sirf Image
          aiResponse = await analyzeImageComplaint(req.file.path);
        } else {
          // Sirf Text
          aiResponse = await analyzeComplaint(complaintText);
        }

        console.log("AI response:", aiResponse);

        complaint.aiResponse = aiResponse;
        complaint.aistatus = "analyzed";
        complaint.aiStatus = "analyzed";

        await complaint.save();

        console.log("Complaint updated:", complaint._id);
      } catch (aiError) {
        console.error("AI Error:", aiError);

        complaint.aistatus = "failed";
        complaint.aiStatus = "failed";
        complaint.aiResponse = null;
        await complaint.save();

        aiErrorMessage = `Complaint saved, but AI analysis failed: ${aiError.message || "Unknown error"}`;
      }
    }

    return resp.status(201).json({
      message: aiErrorMessage || "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return resp.status(401).json({
        message: "Access token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return resp.status(401).json({
        message: "Invalid access token",
      });
    }

    console.error(error);

    return resp.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// User Complaint List API
 // ye api tab use hogi jab user ko apne dashboard main sirf apne complatintes ke liye - USer Dashboard
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
       if(error.name==="TokenExpiredError"){
    return resp.status(401).json({
        message:"Access token expired"
    })
}

if(error.name==="JsonWebTokenError"){
    return resp.status(401).json({
        message:"Invalid access token"
    })
}
    return resp.status(500).json({ message: 'Internal server error', error });
  }
}
