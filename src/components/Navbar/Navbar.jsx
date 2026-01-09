import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/logo.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar_header">
      <div className="navbar_container">
        {/* Logo */}
        <div className="navbar_brand">
          <img src={Logo} alt="Logo" />
          <span>Kumar Varsh Apartment</span>
        </div>

        {/* Hamburger Icon */}
        <div
          className={`navbar_toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Menu */}
        <ul className={`navbar_menu ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/About" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/maintenance" onClick={() => setMenuOpen(false)}>
              Maintenance
            </Link>
          </li>
          <li>
            <Link to="/complaint" onClick={() => setMenuOpen(false)}>
              Complaint
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
