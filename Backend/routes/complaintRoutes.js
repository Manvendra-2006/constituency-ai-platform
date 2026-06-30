import express from 'express'
import { ComplaintController, getMyComplaintsController } from '../controller/complaintController.js'


const complaintRouter = express.Router()
complaintRouter.post('/complaint', ComplaintController)
complaintRouter.get('/complaint/mycomplaints', getMyComplaintsController)

export default complaintRouter