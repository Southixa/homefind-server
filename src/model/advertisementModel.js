import mongoose from "mongoose";
const { Schema } = mongoose;
const advertisementSchema = new Schema({
    name: String,
    
    details: [{
        link:String,
        image:String,
        showStatus: {
            type: Boolean,
            default: true
        }
    }],
    startDate: Date,
    endDate: Date,
    index: Number,
    showStatus:{
        type: Boolean,
        default: true
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
});

const advertisement = mongoose.model('advertisement', advertisementSchema);
export default advertisement;