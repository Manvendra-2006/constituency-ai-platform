import mongoose from "mongoose";
const mpmodelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    governmentId:{
        type:String,
        required:true
    },
    constituencyNumber:{
        type:Number,
        required:true,
        unique:true
    },
    constituencyName:{
        type:String,
        required:true
    },
     state:{
        type:String,
        required:true
     }
},{
    timestamps:true
})
export default mongoose.model("MPModel",mpmodelSchema)