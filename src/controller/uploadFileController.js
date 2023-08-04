import { statusMessage } from "../config/index.js";
import UploadImage from "../middleware/uploadFileMiddleware.js";

class UploadFileController {
  static async uploadFile(req, res) {
    try {
      const imagePaths = req.body.image;
      if (!imagePaths) {
        return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
      }
      const imgUrl = await UploadImage(imagePaths);
      return res.status(200).json({ imgUrl }); // Sending the image URL in the response
    } catch (error) {
      return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
    }
  }
}

export default UploadFileController;
