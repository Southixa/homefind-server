import express from "express";
import BannerController from "../controller/banner.controller.js";
import CategoryController from "../controller/category.controller.js";
import { Controllers } from "../controller/index.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAdminOrStaff } from "../middleware/authMiddleware.js";

const route = express.Router();

//======================= authController =============================

route.post("/auth/register",Controllers.authController.registerUser)
route.post("/auth/login",Controllers.authController.login)

//----------------------- Category -------------------------------
route.get("/category/getAll",verifyTokenAndAdminOrStaff,CategoryController.getAll)
route.get("/category/getOne/:categoryId",verifyTokenAndAdminOrStaff,CategoryController.getOne)
route.post("/category/create",verifyTokenAndAdminOrStaff,CategoryController.insert)
route.put("/category/update/:categoryId",verifyTokenAndAdminOrStaff,CategoryController.updateCategory)
route.delete("/category/delete/:categoryId",verifyTokenAndAdminOrStaff,CategoryController.deleteCategory)
//----------------------- banner --------------------------
route.get("/banner/getAll",verifyTokenAndAdminOrStaff,BannerController.getAll);
route.get("/banner/getOne/:bannerId",verifyTokenAndAdminOrStaff,BannerController.getOne)
route.post("/banner/insert",verifyTokenAndAdminOrStaff,BannerController.insert);
route.put("/banner/update/:bannerId",verifyTokenAndAdminOrStaff,BannerController.updateBanner);
route.put("/banner/status/:bannerId",verifyTokenAndAdminOrStaff,BannerController.updateStatus);
route.delete("/banner/delete/:bannerId",verifyTokenAndAdminOrStaff,BannerController.deleteBanner)
//======================= userController =============================

route.post("/user/create",verifyTokenAndAdminOrStaff, Controllers.userController.createUser)
route.post("/user/band/:userId",verifyTokenAndAdminOrStaff,Controllers.userController.bandUser)
route.post("/user/forgetPassword",Controllers.userController.forgetPassword)
route.put("/user/update",verifyToken, Controllers.userController.updateUser)
route.put("/user/updatePassword",verifyToken, Controllers.userController.updatePassword)
route.delete("/user/delete/:_id",verifyTokenAndAdminOrStaff, Controllers.userController.deleteUser)
route.get("/user/getProfile",verifyToken, Controllers.userController.getProfile)
route.get("/user/gets",verifyTokenAndAdminOrStaff, Controllers.userController.getUsers)
route.get("/user/get/:_id",verifyToken, Controllers.userController.getUsers)
route.post("/user/getBand",verifyTokenAndAdmin,Controllers.userController.getBandUser)
//======================= uploadFile =================================

route.post("/uploadFile", Controllers.uploadFileController.uploadFile)
route.post("/deleteFile/", verifyTokenAndAdminOrStaff, Controllers.uploadFileController.deleteFile)


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

//======================= bookingController ===========================

route.post("/booking/create",verifyToken,Controllers.bookingController.createBooking)
route.put("/booking/updateProccess",verifyToken,Controllers.bookingController.updateToProcess)
route.put("/booking/updateEnd",verifyTokenAndAdminOrStaff,Controllers.bookingController.updateEnd)
route.delete("/booking/delete/:_id",verifyTokenAndAdminOrStaff,Controllers.bookingController.deleteBooking)
route.get("/booking/get/:_id",verifyToken,Controllers.bookingController.getBooking)
route.get("/booking/gets",verifyTokenAndAdminOrStaff,Controllers.bookingController.getBookings)

//======================= checkoutController ==========================

route.post("/checkout/create",verifyTokenAndAdmin,Controllers.checkoutController.createCheckout)
route.put("/checkout/updateCheckout",verifyTokenAndAdmin,Controllers.checkoutController.updateCheckout)
route.delete("/checkout/delete/:_id",verifyTokenAndAdmin,Controllers.checkoutController.deleteCheckout)
route.get("/checkout/get/:_id",verifyTokenAndAdminOrStaff,Controllers.checkoutController.getCheckout)
route.get("/checkout/gets",verifyTokenAndAdmin,Controllers.checkoutController.getCheckouts)


//======================= favoriteController ==========================

route.post("/favorite/createOrdelete",verifyToken,Controllers.favoriteController.createFavorite)
route.get("/favorite/gets",verifyToken,Controllers.favoriteController.getFavorites)


export default route