const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userValidation = require("../validations/userValidation");
const validate = require("../middleware/zodMiddleWare");
router.post("/user/signup", validate(userValidation), userController.signup);
router.post("/user/login", userController.login);
router.post("/user/loginEmail",userController.loginViaEmail)
router.post("/user/verify", userController.verifyOtp);
// router.post("/user/logout", userController.logout);
router.post("/user/forgotPassword", userController.forgetPassword);
router.post("/user/changepass", userController.changePassword);
router.get("/user", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUserById);
router.delete("/user/:id", userController.deleteUserById);
router.post("/google",userController.google)
module.exports = router;
