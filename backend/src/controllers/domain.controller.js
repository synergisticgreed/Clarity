import {Domain} from "./models/domain.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";

// just to create a category 
const createDomain = asyncHandler(async(req,res)=>{
    const {domainName} = req.body;
    if(domainName===""){
        throw new APIError(404," please give the domain name");
    }
    const createdDomain = await Domain.create({
        domainName
    })
    return res
    .status(200)
    .json(
        new APIResponse(
            200,
            createdDomain,
            "Domain created"
        )
    )
})

export {createDomain}
