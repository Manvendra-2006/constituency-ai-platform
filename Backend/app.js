import express from 'express'
import cors from 'cors'
import router from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import mprouter from './routes/authMpRoutes.js'
import complaintRouter from './routes/complaintRoutes.js'
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth",router)
app.use("/api/auth",mprouter)
app.use("/api/user",complaintRouter)
app.get("/",(req,resp)=>{
    resp.send("Hello WOrld")
})
export default app