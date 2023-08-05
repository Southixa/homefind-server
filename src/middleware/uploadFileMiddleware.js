import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
