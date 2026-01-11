import React from "react";


const About = () => {
  return (
    <div className="page">
      <h1>About Kumar Varsh Apartment</h1>

      <p>
        Kumar Varsh Apartment offers modern, secure, and comfortable living
        designed for families seeking a peaceful residential environment.
      </p>

      <h2>Project Overview</h2>
      <ul>
        <li><strong>Project Type:</strong> Residential Apartment</li>
        <li><strong>Total Floors:</strong> Ground + 5 Floors</li>
        <li><strong>Total Units:</strong> 40 Apartments</li>
        <li><strong>Apartment Types:</strong> 1 BHK / 2 BHK / 3 BHK</li>
        <li><strong>Construction Status:</strong> Completed</li>
        <li><strong>Completion Date:</strong> March 2025</li>
      </ul>

      <h2>Amenities & Features</h2>
      <ul>
        <li>Spacious and well-ventilated rooms</li>
        <li>Modern kitchen and bathrooms</li>
        <li>24/7 security</li>
        <li>Lift facility</li>
        <li>Power backup</li>
        <li>Dedicated parking</li>
        <li>Continuous water supply</li>
        <li>Fire safety systems</li>
      </ul>

      <h2>Location Advantages</h2>
      <p>
        The apartment is strategically located with easy access to schools,
        hospitals, shopping centers, and public transport. The neighborhood is
        peaceful and secure, ideal for families.
      </p>

      <h2>Contact Information</h2>
      <p><strong>Phone:</strong> +91 98765 43210</p>
      <p><strong>Email:</strong> info@apartmentname.com</p>
      <p>
        <strong>Address:</strong><br />
        Kumar Varsh Apartment<br />
        Main Road, Near Landmark<br />
        City, State, ZIP Code
      </p>

      <h2>Location Map</h2>
      <iframe
        title="Apartment Location"
        src="https://www.google.com/maps?q=City&output=embed"
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default About;

