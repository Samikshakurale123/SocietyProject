import React, { useState } from "react";
import "./registration.css";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    society: "",
    wing: "",
    flatNumber: "",
    pincode: "",
    securityA1: "",
    securityA2: "",
    securityA3: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode" && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let err = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) err[key] = "This field is required";
    });
    if (formData.pincode && formData.pincode.length !== 6) {
      err.pincode = "Pincode must be 6 digits";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowSuccess(true);
      console.log(formData);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="page-title">Personal Details</h2>

      {showSuccess && (
        <div className="alert-success">✅ Details Saved Successfully!</div>
      )}

      <div className="registration-card">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          {/* DOB */}
          <div className="mb-4">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <span className="error-text">{errors.dob}</span>}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              rows="2"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          {/* Society */}
          <div className="row mb-4">
            <div className="col-md-4">
              <label className="form-label">Society</label>
              <input className="form-control" name="society" onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Wing</label>
              <input className="form-control" name="wing" onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Flat No</label>
              <input className="form-control" name="flatNumber" onChange={handleChange} />
            </div>
          </div>

          {/* Pincode */}
          <div className="mb-5">
            <label className="form-label">Pincode</label>
            <input
              className="form-control"
              name="pincode"
              maxLength="6"
              onChange={handleChange}
            />
            {errors.pincode && <span className="error-text">{errors.pincode}</span>}
          </div>

          {/* Security Section */}
          <div className="security-box">
            <h4>Security Questions</h4>
            <p className="security-hint">
              These will help recover your password
            </p>

            <input
              className="form-control mb-3"
              placeholder="Favorite color?"
              name="securityA1"
              onChange={handleChange}
            />
            <input
              className="form-control mb-3"
              placeholder="Mother’s first name?"
              name="securityA2"
              onChange={handleChange}
            />
            <input
              className="form-control mb-4"
              placeholder="Birth city?"
              name="securityA3"
              onChange={handleChange}
            />
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn-submit">
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
