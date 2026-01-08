import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Maintenance from "./components/Maintenance/maintenance";
import RegistrationForm from "./components/Registration/RegistrationForm";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/login" element={<Login />} />
        
        {/* Updated: wrap registration page for custom background */}
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

