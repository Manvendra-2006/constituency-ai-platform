import mongoose from "mongoose";
const complaintSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }  ,
    originalComplaint:{
        type:String,
        default:""
    },
    village:{
        type:String,
        required:true
    },
    aistatus:{
        type:String,
        enum:['pending','analyzed','failed'],
        default:'pending'
    },
    aiStatus:{
        type:String,
        enum:['pending','analyzed','failed'],
        default:'pending'
    },
    complaintStatus:{
        type:String,
        enum:['new','resolved','in-progress','rejected'],
        default:'new'
    },
    image:{
        type:String,
        default:null
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
    },
    latitude: {
    type: Number,
},

longitude: {
    type: Number,
},
},{
    timestamps:true
})
export default mongoose.model("Complaint",complaintSchema)