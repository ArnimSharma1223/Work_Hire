const sendMail = require("../commons/mail");
const util = require("../commons/util");
const sendSMS = require("../commons/sms");

const {
  getAllJobs: getAllJobsManager,
  createJob: createJobManager,
  getAllCandidates: getAllCandidatesManager,
  applyToAJob: applyToAJobManager,
} = require("../managers/job");

async function getAllJobs(category) {
  console.log("Reached service", category);
  try {
    const allJobs = await getAllJobsManager(category);
    console.log("Result from services", allJobs);
    return allJobs;
  } catch (err) {
    console.log("ERROR IN getAllJobs JOBSERVICE",err);
    throw err;
  }
}

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
  try {
    const newJob = await createJobManager(
      title,
      recruiterEmailId,
      recruiterPhoneNumber,
      category,
      description,
      location,
      offeredSalary,
      numberOfPositions
    );
    return newJob;
  } catch (err) {
    console.log("ERROR IN postNewjob JOBSERVICE");
    throw err;
  }
}

async function getAllCandidates(category) {
  try {
    const allCandidates = await getAllCandidatesManager(category);
    return allCandidates;
  } catch (err) {
    console.log("ERROR IN getAllCandidates JOBSERVICE",err);
    throw err;
  }
}

async function applyToAJob(job_id, aadharNumber) {
  try {
    const {
      recruiterEmailId,
      recruiterPhoneNumber,
      jobCategory,
      recruiterName,
      applicantUsername,
      applicantPhoneNumber,
      applicantCategory,
      applicantOtherSkills,
      applicantYOE,
      applicantAvailability,
      applicantEmail
    } = await applyToAJobManager(job_id, aadharNumber);


    console.log(
      "SERVICES",
      recruiterEmailId,
      recruiterPhoneNumber,
      jobCategory,
      recruiterName,
      applicantUsername,
      applicantPhoneNumber,
      applicantCategory,
      applicantOtherSkills,
      applicantYOE,
      applicantAvailability,
      applicantEmail
    );

    // Message for recruiter
    let msg = util.createMessageForRecruiter(
      applicantUsername,
      applicantPhoneNumber,
      applicantCategory,
      applicantOtherSkills,
      applicantYOE,
      applicantAvailability,
      
    );
    sendMail(recruiterEmailId, msg);
    console.log("Email sent to recruiter");
    // const recruiterPhone = "+91" + recruiterPhoneNumber;
    // sendSMS(recruiterPhone, msg);

    // Message for applicant
    msg = util.createMessageForApplicant(
      applicantUsername,
      jobCategory,
      recruiterName
    );
    const applicantPhone = "+91" + applicantPhoneNumber;
    //sendSMS(applicantPhone, msg);

//appliocation contestant email

    sendMail(applicantEmail, msg);
    console.log("Email sent to recruiter2");
  } catch (err) {
    console.log("ERROR IN applyToAJob JOBSERVICE", err);
    throw err;
  }
}

module.exports = {
  getAllJobsService: getAllJobs,
  createJobService: createJob,
  getAllCandidatesService: getAllCandidates,
  applyToAJobService: applyToAJob,
};
