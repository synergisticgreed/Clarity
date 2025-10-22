import mongoose , {Schema} from "mongoose";

const taskSchema = new Schema(
    {
        description : {
            type:String ,
            required :[true,"describe your task"],
        },
        duedate:{
            type:String,
        },
        
    },
    {
        timestamps: true
    }
)

export const Tasks = new mongoose.model('Tasks',taskSchema);