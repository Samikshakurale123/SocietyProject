import React, { useState } from "react";
import "./registration.css";

export default function RegistrationForm() {
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
  const [showPopup, setShowPopup] = useState(false);

  /* 
     HANDLE INPUT CHANGE
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && !/^\d*$/.test(value)) return;
    if (name === "pincode" && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  /*validation */
  const validate = () => {
    let err = {};

    // Required fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) err[key] = "This field is required";
    });

    // Email
    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      err.email = "Invalid email address";
    }

    // Mobile
    if (formData.mobile && formData.mobile.length !== 10) {
      err.mobile = "Mobile number must be 10 digits";
    }

    // Pincode
    if (formData.pincode && formData.pincode.length !== 6) {
      err.pincode = "Pincode must be 6 digits";
    }

    // Password
    if (
      formData.password &&
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.password
      )
    ) {
      err.password =
        "Password must have 8 chars, 1 uppercase, 1 number & 1 symbol";
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* 
     SUBMIT */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      localStorage.setItem("registeredUser", JSON.stringify(formData));

      setShowPopup(true);

      // Auto close popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="page-title">Personal Details</h2>

      <div className="registration-card">
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input className="form-control" name="firstName" onChange={handleChange} />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input className="form-control" name="lastName" onChange={handleChange} />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          {/* EMAIL & MOBILE */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input className="form-control" name="email" onChange={handleChange} />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Mobile</label>
              <input
                className="form-control"
                name="mobile"
                maxLength="10"
                onChange={handleChange}
              />
              {errors.mobile && <span className="error-text">{errors.mobile}</span>}
            </div>
          </div>

          {/* PASSWORD */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* DOB */}
          <div className="mb-4">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" name="dob" onChange={handleChange} />
          </div>

          {/* ADDRESS */}
          <div className="mb-4">
            <label className="form-label">Address</label>
            <textarea className="form-control" rows="2" name="address" onChange={handleChange} />
          </div>

          {/* SOCIETY */}
          <div className="row mb-4">
            <div className="col-md-4">
              <label className="form-label">Wing</label>
              <input className="form-control" name="wing" onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Flat No</label>
              <input className="form-control" name="flatNumber" onChange={handleChange} />
            </div>
          </div>

          {/* PINCODE */}
          <div className="mb-4">
            <label className="form-label">Pincode</label>
            <input className="form-control" name="pincode" maxLength="6" onChange={handleChange} />
            {errors.pincode && <span className="error-text">{errors.pincode}</span>}
          </div>

          {/* SECURITY */}
          <div className="security-box">
            <h4>Security Questions</h4>
            <p className="security-hint">Used for account recovery</p>

            <input className="form-control mb-3" placeholder="Favorite color?" name="securityA1" onChange={handleChange} />
            <input className="form-control mb-3" placeholder="Mother’s first name?" name="securityA2" onChange={handleChange} />
            <input className="form-control mb-4" placeholder="Birth city?" name="securityA3" onChange={handleChange} />
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn-submit">
              Register
            </button>
          </div>
        </form>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3> Registration Successful!</h3>
            <p>Your account has been created successfully.</p>
            <button className="popup-btn" onClick={() => setShowPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
