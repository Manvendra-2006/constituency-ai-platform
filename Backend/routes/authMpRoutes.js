import express from 'express'
import { getMeMpController, loginMpController, logoutMpController, RefreshTokenMpController, RegisterMpController } from '../controller/authMpController.js'
const mprouter = express.Router()
mprouter.post("/registermp",RegisterMpController)
mprouter.post("/loginmp",loginMpController)
mprouter.get("/logoutmp",logoutMpController)
mprouter.get("/refreshmptoken",RefreshTokenMpController)
mprouter.get("/mpProfile",getMeMpController)
export default mprouter