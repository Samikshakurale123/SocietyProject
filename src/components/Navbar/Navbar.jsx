import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo/logo.jpg";


const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setUsername(user.name);
    } else {
      setUsername("");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        
       {/* Left side logo */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logo}
          alt="Kumar Varsh Logo"
          className="navbar-logo me-2"
        />
        <span className="brand-name">Kumar Varsh</span>
      </Link>



        {/* Toggle button for mobile */}
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

            {/* COMMON */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About Us</Link>
                </li>

                <li className="nav-item ms-3">
                  <Link className="btn btn-primary btn-sm px-4" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/maintenance">Maintenance</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/complaint">Complaints</Link>
                </li>

                {/* User Icon */}
                <li className="nav-item position-relative ms-3">
                  <FaUserCircle
                    size={26}
                    className="user-icon"
                    onClick={() => setShowMenu(!showMenu)}
                  />

                  {showMenu && (
                    <div className="user-dropdown">
                      <p className="username">{username}</p>
                      <button
                        className="btn btn-outline-danger btn-sm w-100"
                        onClick={handleLogout}
                      >
                        Logout
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
