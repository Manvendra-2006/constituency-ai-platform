import express from 'express'
import { getMeController, loginController, logoutController, RefreshTokenController, RegisterController } from '../controller/authController.js'
import { AuthMiddleware } from '../Middleware/auth.middleware.js'
const router = express.Router()
router.post("/register", RegisterController)
router.post("/login",loginController)
router.get("/logout",AuthMiddleware,logoutController)
router.get("/refreshtoken",AuthMiddleware,RefreshTokenController)
router.get("/getMe",AuthMiddleware,getMeController)
export default router