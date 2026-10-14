import React, { useState } from "react";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const PhoneOtp = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  };

  const sendOtp = async () => {
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(
        auth,
        "+91" + phone,
        appVerifier
      );

      setConfirmation(result);
      alert("OTP sent!");
    } catch (err) {
      console.log(err);
      alert("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmation.confirm(otp);
      alert("Login successful!");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Phone OTP Login</h2>

      <input
        placeholder="Phone number"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={sendOtp}>Send OTP</button>

      <br /><br />

      <input
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={verifyOtp}>Verify OTP</button>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneOtp;