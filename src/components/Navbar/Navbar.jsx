import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo/logo.jpg";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Load username from localStorage whenever login state changes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setUsername(user?.firstName || "");
  }, [isLoggedIn]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" className="navbar-logo me-2" />
          <span className="brand-name">Kumar Varsh</span>
        </Link>

        {/* Language Switcher */}
        <div className="ms-auto me-3">
          <LanguageSwitcher />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                {t("Home")}
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    {t("About Us")}
                  </Link>
                </li>
                <li className="nav-item ms-3">
                  <Link className="btn btn-primary btn-sm px-4" to="/login">
                    {t("Login")}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/maintenance">
                    {t("Maintenance")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/complaint">
                    {t("Complaints")}
                  </Link>
                </li>

                {/* User dropdown */}
                <li className="nav-item position-relative ms-3" ref={dropdownRef}>
                  <FaUserCircle
                    size={26}
                    className="user-icon"
                    onClick={() => setShowMenu(!showMenu)}
                  />
                  {showMenu && (
                    <div className="user-dropdown">
                      <p className="username">
                        {t("Hi")}, {username || t("User")}
                      </p>
                      <button
                        className="btn btn-outline-danger btn-sm w-100"
                        onClick={handleLogout}
                      >
                        {t("Logout")}
                      </button>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
