import express from "express"
import cors from "cors"
import ENV from "./config/env.js"
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js"

const app = express(); // creates an express application object

app.use(express.json());// this is done to every request using express.use(), it converts raw request body in json to js object and attachs to req.body
app.use(cors());

const PORT = ENV.PORT;

app.get("/",(req,res)=>{
    res.send("Hello from backend");
})  

connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})

app.use("/api/user",userRoutes);

app.use("/api/task",taskRoutes);

