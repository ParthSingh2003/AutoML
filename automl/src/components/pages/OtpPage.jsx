import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/OtpPage.css";

const OtpPage = () => {
  const location = useLocation();
  const email = location.state?.email || "your registered email";

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    console.log("Entered OTP:", otp);
    alert("OTP Verified Successfully!");
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <p className="otp-message">
        An OTP has been sent to <span>{email}</span>. Please enter it below.
      </p>
      <form onSubmit={handleVerify} className="otp-form">
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
          maxLength="6"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpPage;
