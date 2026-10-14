const { twilio_sid, twilio_auth_token, twilio_phone_number } = require("../config");
const client = require("twilio")(twilio_sid, twilio_auth_token);

async function sms(to, msg) {
  try {
    // Format the phone number to E.164 format
    const formattedNumber = formatPhoneNumber(to);
    
    const message = await client.messages.create({
      body: msg,
      from: twilio_phone_number, // Use your Twilio phone number here
      to: formattedNumber,
    });
    
    console.log("Message successfully sent! Message SID: ", message.sid, to);
    return message;
  } catch (err) {
    console.error("Message couldn't be sent. Error: ", err);
    throw err;
  }
}

// Helper function to format phone numbers to E.164 format
function formatPhoneNumber(phoneNumber) {
  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Add India country code if not present
  if (!cleaned.startsWith('91')) {
    return `+91${cleaned}`;
  }
  
  return `+${cleaned}`;
}

module.exports = sms;