const express = require("express");
const userController = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();
router.get("/profile",authMiddleware.isAuthenticated,roleMiddleware.isUser,userController.getMyProfile);
router.get("/me",authMiddleware.isAuthenticated,userController.getMyProfile);
router.put("/profile/update",authMiddleware.isAuthenticated,userController.updateProfile);
router.get("/jobs",userController.getJobs);
router.get("/jobs/:id",userController.getJobById);
router.post("/applyJob/:id",authMiddleware.isAuthenticated,roleMiddleware.isUser,userController.applyJob);
router.get("/my_applications",authMiddleware.isAuthenticated,roleMiddleware.isUser,userController.getMyApplications);

module.exports = router;