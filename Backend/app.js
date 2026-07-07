import express from 'express'
import cors from 'cors'
import router from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import mprouter from './routes/authMpRoutes.js'
import complaintRouter from './routes/complaintRoutes.js'
import dashboardRouter from './routes/dashboardRoutes.js'
import villageRouter from './routes/villageRoutes.js'
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use("/api/auth",router)
app.use("/api/auth",mprouter)
app.use("/api/user",complaintRouter)
app.use("/api/mp",dashboardRouter)
app.use('/api/village',villageRouter)
app.get("/",(req,resp)=>{
    resp.send("Hello WOrld")
})
export default app