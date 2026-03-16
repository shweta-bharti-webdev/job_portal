const express = require("express");
const recruiterController = require("../controller/recruiter.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();
router.get("/profile",authMiddleware.isAuthenticated,roleMiddleware.isRecruiter,recruiterController.getRecruiterProfile);
router.post("/company",authMiddleware.isAuthenticated,roleMiddleware.isRecruiter,recruiterController.createCompany);
router.get("/company",authMiddleware.isAuthenticated,roleMiddleware.isRecruiter,recruiterController.getRecruiterCompany);
router.put("/companyUpdate/:id",authMiddleware.isAuthenticated, roleMiddleware.isRecruiter,recruiterController.updateComapny);
router.post("/job",authMiddleware.isAuthenticated,roleMiddleware.isRecruiter,recruiterController.createJob);
router.put("/job/:jobId",authMiddleware.isAuthenticated, roleMiddleware.isRecruiter,recruiterController.updateJobById);
router.delete("/job/:jobId",authMiddleware.isAuthenticated,roleMiddleware.isRecruiter,recruiterController.deleteJobById);
router.get("/my_jobs",authMiddleware.isAuthenticated,roleMiddleware.isRecruiter,recruiterController.get_jobs);
router.get("/applicants/all",authMiddleware.isAuthenticated,roleMiddleware.isRecruiter,recruiterController.getAllApplicants);
router.get("/applicants/:jobId",authMiddleware.isAuthenticated,roleMiddleware.isRecruiter,recruiterController.getApplicants);
router.patch("/application/:applicationId/status",authMiddleware.isAuthenticated,roleMiddleware.isRecruiter,recruiterController.updateApplicationStatus);

module.exports = router;