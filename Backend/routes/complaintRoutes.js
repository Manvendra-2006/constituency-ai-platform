import express from 'express'
import { ComplaintController } from '../controller/complaintController.js'
const complaintRouter = express.Router()
complaintRouter.post("/complaint",ComplaintController)
export default complaintRouter