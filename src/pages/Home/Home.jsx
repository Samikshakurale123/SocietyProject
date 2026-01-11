import React from "react";
import BannerImage from "../../assets/banner/banner-img.jpg";




export default function Home({ isLoggedIn }) {

  
  return (
    <>
      {/* HERO SECTION */}
      <section id="home">
        <div className="container">
          <div className="row align-items-center py-5">

            {/* Left Content */}
            <div className="col-lg-6 col-md-12 mb-4">
              <h1 className="home-title">
                Welcome to <span>Kumar Varsh</span>
              </h1>

              <p className="home-subtitle">
                A simple and reliable platform to manage maintenance, track
                complaints, and ensure smooth community living.
              </p>

            </div>

            {/* Right Image */}
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
            <h2 className="section-title">Our Features</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <h5>Maintenance Tracking</h5>
                <p>
                  Easily manage and track maintenance payments with full transparency.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h5>Complaint Management</h5>
                <p>
                  Raise and monitor complaints with quick resolution support.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <h5>Secure Access</h5>
                <p>
                  Safe login system ensuring privacy and secure access for residents.
                </p>
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
                <p>Residents</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-box">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="stat-box">
                <h3>Fast</h3>
                <p>Complaint Resolution</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
