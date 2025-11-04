import mongoose , {Schema} from "mongoose";

const taskSchema = new Schema(
    {
        description : {
            type:String ,
            required :[true,"describe your task"],
        },
        duedate:{
            type:Date,
        },
        done:{
            type:Boolean,
            default:false
        }
        
    },
    {
        timestamps: true
    }
)

export const Tasks = mongoose.model('Tasks',taskSchema);