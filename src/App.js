import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Maintenance from "./components/Maintenance/Maintenance";
import RegistrationForm from "./components/Registration/RegistrationForm";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Maintenance */}
        <Route path="/maintenance" element={<Maintenance />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            <div className="page-wrapper">
              <Login />
            </div>
          }
        />

        {/* Register */}
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
