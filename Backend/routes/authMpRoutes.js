import express from 'express'
import { getMeMpController, loginMpController, logoutMpController, RefreshTokenMpController, RegisterMpController } from '../controller/authMpController.js'
import { AuthMiddleware } from '../Middleware/auth.middleware.js'
const mprouter = express.Router()
mprouter.post("/registermp", RegisterMpController)
mprouter.post("/loginmp",loginMpController)
mprouter.get("/logoutmp",AuthMiddleware,logoutMpController)
mprouter.get("/refreshmptoken",AuthMiddleware,RefreshTokenMpController)
mprouter.get("/mpProfile",AuthMiddleware,getMeMpController)
export default mprouter