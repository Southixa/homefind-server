import cloudinary from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "./globalKey.js";
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const UploadToCloudinary = async (files, oldImage) => {
  try {
    if (oldImage) {
      const spliturl = oldImage.split("/");
      const img_id = spliturl[spliturl.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(img_id);
    }
    const base64 = files.toString("base64");
    const imgPath = `data:image/jpeg;base64,${base64}`;
    const cloudinaryUpload = await cloudinary.uploader.upload(imgPath, {
      public_id: `IMG_${Date.now()}`,
      resource_type: "auto",
    });
    return cloudinaryUpload.url;
  } catch (error) {
    console.log(error);
    return ""
  }
};

export const DeleteFromCloudinary = async (oldImage) => {
  try {
    const spliturl = oldImage.split("/");
    const img_id = spliturl[spliturl.length - 1].split(".")[0];
    const { result } = await cloudinary.uploader.destroy(img_id);
    if(result == "not found") return false
    return true;
  } catch (error) {
    console.log(error);
    return false
  }
};
