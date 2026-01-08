import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/logo.jpg";

export default function Navbar() {
  return (
    <header className="navbar_header">
      <div className="navbar_container">
        {/* Logo */}
        <div className="navbar_brand">
          <img src={Logo} alt="Logo" />
          <span>Kumar Varsh</span>
        </div>

        {/* Menu */}
        <ul className="navbar_menu">
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About Us</a></li>
          <li><Link to="/maintenance">Maintenance</Link></li>
          <li><Link to="/complaint">Complaint</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </header>
  );
}
