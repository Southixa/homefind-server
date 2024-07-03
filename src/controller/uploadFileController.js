import { DeleteFromCloudinary, UploadToCloudinary } from "../config/cloudinary.js";
import { statusMessage } from "../config/index.js";
import UploadImage from "../middleware/uploadFileMiddleware.js";

class UploadFileController {
  static async uploadFile(req, res) {
    try {
      const image = req.files;
      if (!image) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }

      //MEAN: Upload the image to Cloudinary and then Sending the image URL in the response
      const imgUrl = await UploadToCloudinary(image.file.data);
      return res.status(200).json({ imgUrl });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }

  static async deleteFile(req, res) {
    try {
      const { fileUrl } = req.body;
      if (!fileUrl) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      const status = await DeleteFromCloudinary(fileUrl);
      if(!status) {
        return res.status(400).json({ msg: statusMessage.NOT_FOUND, status });
      }
      return res.status(200).json({ msg: statusMessage.DELETE_SUCCESS });
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }


}

export default UploadFileController;
