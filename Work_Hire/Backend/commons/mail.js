const nodemailer = require("nodemailer");
const { admin_mail, admin_mail_pass } = require("../config");

async function mail(to, msg) {
  // Remove this as it's not secure and shouldn't be needed with proper setup
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: admin_mail,
    pass: admin_mail_pass
  }
  });
  transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Connected Successfully!");
  }
});


  const mailOptions = {
    from: admin_mail,
    to: to,
    subject: "New Applicant Details",
    text: msg,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Mail successfully sent! Result:", result);
    return result;
  } catch (err) {
    console.error("Mail couldn't be sent. Err: ", err);
    throw err;
  }
}

module.exports = mail;