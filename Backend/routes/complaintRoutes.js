import express from 'express'
import { ComplaintController, getMyComplaintsController } from '../controller/complaintController.js'
import { AuthMiddleware } from '../Middleware/auth.middleware.js'

import upload from '../Middleware/file.middleware.js'
import { getComplaintLocations } from '../controller/mp.controller.js'
const complaintRouter = express.Router()
complaintRouter.post('/complaint',AuthMiddleware,   upload.single("image"),ComplaintController)
complaintRouter.get('/complaint/mycomplaints',AuthMiddleware, getMyComplaintsController)
complaintRouter.get("/complaints/map", getComplaintLocations);
export default complaintRouter