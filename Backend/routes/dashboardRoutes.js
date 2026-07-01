import express from 'express'
import { ActionableComplaintListController, AIInsightsController, AnalyticsController, DemandHotspotController, getMySpecificComplaintController, StatusController } from '../controller/dashboardController.js'
import { AuthMiddleware } from '../Middleware/auth.middleware.js'
const dashboardRouter = express.Router()
dashboardRouter.get("/dashboard",AuthMiddleware,AnalyticsController)
dashboardRouter.put("/complaint/:complaintId/status",AuthMiddleware,StatusController)
dashboardRouter.get('/complaint/:id',AuthMiddleware,getMySpecificComplaintController)
dashboardRouter.get("/complaint/list/action",AuthMiddleware,ActionableComplaintListController)
dashboardRouter.get("/dashboard/hotspots",AuthMiddleware,DemandHotspotController)
dashboardRouter.get("/dashboard/insights",AuthMiddleware,AIInsightsController)
export default dashboardRouter