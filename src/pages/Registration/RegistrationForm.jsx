import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../App.css";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    securityA3: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ key: "", type: "" });

  const today = new Date().toISOString().split("T")[0];

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && !/^\d*$/.test(value)) return;
    if (name === "pincode" && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value.trimStart() });
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const err = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) err[key] = "required";
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      err.email = "invalidEmail";

    if (formData.mobile && !/^[6-9]\d{9}$/.test(formData.mobile))
      err.mobile = "invalidMobile";

    if (formData.pincode && !/^[1-9][0-9]{5}$/.test(formData.pincode))
      err.pincode = "invalidPincode";

    if (formData.dob && new Date(formData.dob) > new Date())
      err.dob = "futureDate";

    if (
      formData.password &&
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password)
    )
      err.password = "passwordRule";

    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "passwordMismatch";

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.email === formData.email)) {
      err.email = "userExists";
    }
    if (users.some(u => u.mobile === formData.mobile)) {
      err.mobile = "userExists";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      setMessage({ key: "fixErrors", type: "error" });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage({ key: "success", type: "success" });
    setTimeout(() => navigate("/login"), 2000);
  };

  /* ---------------- ANIMATION ---------------- */
  useEffect(() => {
    document.querySelector(".fade-up")?.classList.add("show");
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <div className="page-container">
      <div className="registration-card fade-up">
        <h2 className="text-center mb-4">{t("registerTitle")}</h2>

        {message.key && (
          <div className={`message-box ${message.type}`}>
            {t(message.key)}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>{t("registerFirstName")}</label>
              <input className="form-control" name="firstName"
                value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <span className="error-text">{t(errors.firstName)}</span>}
            </div>

            <div className="col-md-6">
              <label>{t("registerLastName")}</label>
              <input className="form-control" name="lastName"
                value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <span className="error-text">{t(errors.lastName)}</span>}
            </div>
          </div>

          {/* EMAIL & MOBILE */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>{t("registerEmail")}</label>
              <input className="form-control" name="email"
                value={formData.email} onChange={handleChange} />
              {errors.email && <span className="error-text">{t(errors.email)}</span>}
            </div>

            <div className="col-md-6">
              <label>{t("registerMobile")}</label>
              <input className="form-control" name="mobile" maxLength="10"
                value={formData.mobile} onChange={handleChange} />
              {errors.mobile && <span className="error-text">{t(errors.mobile)}</span>}
            </div>
          </div>

          {/* PASSWORD */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>{t("registerPassword")}</label>
              <input type="password" className="form-control" name="password"
                value={formData.password} onChange={handleChange} />
              {errors.password && <span className="error-text">{t(errors.password)}</span>}
            </div>

            <div className="col-md-6">
              <label>{t("registerConfirmPassword")}</label>
              <input type="password" className="form-control" name="confirmPassword"
                value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <span className="error-text">{t(errors.confirmPassword)}</span>}
            </div>
          </div>

          {/* DOB */}
          <div className="mb-3">
            <label>{t("registerDob")}</label>
            <input type="date" className="form-control" name="dob"
              max={today} value={formData.dob} onChange={handleChange} />
            {errors.dob && <span className="error-text">{t(errors.dob)}</span>}
          </div>

          {/* ADDRESS */}
          <div className="mb-3">
            <label>{t("registerAddress")}</label>
            <textarea className="form-control" rows="2" name="address"
              value={formData.address} onChange={handleChange} />
          </div>

          {/* SOCIETY */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>{t("registerWing")}</label>
              <input className="form-control" name="wing"
                value={formData.wing} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>{t("registerFlatNumber")}</label>
              <input className="form-control" name="flatNumber"
                value={formData.flatNumber} onChange={handleChange} />
            </div>
          </div>

          {/* PINCODE */}
          <div className="mb-3">
            <label>{t("registerPincode")}</label>
            <input className="form-control" name="pincode" maxLength="6"
              value={formData.pincode} onChange={handleChange} />
            {errors.pincode && <span className="error-text">{t(errors.pincode)}</span>}
          </div>

          {/* SECURITY */}
          <div className="mb-3">
            <h5>{t("registerSecurityQuestions")}</h5>
            {["securityA1","securityA2","securityA3"].map((q) => (
              <input key={q} className="form-control mb-2"
                name={q} value={formData[q]}
                placeholder={t(`register${q.toUpperCase()}`)}
                onChange={handleChange} />
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {t("registerSubmit")}
          </button>
        </form>
      </div>
    </div>
  );
}
