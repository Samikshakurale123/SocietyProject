import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Maintenance from "./components/Maintenance/Maintenance";
import RegistrationForm from "./components/Registration/RegistrationForm";
import Complaints from "./components/Complaints/Complaints"; // 
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/register"
          element={
            <div className="registration-page">
              <RegistrationForm />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

