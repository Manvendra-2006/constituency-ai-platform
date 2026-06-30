import mongoose from "mongoose";
const blacklistSchema = new mongoose.Schema({
    Id:{
        type:String,
        required:true
    },
    accessToken:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
export default mongoose.model("BlackList",blacklistSchema)