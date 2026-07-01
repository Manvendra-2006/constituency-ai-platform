import express from 'express'
import { AnalyticsController } from '../controller/dashboardController.js'
const dashboardRouter = express.Router()
dashboardRouter.get("/dashboard",AnalyticsController)
export default dashboardRouter