import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OtpPage.css";

const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your registered email";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const defaultOtp = "123456";

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp === defaultOtp) {
      navigate("/home"); // redirect to user home
    } else {
      setError("❌ Invalid OTP. Please try again.");
    }
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpPage;
