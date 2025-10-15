import mongoose from "mongoose";
import ENV from "../config/env.js"
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(ENV.MONGODB_URI);
        console.log("MongoDB connected successfully : ",conn.connection.host);
    }   
    catch(err){
        console.log("Error in DB connection",err);
        process.exit(1);
    }   
}

export default connectDB;