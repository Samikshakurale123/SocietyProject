import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../App.css";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    dob: "",
    address: "",
    wing: "",
    flatNumber: "",
    pincode: "",
    securityA1: "",
    securityA2: "",
    securityA3: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && !/^\d*$/.test(value)) return;
    if (name === "pincode" && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  // Validation function
  const validate = () => {
    const err = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) err[key] = "This field is required";
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      err.email = "Enter a valid email";

    if (formData.mobile && !/^[6-9]\d{9}$/.test(formData.mobile))
      err.mobile = "Enter valid 10-digit mobile";

    if (formData.pincode && !/^[1-9][0-9]{5}$/.test(formData.pincode))
      err.pincode = "Enter valid 6-digit pincode";

    if (formData.dob && new Date(formData.dob) > new Date())
      err.dob = "Future date not allowed";

    if (
      formData.password &&
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password)
    )
      err.password = "Min 8 chars, 1 uppercase, 1 number & 1 symbol";

    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (
      users.some(
        (u) => u.email === formData.email || u.mobile === formData.mobile
      )
    ) {
      err.email = err.mobile = "User already registered";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));

      setMessage({
        text: "Registration successful! Redirecting to login page...",
        type: "success",
      });

      setTimeout(() => navigate("/login"), 2000);
    } else {
      setMessage({ text: "Please fix the errors above.", type: "error" });
    }
  };

  // Fade-up animation effect on mount
  useEffect(() => {
    const card = document.querySelector(".fade-up");
    if (card) card.classList.add("show");
  }, []);

  return (
    <div className="page-container">
      <div className="registration-card fade-up">
        <h2 className="text-center mb-4">Register</h2>

        {message.text && (
          <div className={`message-box ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>First Name</label>
              <input
                className="form-control"
                name="firstName"
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>

            <div className="col-md-6">
              <label>Last Name</label>
              <input
                className="form-control"
                name="lastName"
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error-text">{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Email & Mobile */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="col-md-6">
              <label>Mobile</label>
              <input
                className="form-control"
                name="mobile"
                maxLength="10"
                onChange={handleChange}
              />
              {errors.mobile && (
                <span className="error-text">{errors.mobile}</span>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="col-md-6">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error-text">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>

          {/* DOB */}
          <div className="mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              max={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
            />
            {errors.dob && (
              <span className="error-text">{errors.dob}</span>
            )}
          </div>

          {/* Address */}
          <div className="mb-3">
            <label>Address</label>
            <textarea
              className="form-control"
              rows="2"
              name="address"
              onChange={handleChange}
            />
          </div>

          {/* Wing & Flat */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Wing</label>
              <input
                className="form-control"
                name="wing"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label>Flat No</label>
              <input
                className="form-control"
                name="flatNumber"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Pincode */}
          <div className="mb-3">
            <label>Pincode</label>
            <input
              className="form-control"
              name="pincode"
              maxLength="6"
              onChange={handleChange}
            />
            {errors.pincode && (
              <span className="error-text">{errors.pincode}</span>
            )}
          </div>

          {/* Security Questions */}
          <div className="mb-3">
            <h5>Security Questions</h5>
            <input
              className="form-control mb-2"
              placeholder="Favorite color?"
              name="securityA1"
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              placeholder="Mother’s first name?"
              name="securityA2"
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              placeholder="Birth city?"
              name="securityA3"
              onChange={handleChange}
            />
          </div>

          {/* Register Button */}
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
