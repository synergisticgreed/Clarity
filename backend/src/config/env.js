import "dotenv/config";

const ENV={
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/clarity"

}
export default ENV;