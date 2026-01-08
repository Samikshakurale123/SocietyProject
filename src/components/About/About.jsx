import React from "react";
import banner from "../../assets/banner/banner.png"; // hero image
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Welcome to [ Kumar Varsh Apartment]</h1>
          <p>
            Experience modern, secure, and comfortable living in the heart of
            [City Name].
          </p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="about-section">
        <h2>Project Overview</h2>
        <ul className="details-list">
          <li><strong>Project Type:</strong> Residential Apartment</li>
          <li><strong>Total Floors:</strong> Ground + 5 Floors</li>
          <li><strong>Total Units:</strong> 40 Apartments</li>
          <li><strong>Apartment Types:</strong> 1 BHK / 2 BHK / 3 BHK</li>
          <li><strong>Construction Status:</strong> Completed</li>
          <li><strong>Completion Date:</strong> March 2025</li>
        </ul>
      </section>

      {/* Features */}
      <section className="about-section light">
        <h2>Amenities & Features</h2>
        <div className="features-grid">
          <span>Spacious & Well-ventilated Rooms</span>
          <span>Modern Kitchen & Bathrooms</span>
          <span>24/7 Security</span>
          <span>Lift Facility</span>
          <span>Power Backup</span>
          <span>Dedicated Parking</span>
          <span>Continuous Water Supply</span>
          <span>Fire Safety Systems</span>
        </div>
      </section>

      {/* Location */}
      <section className="about-section">
        <h2>Location Advantages</h2>
        <p>
          Strategically located with easy access to schools, hospitals,
          shopping centers, and public transport. Peaceful and secure
          neighborhood ideal for families.
        </p>
      </section>

      {/* Contact */}
      <section className="about-section contact">
        <h2>Contact Us</h2>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Email:</strong> info@apartmentname.com</p>
        <address>
          <strong>Address:</strong><br />
          [Kumar Varsh Apartment]<br />
          Main Road, Near Landmark<br />
          City, State, ZIP Code
        </address>
      </section>

      {/* Map */}
      <section className="about-section">
        <h2>Find Us on the Map</h2>
        <div className="map-container">
          <iframe
            title="Apartment Location"
            src="https://www.google.com/maps?q=[City Name]&output=embed"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default About;
