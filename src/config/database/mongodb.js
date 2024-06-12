import mongoose from "mongoose";
import { DATABASE_URI } from "../globalKey.js";
const connectMongoDB = () => {
    try {
        return mongoose.connect(DATABASE_URI, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(()=>{
            console.log(`Connect DB Success`.bgYellow);
        });
    } catch (error) {
        console.log("error: ", error)
    }
}
export default connectMongoDB