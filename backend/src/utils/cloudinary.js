import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs';

// give CLOUD_NAME , API_KEY , API_SECRET from cloudinary 

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async(localFilePath) =>{
    try{
        if(!localFilePath) return null 
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type :"auto"
        })
        console.log("file is uploaded on cloudinary " , response.url);
        fs.unlinkSync(localFilePath)

        return response;
    }
    catch (err) {
        fs.unlinkSync(localFilePath)
        return null ;
    }
}

export {uploadOnCloudinary}