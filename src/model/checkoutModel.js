import mongoose from "mongoose";
const { Schema } = mongoose

const checkoutSchema = new Schema({
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    staffCommission:{
        type: Number,
        default: 0
    },
    slipCheckout: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
})

const checkout = mongoose.model("checkout", checkoutSchema)
export default checkout