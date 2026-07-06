import express from 'express'
import { getVillageProfile } from '../controller/villageController.js';
import { AuthMiddleware } from '../Middleware/auth.middleware.js';
const villageRouter = express.Router()
villageRouter.get("/:village",AuthMiddleware, getVillageProfile);
export default villageRouter
