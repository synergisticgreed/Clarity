import {Category} from "./models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIRespnse.js";

// just to create a category 
const createCategory = asyncHandler(async(req,res)=>{
    const {category} = req.body;
    if(category===""){
        throw new APIError(404,"please specify the category");
    }
    const createdCategory = await Category.create({
        category
    })
    return res
    .status(200)
    .json(
        new APIResponse(
            200,
            createdCategory,
            "Task category created"
        )
    )
})

export {createCategory}
