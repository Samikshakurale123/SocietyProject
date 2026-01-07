import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../../assets/logo/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [sidenav, setSidenav] = useState(false);
  const [sticky, setSticky] = useState(false);

  const menuIcon = <FontAwesomeIcon icon={faBars} />;

  const sidenavShow = () => {
    setSidenav(!sidenav);
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="site_header" className={sticky ? "sticky" : ""}>
      <div className="container">
        <nav className="navbar" id="Navbar">
          {/* Logo */}
          <div className="navbar_brand">
            <RouterLink to="/" className="brand_wrap">
              <img src={Logo} alt="Logo" />
              <span className="apartment_name">Kumar Varsh</span>
            </RouterLink>
          </div>

          {/* Mobile icon */}
          <div className="navbar_toggler" onClick={sidenavShow}>
            {menuIcon}
          </div>

          {/* Menu */}
          <div className={`menu_items ${sidenav ? "active" : ""}`}>
            <ul>
              <li>
                <ScrollLink to="home" smooth={true} spy={true}>
                  Home
                </ScrollLink>
              </li>

              <li>
                <ScrollLink to="about" smooth={true} spy={true}>
                  About Us
                </ScrollLink>
              </li>

              {/* ✅ ROUTER LINK */}
              <li>
                <RouterLink to="/maintenance">
                  Maintenance
                </RouterLink>
              </li>

              <li>
                <ScrollLink to="complaints" smooth={true} spy={true}>
                  Complaints
                </ScrollLink>
              </li>

              <li>
                <RouterLink to="/login">
                  Login
                </RouterLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
