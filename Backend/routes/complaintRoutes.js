import express from 'express'
import { ComplaintController, getMyComplaintsController } from '../controller/complaintController.js'
import { AuthMiddleware } from '../Middleware/auth.middleware.js'


const complaintRouter = express.Router()
complaintRouter.post('/complaint',AuthMiddleware, ComplaintController)
complaintRouter.get('/complaint/mycomplaints',AuthMiddleware, getMyComplaintsController)
export default complaintRouter