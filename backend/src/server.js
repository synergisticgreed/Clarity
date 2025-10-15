import express from "express"
import cors from "cors"
import ENV from "./config/env.js"
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.route.js'; // <--- import default router


const app=express();

app.use(express.json());
app.use(cors());

const PORT=ENV.PORT;

app.get("/",(req,res)=>{
    res.send("Hello from backend");
})  
app.use("/api/auth", authRoutes);

connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})