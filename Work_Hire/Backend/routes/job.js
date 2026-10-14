const express = require("express");
const methodOverride = require("method-override");
const router = express.Router();

const { getAllJobs, createJob, getAllCandidates, applyToAJob } = require("../controllers/job");

// Middleware
router.use(methodOverride("_method"));

// Routes
router.get("/", getAllJobs);               // Show all jobs
router.post("/", createJob);               // Create a new job
router.get("/candidates", getAllCandidates); // Get all candidates for jobs
router.post("/:job_id/apply", applyToAJob);  // Apply to a job

module.exports = router;
