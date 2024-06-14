import mongoose from "mongoose";

const providerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      require: true,
    },
    isPubilc: {
      type: Boolean,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const provider = mongoose.model("provider", providerSchema);
export default provider;
