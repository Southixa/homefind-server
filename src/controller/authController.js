
import { statusMessage } from "../config/index.js";
import { Models } from "../model/index.js";
import { EMessage } from "../service/message.js";
import { SendError, SendSuccess } from "../service/response.js";
import {
  Decrypt,
  GeneratePassword,
  GenerateToken,
} from "../service/service.js";
import { ValidateData } from "../service/validate.js";

class AuthController {
  static async registerUser(req, res) {
    try {
      const { userName, phoneNumber, password, email } = req.body;
      const validate = await ValidateData({
        userName,
        phoneNumber,
        password,
        email,
      });
      if (validate.length > 0) {
        return SendError(res, 400, "pleaseInput: " + validate.join(","));
      }

      const checkexist = await Models.user.findOne({ phoneNumber });
      if (checkexist) {
        return SendError(res, 400, statusMessage.USER_ALREADY_EXIST);
      }
      let hash = await GeneratePassword(password);
      const newData = {
        ...req.body,
        password: hash,
      };

      const user = await Models.user.create(newData);
      if (!user) return SendError(res, 500, statusMessage.SERVER_ERROR);
      return SendSuccess(res, statusMessage.REGISTER);
    } catch (error) {
      return SendError(res, 500, statusMessage.SERVER_ERROR, error);
    }
  }
  static async login(req, res) {
    try {
      const { phoneNumber, password } = req.body;
      const validate = await ValidateData({ phoneNumber, password });
      if (validate.length > 0) {
        return SendError(res, 400, EMessage.pleaseInput + validate.join(","));
      }
      const user = await Models.user.findOne({ phoneNumber, isPubilc: true });
      if (!user) {
        return SendError(res, 400, statusMessage.USER_NOT_FOUND);
      }
      const decryptPassword = await Decrypt(user["password"]);

      if (password != decryptPassword) {
        return SendError(res, 401, statusMessage.PASSWORD_NOT_MATCH);
      }
      const payload = {
        _id: user._id,
        role: user.role,
      };
     const newUser = await Models.user.findById(user._id).select('-password')
      //MEAN: Generate token
      const token = await GenerateToken(payload);
      const newData = Object.assign(
        JSON.parse(JSON.stringify(newUser)),
        JSON.parse(JSON.stringify(token))
      );
      
      return SendSuccess(res, statusMessage.LOGIN, newData);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default AuthController;
