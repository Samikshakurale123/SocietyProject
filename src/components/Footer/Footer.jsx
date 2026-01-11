import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">

          <div className="col-md-6 mb-3">
            <h5 className="footer-title">Kumar Varsh</h5>
            <p className="footer-text">
              A simple and reliable platform for managing maintenance and
              complaints efficiently.
            </p>
          </div>

          <div className="col-md-3 mb-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-3">
            <h6>Support</h6>
            <p className="footer-text">support@kumarvarsh.com</p>
          </div>

        </div>

        <div className="footer-bottom text-center">
          © {new Date().getFullYear()} Kumar Varsh. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
