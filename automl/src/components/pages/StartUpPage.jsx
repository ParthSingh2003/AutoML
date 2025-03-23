import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StartUpPage.css";

const StartUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="startup-container">
      <h1 className="startup-title">AutoML</h1>
      <p className="startup-description">
        AutoML is a powerful platform that allows you to train your own machine learning models using your own data. No coding required—just upload your dataset, configure your model, and let AutoML do the rest!
      </p>
      
      <div className="video-section">
        <p className="video-label">Watch the tutorial:</p>
        <video className="tutorial-video" controls>
          <source src="your-tutorial-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="button-container">
        <button className="startup-button login-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="startup-button signup-button" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default StartUpPage;
