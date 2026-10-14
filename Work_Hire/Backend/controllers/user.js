const { createUserService } = require("../services/user");

async function createUser(req, res) {
  const {
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
   
  } = req.body;

  console.log("Reached controller");
  console.log(req.body);
  try {
    const user = await createUserService(
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
    return res.status(201).json({ data: user });
  } catch (err) {
    console.log("Error being sent from backend", err);
    return res.status(400).send(err);
  }
}

module.exports = { createUser };
