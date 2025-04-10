import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OtpPage.css";

const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const from = location.state?.from; // "signup" or undefined (for login)

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("❌ Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const endpoint =
        from === "signup"
          ? "http://localhost:5000/api/auth/verify-signup-otp"
          : "http://localhost:5000/api/auth/verify-otp";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(`❌ ${data.msg || "Verification failed"}`);
        setLoading(false);
        return;
      }

      // ✅ OTP verified → go to home
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
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
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpPage;
