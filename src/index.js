import express from "express";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import core from "cors";
import connectMongoDB from "./config/database/mongodb.js";
import router from "./router/index.js"
import "colors"
dotenv.config()
connectMongoDB()

const app = express();
const PORT = process.env.PORT;

app.use(core());
app.use(bodyParser.json({ extended: false, limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '500mb', parameterLimit: 50000 }));
app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.bgBlue)
})
