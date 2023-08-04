import mongoose from "mongoose";
const { Schema } = mongoose;
const apartmentSchema = new Schema(
  {
    title: String,
    description: String,
    address:{
        village: String,
        district: String,
        province: String
    },
    image:[String],
    price: {
      type: Number,
      default: 0
    },
    priceBooking: {
        type: Number,
        default: 0
    },
    apartmentType: {
        type: String,
        enum: ["FAN","AIR"],
        default:"FAN"
    },
    badRoom: {
        type: Boolean,
        default: true
    },
    convenience: [String],
    otherService: [String],
    views: {
        type: Number,
        default: 0
    },
    apartmentStatus: {
        type: Boolean,
        default:true
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
const apartment = mongoose.model("apartment", apartmentSchema);
export default apartment;
