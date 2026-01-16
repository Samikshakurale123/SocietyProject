import React from "react";
import BannerImage from "../../assets/banner/banner-img.jpg";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("home");

  return (
    <>
      {/* HERO SECTION */}
      <section id="home">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-lg-6 col-md-12 mb-4">
              <h1 className="home-title">
                {t("welcome")} <span>Kumar Varsh</span>
              </h1>

              <p className="home-subtitle">
                {t("subtitle")}
              </p>
            </div>

            <div className="col-lg-6 col-md-12 text-center">
              <img
                src={BannerImage}
                alt="Community Management"
                className="img-fluid home-banner-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="container">
          <div className="row text-center mb-4">
            <h2 className="section-title">{t("features")}</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <h5>{t("maintenanceTracking")}</h5>
                <p>{t("maintenanceDesc")}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h5>{t("complaintManagement")}</h5>
                <p>{t("complaintDesc")}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h5>{t("secureAccess")}</h5>
                <p>{t("secureDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="stat-box">
                <h3>100+</h3>
                <p>{t("residents")}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-box">
                <h3>24/7</h3>
                <p>{t("support")}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-box">
                <h3>Fast</h3>
                <p>{t("complaintResolution")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
