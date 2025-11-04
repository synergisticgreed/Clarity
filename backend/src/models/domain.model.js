import mongoose , {Schema } from "mongoose";

const domainSchema = new Schema (
    {
        domainName : {
            type:String,
            required : true
        },
        required : true
    },
    {
        timestamps: true
    }
)

const Domain = mongoose.model("Domain",domainSchema);
export default Domain;