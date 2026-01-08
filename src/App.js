import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Maintenance from "./components/Maintenance/Maintenance";
import RegistrationForm from "./components/Registration/RegistrationForm";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Complaints from "./components/Complaints/Complaints";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route
          path="/register"
          element={
            <div className="registration-page">
              <RegistrationForm />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/complaint" element={<Complaints />} />
      </Routes>
    </Router>
  );
}

export default App;
