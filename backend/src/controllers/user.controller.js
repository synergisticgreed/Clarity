import { asyncHandler } from "../utils/asyncHandler";
import { APIError } from "../utils/APIError";
import { APIResponse } from "../utils/APIRespnse";
import {User} from "./models/user.model.js"
import {uploadOnCloudinary} from "./utils/cloudinary.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// import dotenv from 'dotenc';//abhi install nahi kiya hai 
// dotenv.config();

//function to generatae access and refresh tokens 
const generateAccessandRefereshTokens = async(userId)=>{
    try{
        const user = await User.findById(userId)
        //is document ko ham mongoose se dhoondenge basically User model se dhoondenge
        //user uska instance hai
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken=refreshToken
        //ab ham isko monogdb mein save karaenge using save method by mongoose 
        //aur usmein bhi ham koi validation nahi kar rahe hain bas , password vagera validate nahi karenge kyunki daalenge hi nahi na 
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
    }
    catch (error) {
        throw new APIError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler(async(requestAnimationFrame,res)=>{
    //get user details according to the db schema 
    // validate the details 
    // check if exists already 
    // check for files 
    // upload files 
    // upload on database 
    // check db 

    //destructing the req.body 
    console.log(req.body);
    const {fullname,username,email,password} = req.body;
    //validate details
    if(fullname==""){
        throw new APIError(400,"full name is  a required field");
    }
    if(email===""){
        throw new APIError(400,"email is required field");
    }
    if(username===""){
        throw new APIError(400,"username is required field");
    }
    if(password===""){
        throw new APIError(400,"password is required field");
    }
    //:> yaha pe ig apierror generate karne ki zarurat nahi hai 
   
    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new APIError(409,"user with this email or username is already exists");
    }

    //check for files 
    console.log(req.files);
    const avatarLocalPath = req.files?avatar[0]?.path;
    
    if(!avatarLocalPath){
        throw new APIError(400);
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
        throw new APIError(400,"avatar file could not be uploaded in cloudinary ")
    }

    const user = await User.create({
        fullname,
        avatar : avatar.url ,
        email,
        password ,
        username 
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" 
    )
    if(!createdUser){
        throw new APIError(500,"Something went wrong while registering the user ")
    }
    console.log("new user registration done successfully ");
    return res.status(201).json(
        new APIResponse(200,createdUser,"User registered successfully")
    )

})

const loginUser = asyncHandler(async(req,res)=>{
    //check user details from the database 
    //generate refresh and access token 
    const {username,password} = req.body;
    console.log(req.body);
    if(!username && !password ){
        throw new APIError(400,"username and password both are required to login")
    }
    
    console.log("username and password are ", username ,password);
    const user = await User.findOne({username})
    if(!user){
        throw new APIError(404,"User with this username does not exist ")
    }
    
    const isPasswordCorrect = await user.comparePassword(password)
    if(!comparePassword){
        throw new APIError(400,"Oops ! The password did not match")
    }
    console.log(user);
    // we are making this user object to generate tokens 
    const {accessToken , refreshToken} = await generateAccessandRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options ={
        httpOnly: true,
        secure:true
    }
    return  res
    .status(200
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new APIResponse(
            200,
            {user:loggedInUser,accessToken,refreshToken},
            "User logged in successfully"
        )
    )
    )

})

export {registerUser,loginUser}