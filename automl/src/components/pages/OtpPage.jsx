import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OtpPage.css";

const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = location.state?.email;
  const fromLogin = location.state?.fromLogin || false;

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("❌ Please enter the OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/${fromLogin ? "verify-login-otp" : "verify-signup-otp"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
      } else {
        setError(`❌ ${data.msg || "Invalid OTP."}`);
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <p className="info-message">📩 OTP sent to your email: <strong>{email}</strong></p>

      <form onSubmit={handleVerifyOtp} className="otp-form">
        <input
          type="text"
          name="otp"
          placeholder="Enter the OTP"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            setError("");
          }}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpPage;
