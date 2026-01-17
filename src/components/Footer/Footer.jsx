import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">

          {/* About / Description */}
          <div className="col-md-6 mb-3">
            <h5 className="footer-title">{t("footerTitle")}</h5>
            <p className="footer-text">{t("footerDescription")}</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-3">
            <h6>{t("footerQuickLinks")}</h6>
            <ul className="footer-links">
              <li><Link to="/">{t("Home")}</Link></li>
              <li><Link to="/about">{t("About Us")}</Link></li>
              <li><Link to="/maintenance">{t("Maintenance")}</Link></li>
              <li><Link to="/complaints">{t("Complaints")}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3 mb-3">
            <h6>{t("footerSupport")}</h6>
            <p className="footer-text">support@kumarvarsh.com</p>
          </div>

        </div>

        <div className="footer-bottom text-center">
          © {new Date().getFullYear()} Kumar Varsh. {t("All rights reserved.")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
