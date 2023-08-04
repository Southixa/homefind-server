import express from "express";
import { Controllers } from "../controller/index.js";
import { verifyTokenAndAdminOrStaff } from "../middleware/authMiddleware.js";

const route = express.Router();

//======================= authController =============================

route.post("/auth/register",Controllers.authController.registerUser)
route.post("/auth/login",Controllers.authController.login)

//======================= uploadFile =================================

route.post("/uploadFile", Controllers.uploadFileController.uploadFile)

//======================= apartmentController =========================

route.post("/apartment/create",verifyTokenAndAdminOrStaff,Controllers.apartmentController.createApartment)
route.put("/apartment/update",verifyTokenAndAdminOrStaff,Controllers.apartmentController.updateApartment)
route.delete("/apartment/delete/:_id",verifyTokenAndAdminOrStaff,Controllers.apartmentController.deleteApartment)
route.get("/apartment/get/:_id",Controllers.apartmentController.getApartment)
route.get("/apartment/getAllByAdmin",verifyTokenAndAdminOrStaff,Controllers.apartmentController.getApartmentsByAdmin)
route.get("/apartment/getAllByCustomer",Controllers.apartmentController.getApartmentsByCustomer)

//======================= HomeController =============================

route.post("/home/create",verifyTokenAndAdminOrStaff,Controllers.homeController.createHome)
route.put("/home/update",verifyTokenAndAdminOrStaff,Controllers.homeController.updateHome)
route.delete("/home/delete/:_id",verifyTokenAndAdminOrStaff,Controllers.homeController.deleteHome)
route.get("/home/get/:_id",Controllers.homeController.getHome)
route.get("/home/getAllByAdmin",verifyTokenAndAdminOrStaff,Controllers.homeController.getHomesByAdmin)
route.get("/home/getAllByCustomer",Controllers.homeController.getHomesByCustomer)

export default route