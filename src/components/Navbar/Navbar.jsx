import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/logo/logo.jpg";


export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <span>Kumar Varsh</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/maintenance">Maintenance</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li className="register"><Link to="/register">Registration</Link></li>
      </ul>
    </nav>
  );
}
