import mongoose from "mongoose";
export async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DataBase is Connected Successfully")
    }
    catch(error){
        console.log("DataBase is not connected Successfully")
    }
    
}