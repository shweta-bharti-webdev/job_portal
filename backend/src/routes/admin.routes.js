const express = require("express");
const adminController = require("../controller/admin.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post("/register",adminController.adminOrNot);
router.get("/admindashboard",authMiddleware.isAuthenticated,roleMiddleware.isAdmin,adminController.getAdminDashboard);
router.get("/users",authMiddleware.isAuthenticated,roleMiddleware.isAdmin,adminController.getAllUsers);
router.get("/user/:id",authMiddleware.isAuthenticated,roleMiddleware.isAdmin,adminController.getSingleUser);
router.delete("/users/:id",authMiddleware.isAuthenticated,roleMiddleware.isAdmin,adminController.deleteUser);
router.put("/users/block/:id",authMiddleware.isAuthenticated,roleMiddleware.isAdmin,adminController.toggleBlockUser);
router.get("/recruiters",authMiddleware.isAuthenticated,roleMiddleware.isAdmin,adminController.getAllRecruiters);
router.get("/recruiter/:id",authMiddleware.isAuthenticated,roleMiddleware.isAdmin,adminController.getSingleRecruiter);
router.delete("/recruiters/:id",authMiddleware.isAuthenticated,roleMiddleware.isAdmin,adminController.deleteRecruiter);
router.put("/recruiters/block/:id",authMiddleware.isAuthenticated,roleMiddleware.isAdmin,adminController.toggleBlockRecruiter);

module.exports = router;