const User = require("../models/user");

async function createUser(
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
  console.log("Reached manager", availability);
  const user = {
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
  
  };
  console.log("printing from manager", user);
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (err) {
    console.log("ERROR IN USER MANAGER");
    throw err;
  }
}

module.exports = { createUser };
