import mongoose from "mongoose";
import { statusMessage } from "../config/index.js";
import { Models } from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import { SendCreate, SendError, SendSuccess } from "../service/response.js";

export default class CategoryController {
  static async getAll(req, res) {
    try {
      const category = await Models.category.find();
      if (!category) {
        return SendError(res, 404, statusMessage.NOT_FOUND + " category");
      }

      return SendSuccess(res, SMessage.GETALL, category);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
  static async getOne(req, res) {
    try {
      const categoryId = req.params.categoryId;
      if (mongoose.Types.ObjectId.isValid(categoryId)) {
        return SendError(res, 404, statusMessage.NOT_FOUND + "category");
      }
      const category = await Models.category.findById(categoryId);
      return SendSuccess(res, SMessage.GETONE, category);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
  static async insert(req, res) {
    try {
      const { title } = req.body;
      if (!title) {
        return SendError(res, 400, "title is required!");
      }
      const category = await Models.category.create({ title });
      return SendCreate(res, SMessage.INSERT, category);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
  static async updateCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      if (mongoose.Types.ObjectId.isValid(categoryId)) {
        return SendError(res, 404, statusMessage.NOT_FOUND + "category");
      }
      const { title } = req.body;
      if (!title) {
        return SendError(res, 400, "title is required!");
      }
      const category = await Models.category.findByIdAndUpdate(
        categoryId,
        { title: title },
        { new: true }
      );
      return SendSuccess(res, SMessage.UPDATE, category);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
  static async deleteCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      if (mongoose.Types.ObjectId.isValid(categoryId)) {
        return SendError(res, 404, statusMessage.NOT_FOUND + "category");
      }

      const category = await Models.category.findByIdAndDelete(
        categoryId,
        { new: true }
      );
      return SendSuccess(res, SMessage.DELETE, category);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
}
