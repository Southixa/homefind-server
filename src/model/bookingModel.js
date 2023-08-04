import mongoose from "mongoose";
const { Schema } = mongoose;
const bookingSchema = new Schema(
    {
        apartment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "apartment"
        },
        apartmentAddress: {
            village: String,
            district: String,
            province: String
        },
        home: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "home"
        },
        homeAddress: {
            village: String,
            district: String,
            province: String
        },
        bookingStatus: {
            type: String,
            enum: ["BOOKING", "SUCCESS", "CANCEL"],
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