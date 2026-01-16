import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login({ setIsLoggedIn }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === data.email);

    if (!user) {
      setMessage({ text: t("User not registered. Please register first."), type: "error" });
      return;
    }

    if (user.password !== data.password) {
      setMessage({ text: t("Incorrect password. Please try again."), type: "error" });
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
    setMessage({ text: t("Login successful!"), type: "success" });

    setTimeout(() => navigate("/"), 800);
  };

  useEffect(() => {
    document.querySelector(".fade-up")?.classList.add("show");
  }, []);

  return (
    <div className="page-container">
      <div className="auth-card fade-up">
        <h2 className="text-center mb-4">{t("Login")}</h2>

        {message.text && (
          <div className={`message-box ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>{t("Email")}</label>
            <input
              type="email"
              className="form-control"
              placeholder={t("Enter email")}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <small className="error-text">{t("Email is required")}</small>
            )}
          </div>

          <div className="mb-3">
            <label>{t("Password")}</label>
            <input
              type="password"
              className="form-control"
              placeholder={t("Enter password")}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <small className="error-text">{t("Password is required")}</small>
            )}
          </div>

          <div className="text-end mb-3">
            <Link to="/ForgotPassword" className="link-text">
              {t("Forgot password?")}
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {t("Login")}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted">{t("Don’t have an account?")} </span>
          <Link to="/register" className="link-text fw-semibold">
            {t("Register")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
