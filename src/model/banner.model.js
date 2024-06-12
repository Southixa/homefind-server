import mongoose from "mongoose";

const bannerSchema = mongoose.Schema(
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
const banner = mongoose.model("banner", bannerSchema);
export default banner;
