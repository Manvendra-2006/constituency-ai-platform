import Complaint from "../models/ComplaintModel.js";

export async function getComplaintLocations(req, res) {
  try {
    const complaints = await Complaint.find(
      {
        latitude: { $ne: null },
        longitude: { $ne: null },
      },
      {
        village: 1,
        latitude: 1,
        longitude: 1,
        complaintStatus: 1,
        aiResponse: 1,
      }
    );

    res.status(200).json({
      locations: complaints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch locations",
      error: error.message,
    });
  }
}