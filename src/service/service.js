import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

import jimp from "jimp";
import sharp from "sharp";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { JWT_SECRET_KEY } from "../config/globalKey.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const UploadImageToServer = async (files) => {
  return new Promise(async (resolve, reject) => {
    try {
      const imageBuffer = Buffer.from(files, "base64");
      const imageName = "IMG-" + Date.now() + ".jpeg";
      const imgPath = `${__dirname}/../../assets/images/${imageName}`;
      const jpegBuffer = await sharp(imageBuffer).toBuffer();
      const image = await jimp.read(jpegBuffer);
      if (!image) {
        return "Error Covert files";
      }
      image.write(imgPath);
      resolve(imageName);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const VerifyToken = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, JWT_SECRET_KEY, async function (err, decode) {
        if (err) return resolve(false);

        const decrypt = await Decrypt(decode["id"]);

        const mysql = "Select uuid from user where uuid=?";
        con.query(mysql, decrypt, function (err, user) {
          if (err) return resolve(false);

          resolve(user[0]["uuid"]);
        });
      });
    } catch (error) {
      reject("Verift faild");
    }
  });
};

export const GeneratePassword = async (password) => {
  const encryptPassword = CryptoJS.AES.encrypt(
    password,
    JWT_SECRET_KEY
  ).toString();
  return encryptPassword;
};
export const encrypt = async (data) => {
  const encrypt = CryptoJS.AES.encrypt(data, JWT_SECRET_KEY).toString();
  return encrypt;
};
export const Decrypt = async (data) => {
  const decrypt = CryptoJS.AES.decrypt(data, JWT_SECRET_KEY);
  const result = decrypt.toString(CryptoJS.enc.Utf8);
  return result;
};
export const GenerateRefreshToken = async (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(refreshToken, JWT_SECRET_KEY, async function (err, decode) {
        if (err) throw err;
        const decrypt = await Decrypt(decode["id"]);
        const mysql = "Select * from user where uuid=?";
        con.query(mysql, decrypt, async function (err, user) {
          if (err) throw err;
          var data = {
            id: user[0]["uuid"],
            role: user[0]["role"],
          };
          const result = await GenerateToken(data);
          resolve(result);
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const GenerateToken = async (data) => {
  var paylod = {
    id: await encrypt(data.id),
    role: await encrypt(data.role),
  };
  var paylod_refresh = {
    id: await encrypt(data.id),
    role: await encrypt("USER_MANUAN"),
  };
  const token = jwt.sign(paylod, JWT_SECRET_KEY, { expiresIn: "2h" });
  const refreshToken = jwt.sign(paylod_refresh, JWT_SECRET_KEY, {
    expiresIn: "4h",
  });
  let date = new Date()
        
 let expiresIn =  date.setHours(2 + date.getHours())
  

  return { token, refreshToken,expiresIn };
};
