import express from "express"
import cors from "cors"
import ENV from "./config/env.js"

const app=express();

app.use(express.json());
app.use(cors());

const PORT=ENV.PORT;

app.get("/",(req,res)=>{
    res.send("Hello from backend");
})  


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})