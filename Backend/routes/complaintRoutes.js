import express from 'express'
import { ComplaintController, getMyComplaintsController, getMySpecificComplaintController } from '../controller/complaintController.js'


const complaintRouter = express.Router()
complaintRouter.post('/complaint', ComplaintController)
complaintRouter.get('/complaint/mycomplaints', getMyComplaintsController)
complaintRouter.get('/complaint/:id',getMySpecificComplaintController)
export default complaintRouter