import express from 'express'
import { getMeController, loginController, logoutController, RefreshTokenController, RegisterController } from '../controller/authController.js'
const router = express.Router()
router.post("/register",RegisterController)
router.post("/login",loginController)
router.get("/logout",logoutController)
router.get("/refreshtoken",RefreshTokenController)
router.get("/getMe",getMeController)
export default router