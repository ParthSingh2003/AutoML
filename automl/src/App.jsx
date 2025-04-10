// import React from "react";
// import DatasetUploader from "./components/pages/DatasetUploaderPage";


// function App() {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Upload Dataset</h1>
//       <DatasetUploader />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartUpPage from "./components/pages/StartUpPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import OtpPage from "./components/pages/OtpPage";
import UserHomePage from "./components/pages/UserHomePage";

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
      </Routes>
    </Router>
  );
};

export default App;


