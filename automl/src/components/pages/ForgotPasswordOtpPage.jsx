import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ForgotPasswordOtpPage.css";

const ForgotPasswordOtpPage = () => {
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return setError("❌ Please enter the OTP");

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-forgot-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/reset-password", { state: { email } });
      } else {
        setError(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error(err);
      setError("❌ Server error");
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify OTP</h2>
      <p className="info-line">OTP sent to your email: <strong>{email}</strong></p>
      <form onSubmit={handleSubmit} className="otp-form">
        <input
          type="text"
          placeholder="Enter the OTP"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            setError("");
          }}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default ForgotPasswordOtpPage;
