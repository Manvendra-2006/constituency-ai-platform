import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    ip:{
        type:String,
        required:true
    },
    userAgent:{
        type:String,
        required:true
    },
    revoked:{
        type:Boolean,
        default:false
    },
    refreshTokenHash:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
export default mongoose.model("Session",sessionSchema)