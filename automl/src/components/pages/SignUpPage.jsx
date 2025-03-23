import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Error state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation to check if all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("❌ Please fill in all fields!");
      return;
    }

    // Navigate to OTP Page with email
    navigate("/otp", { state: { email: formData.email } });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
