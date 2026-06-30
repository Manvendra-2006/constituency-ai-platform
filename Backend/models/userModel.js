import mongoose from "mongoose";
const userSchema = new  mongoose.Schema({
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
    village:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['mp','citizen'],
        default:"citizen"
    }

},{
    timestamps:true
})
export default mongoose.model("User",userSchema)