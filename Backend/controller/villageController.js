import VillageData from "../models/VillageDataModel.js";
import Complaint from "../models/ComplaintModel.js";
import { analyzeVillage } from "../services/villageAI.service.js";
export const getVillageProfile = async (req, res) => {
  try {
    const { village } = req.params;

    console.log("Requested Village:", village);

    const villageData = await VillageData.findOne({
      villageName: { $regex: new RegExp(`^${village}$`, "i") },
    });

    console.log("Village Data:", villageData);

    if (!villageData) {
      return res.status(404).json({
        message: "Village not found",
      });
    }

    const complaints = await Complaint.find({
      village: { $regex: new RegExp(`^${village}$`, "i") },
    });
const complaintSummary = complaints.map((complaint) => ({
  category: complaint.aiResponse?.category,
  subcategory: complaint.aiResponse?.subcategory,
  summary: complaint.aiResponse?.summary,
  urgency: complaint.aiResponse?.urgency,
}));
const aiAnalysis = await analyzeVillage(
  villageData,
  complaintSummary
);
   return res.status(200).json({
  success: true,
  villageData,
  complaints,
  totalComplaints: complaints.length,
  aiAnalysis,
});
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};