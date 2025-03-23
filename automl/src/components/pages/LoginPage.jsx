import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  // Default credentials
  const defaultCredentials = {
    email: "test@example.com",
    password: "password123",
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Error message state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if credentials match
    if (
      formData.email === defaultCredentials.email &&
      formData.password === defaultCredentials.password
    ) {
      // Navigate to OTP Page with email as state
      navigate("/otp", { state: { email: formData.email } });
    } else {
      setError("❌ Incorrect login credentials!"); // Show error message
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>} {/* Show error message */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
