import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResetPasswordPage.css";

const ResetPasswordPage = () => {
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      return setError("❌ Password must be at least 6 characters");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("✅ Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(`❌ ${data.msg}`);
      }
    } catch (err) {
      console.error(err);
      setError("❌ Server error");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-form">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
            setMsg("");
          }}
        />
        {error && <p className="error-message">{error}</p>}
        {msg && <p className="success-message">{msg}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
