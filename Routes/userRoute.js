const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const catchError = require("../services/catchError");

router.get("/register",catchError (userController.renderRegister));
router.post("/register", catchError(userController.registerUser));
router.get("/users", catchError(userController.getAllUsers));
router.get('/login',catchError(userController.renderLoginForm));
router.post('/login',catchError(userController.loginUser));
router.get('/logout',catchError(userController.logOutUser));
router.get('/forgotpassword', catchError(userController.forgotpassword));
router.post('/forgotpassword', catchError(userController.handleforgotPassword));
router.get('/resetPassword',catchError(userController.renderResetPassword));

router.post('/verifyOTP',catchError(userController.verifyOTP));
router.post('/resetPassword/:email/:otp',catchError(userController.handleResetPasssword))

module.exports = router;