import jwt from "jsonwebtoken";
import { statusMessage, tokenSet } from "../config/index.js";
import { Decrypt } from "../service/service.js";
//import crypt from "crypto-js";



//MEAN: Verify Token 
export const verifyToken = async (req, res, next) => {
  const authorization = req.headers['authorization'];
  if(!authorization) {
    return res.status(401).json({ msg: statusMessage.TOKEN_IS_NOT_VALID })
  }
  const token = authorization.split(' ')[1];
  try {
    jwt.verify(token, tokenSet.JWT_SECRET_KEY, async (err, payload) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ msg: statusMessage.TOKEN_IS_NOT_VALID });
      }
      req.payload = {
        ...payload,
        _id: payload.id,
        role: await Decrypt(payload.role),
      }
      return next();
    });
  } catch (error) {
    return res.status(401).json({ msg: statusMessage.TOKEN_IS_EXPIRED });
  }
};

//MEAN: Verify Token is a Admin
export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.payload.role === "ADMIN") {
      return next();
    } else {
      return res.status(400).json({ msg: statusMessage.PERMISSION_DENIED });
    }
  });
};

//MEAN: Verify Token is a Admin or staff
export const verifyTokenAndAdminOrStaff = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.payload.role === "ADMIN" || req.payload.role === "STAFF") {
      return next();
    } else {
      return res.status(400).json({ msg: statusMessage.PERMISSION_DENIED });
    }
  });
};