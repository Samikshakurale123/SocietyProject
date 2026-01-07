import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    society: "",
    wing: "",
    flatNumber: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for pincode
    if (name === "pincode" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.society) newErrors.society = "Society name is required";
    if (!formData.wing) newErrors.wing = "Wing is required";
    if (!formData.flatNumber) newErrors.flatNumber = "Flat number is required";

    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (formData.pincode.length !== 6) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Registration Successful!");
      console.log(formData);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h4>Registration Form</h4>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <small className="text-danger">{errors.firstName}</small>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <small className="text-danger">{errors.lastName}</small>
                    )}
                  </div>
                </div>

                {/* DOB */}
                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && (
                    <small className="text-danger">{errors.dob}</small>
                  )}
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <small className="text-danger">{errors.address}</small>
                  )}
                </div>

                {/* Society, Wing, Flat */}
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Society</label>
                    <input
                      type="text"
                      className="form-control"
                      name="society"
                      value={formData.society}
                      onChange={handleChange}
                    />
                    {errors.society && (
                      <small className="text-danger">{errors.society}</small>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Wing</label>
                    <input
                      type="text"
                      className="form-control"
                      name="wing"
                      value={formData.wing}
                      onChange={handleChange}
                    />
                    {errors.wing && (
                      <small className="text-danger">{errors.wing}</small>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Flat No.</label>
                    <input
                      type="text"
                      className="form-control"
                      name="flatNumber"
                      value={formData.flatNumber}
                      onChange={handleChange}
                    />
                    {errors.flatNumber && (
                      <small className="text-danger">
                        {errors.flatNumber}
                      </small>
                    )}
                  </div>
                </div>

                {/* Pincode */}
                <div className="mb-3">
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    maxLength="6"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  {errors.pincode && (
                    <small className="text-danger">{errors.pincode}</small>
                  )}
                </div>

                {/* Submit */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-5">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;