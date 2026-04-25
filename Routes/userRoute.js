const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/register", userController.renderRegister);
router.post("/register", userController.registerUser);
router.get("/users", userController.getAllUsers);
router.get('/login',userController.renderLoginForm);
router.post('/login',userController.loginUser);
router.get('/logout',userController.logOutUser);
router.get('/forgotpassword', userController.forgotpassword);
router.post('/forgotpassword', userController.handleforgotPassword);
module.exports = router;