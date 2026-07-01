import mongoose from "mongoose";
const complaintSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }  ,
    originalComplaint:{
        type:String,
        required:true
    },
    village:{
        type:String,
        required:true
    },
    aistatus:{
        type:String,
        enum:['pending','analyzed'],
        default:'pending'
    },
    complaintStatus:{
        type:String,
        enum:['new','resolved','in-progress','rejected'],
        default:'new'
    },
    aiResponse:{
        category:{
            type:String,
          
        },
        subcategory:{
            type:String,
           
        },
        summary:{
            type:String,
           
        },
        urgency:{
            type:String
        },
        confidence:{
            type:Number
        }
    }
},{
    timestamps:true
})
export default mongoose.model("Complaint",complaintSchema)