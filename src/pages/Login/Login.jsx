import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login({ setIsLoggedIn }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email);

    if (!user) {
      setMessage({ text: t("loginUserNotFound"), type: "error" });
      return;
    }

    if (user.password !== password) {
      setMessage({ text: t("loginIncorrectPassword"), type: "error" });
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
    setMessage({ text: t("loginSuccess"), type: "success" });
    setTimeout(() => navigate("/"), 800);
  };

  return (
    <div className="page-container">
      <div className="auth-card fade-up show">
        <h2 className="text-center mb-4">{t("loginTitle")}</h2>

        {message.text && <div className={`message-box ${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>{t("loginEmail")}</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("loginEmail")}
            />
          </div>

          <div className="mb-3">
            <label>{t("loginPassword")}</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("loginPassword")}
            />
          </div>

          <div className="text-end mb-3">
            <Link to="/forgotpassword" className="link-text">{t("loginForgot")}</Link>
          </div>

          <button type="submit" className="btn btn-primary w-100">{t("loginButton")}</button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted">{t("loginNoAccount")} </span>
          <Link to="/register" className="link-text fw-semibold">{t("Register")}</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
