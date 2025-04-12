import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartUpPage from "./components/pages/StartUpPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import OtpPage from "./components/pages/OtpPage";
import UserHomePage from "./components/pages/UserHomePage";
import ForgetPasswordPage from "./components/pages/ForgotPasswordPage";
import ForgotPasswordOtpPage from "./components/pages/ForgotPasswordOtpPage";
import ResetPasswordPage from "./components/pages/ResetPassworPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/forgot-password-otp" element={<ForgotPasswordOtpPage/>}/>
        <Route path="/reset-password" element = {<ResetPasswordPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;


