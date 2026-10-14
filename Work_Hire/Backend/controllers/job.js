const { getAllJobsService, createJobService, getAllCandidatesService, applyToAJobService }
 = require("../services/job");

async function getAllJobs(req, res) {
  const category = req.query.CATEGORY;
  console.log("Reached controller");
  console.log(category);
  try {
    const allJobs = await getAllJobsService(category);
    console.log("Result from controller", allJobs);
    return res.status(201).json({ jobs: allJobs });
  } catch (err) {
    console.log("ERROR IN getAllJobs JOBCONTROLLER",err);
    return res.status(500).send(err);
  }
}

async function createJob(req, res) {
  const {
    title,
    recruiterEmailId,
    recruiterPhoneNumber,
    category,
    description,
    location,
    offeredSalary,
    numberOfPositions,
  } = req.body;

  console.log("Reached controller");
  console.log(req.body);
  try {
    const job = await createJobService(
      title,
      recruiterEmailId,
      recruiterPhoneNumber,
      category,
      description,
      location,
      offeredSalary,
      numberOfPositions
    );
    return res.status(201).json({ data: job });
  } catch (err) {
    console.log("Error being sent from backend", err);
    return res.status(400).send(err);
  }
}

async function getAllCandidates(req, res) {
  const category = req.query.CATEGORY;
  console.log("controller", category);
  try {
    const allCandidates = await getAllCandidatesService(category);
    return res.status(200).json({ candidates: allCandidates });
  } catch (err) {
    console.log("ERROR IN getAllCandidates JOBCONTROLLER",err);
    return res.status(500).send(err);
  }
}

async function applyToAJob(req, res) {
  const job_id = req.params.job_id;
  const { aadharNumber } = req.body;
  console.log("Controller", job_id, aadharNumber);
  try {
    await applyToAJobService(job_id, aadharNumber);
    return res.status(200).send("Your application has been sent");
  } catch (err) {
    console.log("ERROR IN applyjob JOBCONTROLLER");
    return res.status(500).send(err);
  }
}

module.exports = {
  getAllJobs,
  createJob,
  getAllCandidates,
  applyToAJob,
};
