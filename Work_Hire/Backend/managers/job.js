const Job = require("../models/job");
const User = require("../models/user");

const getAllJobs = async (category) => {
  console.log("Reached manager", category);
  try {
    const query = category
      ? { category: new RegExp(`^${category}$`, "i") } // case-insensitive exact match
      : {};
    const allJobs = await Job.find(query);
    console.log(allJobs);
    return allJobs;
  } catch (err) {
    console.log("ERROR IN getAllJobs JOBMANAGER", err);
    throw err;
  }
};

async function createJob(
  title,
  recruiterEmailId,
  recruiterPhoneNumber,
  category,
  description,
  location,
  offeredSalary,
  numberOfPositions
) {
  const job = {
    title,
    recruiterEmailId,
    recruiterPhoneNumber,
    category,
    description,
    location,
    offeredSalary,
    numberOfPositions,
  };

  try {
    const newJob = await Job.create(job);
    return newJob;
  } catch (err) {
    console.log("ERROR IN postNewjob JOBMANAGER");
    throw err;
  }
}

const getAllCandidates = async (category) => {
  try {
    const query = category
      ? { category: new RegExp(`^${category}$`, "i") } // case-insensitive
      : {};
    const allCandidates = await User.find(query);
    console.log(allCandidates);
    return allCandidates;
  } catch (err) {
    console.log("ERROR IN getAllCandidates JOBMANAGER", err);
    throw err;
  }
};


async function applyToAJob(job_id, aadharNumber) {
  let applicant;
  try {
    applicant = await User.findOne({ aadharNumber });
    if (!applicant) {
      throw "Please update your profile first and then apply";
    }
  } catch (err) {
    console.log("ERROR IN applyToAJob - finding applicant JOBMANAGER");
    throw err;
  }

  let job;
  try {
    job = await Job.findById(job_id);
    if (!job) {
      throw "Job doesnt exist";
    }
  } catch (err) {
    console.log("finding job failed");
    throw err;
  }

  return {
    recruiterEmailId: job.recruiterEmailId,
    recruiterPhoneNumber: job.recruiterPhoneNumber,
    jobCategory: job.category,
    recruiterName: job.title,
    applicantUsername: applicant.username,
    applicantPhoneNumber: applicant.phoneNumber,
    applicantCategory: applicant.category,
    applicantOtherSkills: applicant.otherSkills,
    applicantYOE: applicant.YOE,
    applicantAvailability: applicant.availability,
    applicantEmail: applicant.email
    
  };
}

module.exports = {
  getAllJobs,
  createJob,
  getAllCandidates,
  applyToAJob,
};
