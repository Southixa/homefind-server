import mongoose from "mongoose";
const { Schema } = mongoose

const favoriteSchema = new Schema({
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "apartment"
    },
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "home"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
})

const favorite = mongoose.model("favorite", favoriteSchema)
export default favorite