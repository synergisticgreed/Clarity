import mongoose , {Schema} from "mongoose";

const categorySchema = new Schema(
    {
        category :{
            type: String,
            required : true 
        }
    },
    {
        timestamps : true
    }
)

const Category = mongoose.model("Category",categorySchema);
export default Category;

