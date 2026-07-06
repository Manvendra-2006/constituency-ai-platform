import VillageData from "../models/VillageDataModel.js";
import Complaint from "../models/ComplaintModel.js"
import { generateAIInsight } from "../services/aiInsight.service.js"
import jwt from 'jsonwebtoken'
// ye api anlytics data dikege mp dashboard main
export async function AnalyticsController(req, resp) {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1]
        if (!accessToken) {
            return resp.status(401).json({ message: "Access Token required" })
        }
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        const totalComplaints = await Complaint.countDocuments()
        const pendingComplaint = await Complaint.countDocuments(
            {
                aistatus: 'pending'
            }
        )
        const analyzedComplaint = await Complaint.countDocuments({
            aistatus: 'analyzed'
        })
        const categoryWiseComplaint = await Complaint.aggregate([
            {
                $group: {
                    _id: "$aiResponse.category",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,// id ko hide karo
                    category: "$_id",
                    count: 1
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ])
        const subcategoryWise = await Complaint.aggregate([
            {
                $group: {
                    _id: "$aiResponse.subcategory",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    subcategory: "$_id",
                    count: 1
                }
            }, {
                $sort: {
                    count: -1
                }
            }
        ])
        const villageWiseComplaint = await Complaint.aggregate([
            {
                $group: {
                    _id: "$village",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    village: "$_id",
                    count: 1
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ])
        return resp.status(200).json({
            totalComplaints: totalComplaints,
            pending: pendingComplaint,
            analyzed: analyzedComplaint,
            categoryWise: categoryWiseComplaint,
            subcategoryWise: subcategoryWise,
            villageWise: villageWiseComplaint
        })
    }

    catch (error) {
        return resp.status(500).json({ message: "Intenal server error", error })
    }
}
// ye api mp ko alllow kregi ki vo comaintStatus ko update kar ske
export async function StatusController(req, resp) {
    try {
        const complaintId = req.params.complaintId
        const { complaintStatus } = req.body
        if (!complaintStatus) {
            return resp.status(404).json({ message: "Complaint Status required" })
        }
        if (!complaintId) {
            return resp.status(400).json({ message: "ComplaintId required" })
        }
        const complaint = await Complaint.findById(complaintId)
        if (!complaint) {
            return resp.status(400).json({ message: "Complaint Not found" })
        }
        complaint.complaintStatus = complaintStatus
        await complaint.save()
        return resp.status(200).json({ message: "Status is updated Successfully" })
    }
    catch (error) {
        return resp.status(500).json({ message: "Internal Server Error", error })
    }
}

// ye api tab use hogi jab mp jab complaint list dekhega usme jab vo view tab open hoga toh vo new page par redirect hoga jaha par uska pura
// information milega user name complaint etc
export async function getMySpecificComplaintController(req, resp) {
    try {
        const complaintId = req.params.id
        const accessToken = req.headers.authorization?.split(" ")[1]
        if (!accessToken) {
            return resp.status(401).json({ message: 'Authentication Required' });
        }
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)

        if (!complaintId) {
            return resp.status(404).json({ message: "Complaint not found" });
        }
        const complaintDetail = await Complaint.findById(complaintId).populate("userId", "name village district")
        if (!complaintDetail) {
            return resp.status(400).json({
                message: "Complaint ID is required"
            });
        }
        return resp.status(200).json({ message: "Complaint is Fetched Successfully", complaintDetail })
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
        return resp.status(500).json({ message: "INtenral Server Error" })
    }
}
// ye api mp dashboard main complaint list baneyegi actionable bas new and in progress
export async function ActionableComplaintListController(req, resp) {
    try {
        const complaints = await Complaint.find({
            complaintStatus: {
                $in: ["new", "in-progress"]
            }
        }).sort({ createdAt: -1 });

        return resp.status(200).json({ message: "Complaint fetched Successfully", complaints })
    }
    catch (error) {
        return resp.status(500).json({ message: "Intenral Server Error", error })
    }
}
// ye api village wise demand hotspot kregi 

export async function DemandHotspotController(req, resp) {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            return resp.status(401).json({
                message: "Access Token required",
            });
        }

        jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

        const hotspots = await Complaint.aggregate([
            {
                $group: {
                    _id: {
                        village: "$village",
                        category: "$aiResponse.category",
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $group: {
                    _id: "$_id.village",
                    totalComplaints: {
                        $sum: "$count",
                    },
                    categories: {
                        $push: {
                            category: "$_id.category",
                            count: "$count",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    village: "$_id",
                    totalComplaints: 1,
                    categories: 1,
                },
            },
            {
                $sort: {
                    totalComplaints: -1,
                },
            },
        ]);

        return resp.status(200).json({
            message: "Demand hotspots fetched successfully",
            hotspots,
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

        return resp.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
export async function AIInsightsController(req, resp) {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            return resp.status(401).json({
                message: "Access Token required",
            });
        }

        jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

        // Sirf active complaints
        const activeFilter = {
            complaintStatus: {
                $in: ["new", "in-progress"],
            },
        };

        // Top Village
        const topVillage = await Complaint.aggregate([
            {
                $match: activeFilter,
            },
            {
                $group: {
                    _id: "$village",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                    _id: 1
                },
            },
            {
                $limit: 1,
            },
        ]);

        // Top Category
        const topCategory = await Complaint.aggregate([
            {
                $match: activeFilter,
            },
            {
                $group: {
                    _id: "$aiResponse.category",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                    _id: 1
                },
            },
            {
                $limit: 1,
            },
        ]);

        // High Urgency Count
        const highUrgencyComplaints = await Complaint.countDocuments({
            complaintStatus: {
                $in: ["new", "in-progress"],
            },
            "aiResponse.urgency": "High",
        });

        const village = topVillage.length ? topVillage[0]._id : "N/A";
        const category = topCategory.length ? topCategory[0]._id : "N/A";

        const recommendation = await generateAIInsight(
            village,
            category,
            highUrgencyComplaints
        );
        console.log(recommendation)
        return resp.status(200).json({
            topVillage: village,
            topCategory: category,
            highUrgencyComplaints,
            recommendation,
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

        return resp.status(500).json({
            message: "Internal Server Error",
            error,
        });
    }
}
// village markers ke api 
export const getVillageMarkers = async (req, res) => {
  try {
    // All villages
    const villages = await VillageData.find();

    const markers = [];

    for (const village of villages) {

      // All complaints of this village
      const complaints = await Complaint.find({
        village: {
          $regex: new RegExp(`^${village.villageName}$`, "i"),
        },
      });

      // Category Count
      const categoryMap = {};

      let highUrgency = 0;

      complaints.forEach((complaint) => {

        const category =
          complaint.aiResponse?.category || "Other";

        categoryMap[category] =
          (categoryMap[category] || 0) + 1;

        if (
          complaint.aiResponse?.urgency === "High"
        ) {
          highUrgency++;
        }
      });

      // Top Issue
      let topIssue = "No Complaints";

      let max = 0;

      for (const category in categoryMap) {

        if (categoryMap[category] > max) {

          max = categoryMap[category];

          topIssue = category;

        }

      }

      markers.push({
        _id:village._id,
        village: village.villageName,

        district: village.districtName,

        latitude: village.latitude,

        longitude: village.longitude,

        totalComplaints: complaints.length,

        highUrgency,

        topIssue,

      });

    }
    console.log(markers)
    return res.status(200).json({

      success: true,

      markers,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error",

    });

  }
};