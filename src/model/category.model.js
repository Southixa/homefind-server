import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
},{timestamps: true});
const category = mongoose.model("category",categorySchema);
export default category;