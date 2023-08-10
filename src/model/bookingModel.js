import mongoose from "mongoose";
const { Schema } = mongoose;
const bookingSchema = new Schema(
    {
        apartment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "apartment"
        },
        home: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "home"
        },
        priceBooking: {
            type: Number,
            default: 0
        },
        bookingStatus: {
            type: String,
            enum: ["BOOKING","PROCESS", "SUCCESS", "CANCEL"],
            default: "BOOKING"
        },
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
    }
);
const booking = mongoose.model("booking", bookingSchema);
export default booking;