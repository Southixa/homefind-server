import mongoose from "mongoose";

const connectMongoDB = () => {
    try {
        return mongoose.connect(process.env.DATABASE_URI, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(()=>{
            console.log(`Connect DB Success`.bgYellow);
        });
    } catch (error) {
        console.log("error: ", error)
    }
}
export default connectMongoDB