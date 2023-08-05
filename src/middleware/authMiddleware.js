import jwt from "jsonwebtoken";
import { statusMessage, tokenSet } from "../config/index.js";

//MEAN: Generate Access Token
export const GenerateToken = async (data) => {
  try {
    let token = jwt.sign(data, tokenSet.JWT_SECRET_KEY, { expiresIn: tokenSet.TOKEN_EXPIRE_TIME });
    return token;
  } catch (error) {
    throw error;
  }
};

//MEAN: Verify Token 
export const verifyToken = async (req, res, next) => {
  const authorization = req.headers['authorization'];
  try {
    jwt.verify(authorization, tokenSet.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(403).json({ msg: statusMessage.TOKEN_IS_NOT_VALID });
      }
      req.payload = payload;
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