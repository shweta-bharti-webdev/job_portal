const express = require("express");
const authController = require("../controller/auth.controller");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register",authController.registerUser);
router.post("/login",authController.loginUser);
router.post("/logout",authController.logoutUser);


module.exports = router;