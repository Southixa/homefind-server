import cloudinary from "cloudinary";
import {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../config/globalKey.js";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const UploadImage = async (img, oldImag) => {
  try {
    if (!img) return "";
    if (oldImag) {
      const spliturl = oldImag.split("/");
      const img_id = spliturl[spliturl.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(img_id);
    }

    //MEAN: Upload image to cloudinary Select Specify the folder name and settings type image is auto
    const res_upload = await cloudinary.uploader.upload(img, null, {
      folder: "HomeFind",
      resource_type: "auto",
    });

    return res_upload.url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default UploadImage;
