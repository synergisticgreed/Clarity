import { Tasks } from "../models/tasks.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIRespnse.js";
import {uploadOnCloudinary} from "./utils/cloudinary.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//first of all create a task 
const createTask = asyncHandler(async(req,res)=>{
    const {description , duedate} = req.body;
    if(!description){
        throw new APIError(404," please describe the task ");
    }
    const task = await Tasks.create({
        description,
        duedate,
    })
    return res
    .status(201)
    .json(
        new APIResponse(200,task," a new task has been added ! ")
    )
})

const markTaskDone = asyncHandler(async(req,res)=>{
    //destructing the req.body
    const {id} = req.params;
    const updated = await Tasks.findByIdAndUpdate(id,{done:true},{new:true});
    if(!updated){
        throw new APIError(404,"could not find this task ")
    }
    return res
    .status(200)
    .json(
        new APIResponse(200,updated,"task has been tick marked done")
    );
})

export {createTask , markTaskDone}

