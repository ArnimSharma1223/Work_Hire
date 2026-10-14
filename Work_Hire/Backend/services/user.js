const { createUser: createUserManager } = require("../managers/user");

async function createUserService(
  username,
  email,
  phoneNumber,
  aadharNumber,
  category,
  YOE,
  otherSkills,
  currentLocation,
  availability,
  messageForRecruiter
) {
  console.log("Reached service", availability);
  try {
    const res = await createUserManager(
      username,
      email,
      phoneNumber,
      aadharNumber,
      category,
      YOE,
      otherSkills,
      currentLocation,
      availability,
      messageForRecruiter
      
    );
    console.log("Received from manager in service ", res);
    return res;
  } catch (err) {
    console.log("Received ERROR from manager in service ", err);
    throw err;
  }
}

module.exports = { createUserService };
