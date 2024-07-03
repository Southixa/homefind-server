import mongoose from "mongoose";
import { UploadToCloudinary } from "../config/cloudinary.js";
import { statusMessage } from "../config/index.js";
import { Models } from "../model/index.js";
import { SMessage, EMessage } from "../service/message.js";
import { SendCreate, SendError, SendSuccess } from "../service/response.js";
import { ValidateData } from "../service/validate.js";

export default class BannerController {
  static async getAll(req, res) {
    try {
      const banner = await Models.banner.find();
      if (!banner) {
        return SendError(res, 404, statusMessage.NOT_FOUND);
      }
      return SendSuccess(res, SMessage.GETALL, banner);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
  static async getOne(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError(res, 404, statusMessage.NOT_FOUND + " banner");
      }
      const banner = await Models.banner.findById(bannerId);
      return SendSuccess(res, SMessage.GETONE, banner);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
  static async insert(req, res) {
    try {
      const { title, detail } = req.body;
      const validate = await ValidateData({ title });
      if (validate.length > 0) {
        return SendError(res, 400, EMessage.pleaseInput + validate.join(","));
      }
      const image = req.files;
      if (!image) {
        return SendError(res, 400, statusMessage.NOT_FOUND + " image");
      }
      const image_url = await UploadToCloudinary(image.image.data);
      if (!image_url) {
        return SendError(res, 404, statusMessage.NOT_FOUND);
      }

      const banner = await Models.banner.create({
        title,
        detail,
        image: image_url,
      });
      if (!banner) {
        return SendError(res, 500, statusMessage.SERVER_ERROR, error);
      }
      return SendCreate(res, SMessage.INSERT, banner);
    } catch (error) {
      console.log("error on insert banner", error);
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
  static async updateBanner(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError(res, 404, statusMessage.NOT_FOUND + " banner");
      }
      const { title, detail } = req.body;
      const validate = await ValidateData({ title, detail });
      if (validate.length > 0) {
        return SendError(res, 400, EMessage.pleaseInput + validate.join(","));
      }
      const image = req.files;
      if (!image) {
        return SendError(res, 400, statusMessage.NOT_FOUND + " image");
      }
      const image_url = await UploadToCloudinary(image.image.data);
      if (!image_url) {
        return SendError(res, 404, statusMessage.NOT_FOUND + " image");
      }

      const banner = await Models.banner.findByIdAndUpdate(
        bannerId,
        { title, detail, image: image_url },
        { new: true }
      );
      return SendSuccess(res, SMessage.UPDATE, banner);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
  static async updateStatus(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError(res, 404, statusMessage.NOT_FOUND + " banner");
      }
      const { status } = req.body;
      if (!status) {
        return SendError(res, 400, statusMessage.BAD_REQUEST + "status");
      }
      const banner = await Models.banner.findByIdAndUpdate(
        bannerId,
        { isPubilc: status },
        { new: true }
      );
      return SendSuccess(res, SMessage.UPDATE, banner);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
  static async deleteBanner(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError(res, 404, statusMessage.NOT_FOUND + " banner");
      }

      const banner = await Models.banner.findByIdAndDelete(bannerId, {
        new: true,
      });
      return SendSuccess(res, SMessage.DELETE, banner);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
}
