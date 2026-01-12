import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Registration/RegistrationForm";
import About from "./pages/About/About";
import Maintenance from "./pages/Maintenance/Maintenance";
import Complaint from "./pages/Complaints/Complaints";
import Footer from "./components/Footer/Footer";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";


import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Persist login on refresh
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/maintenance"
          element={isLoggedIn ? <Maintenance /> : <Navigate to="/login" />}
        />
        <Route
          path="/complaint"
          element={isLoggedIn ? <Complaint /> : <Navigate to="/login" />}
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
