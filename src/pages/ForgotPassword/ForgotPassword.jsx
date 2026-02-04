import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState({ securityA1: "", securityA2: "", securityA3: "" });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [foundUserIndex, setFoundUserIndex] = useState(null);

  const handleAnswerChange = (e) => setAnswers({ ...answers, [e.target.name]: e.target.value });

  const verifyAnswers = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.email === email);

    if (index === -1) {
      setMessage({ text: t("forgotUserNotFound"), type: "error" });
      return;
    }

    const user = users[index];
    if (
      answers.securityA1.toLowerCase() !== user.securityA1.toLowerCase() ||
      answers.securityA2.toLowerCase() !== user.securityA2.toLowerCase() ||
      answers.securityA3.toLowerCase() !== user.securityA3.toLowerCase()
    ) {
      setMessage({ text: t("forgotSecurityMismatch"), type: "error" });
      return;
    }

    setVerified(true);
    setFoundUserIndex(index);
    setMessage({ text: t("forgotSecurityVerified"), type: "success" });
  };

  const changePassword = () => {
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(newPassword)) {
      setMessage({ text: t("forgotPasswordRule"), type: "error" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ text: t("forgotPasswordMismatch"), type: "error" });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users[foundUserIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    setMessage({ text: t("forgotPasswordChanged"), type: "success" });
    setTimeout(() => navigate("/login"), 2500);
  };

  return (
    <div className="page-container">
      <div className="auth-card fade-up show">
        <h2 className="text-center mb-3">{t("forgotTitle")}</h2>

        {message.text && <div className={`message-box ${message.type}`}>{message.text}</div>}

        {!verified ? (
          <>
            <label>{t("forgotEmail")}</label>
            <input className="form-control" placeholder={t("forgotEmailPlaceholder")} value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>{t("forgotSecurityA1")}</label>
            <input className="form-control" name="securityA1" onChange={handleAnswerChange} />

            <label>{t("forgotSecurityA2")}</label>
            <input className="form-control" name="securityA2" onChange={handleAnswerChange} />

            <label>{t("forgotSecurityA3")}</label>
            <input className="form-control" name="securityA3" onChange={handleAnswerChange} />

            <button className="btn btn-submit w-100 mt-3" onClick={verifyAnswers}>{t("forgotVerifyButton")}</button>
          </>
        ) : (
          <>
            <label>{t("forgotNewPassword")}</label>
            <input type="password" className="form-control" onChange={(e) => setNewPassword(e.target.value)} />

            <label>{t("forgotConfirmPassword")}</label>
            <input type="password" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />

            <button className="btn btn-submit w-100 mt-3" onClick={changePassword}>{t("forgotChangeButton")}</button>
          </>
        )}
      </div>
    </div>
  );
}
