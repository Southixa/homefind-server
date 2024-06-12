import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8080;
const DATABASE_URI = process.env.DATABASE_URI;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export {
  PORT,
  DATABASE_URI,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
  JWT_SECRET_KEY,
};
