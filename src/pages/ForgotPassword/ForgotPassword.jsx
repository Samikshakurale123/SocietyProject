import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState({
    securityA1: "",
    securityA2: "",
    securityA3: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // ✅ NEW
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [foundUserIndex, setFoundUserIndex] = useState(null);

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  /* ================= VERIFY USER ================= */
  const verifyAnswers = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const index = users.findIndex((u) => u.email === email);

    if (index === -1) {
      setMessage({ text: "User not found with this email", type: "error" });
      return;
    }

    const user = users[index];

    if (
      answers.securityA1.toLowerCase() !== user.securityA1.toLowerCase() ||
      answers.securityA2.toLowerCase() !== user.securityA2.toLowerCase() ||
      answers.securityA3.toLowerCase() !== user.securityA3.toLowerCase()
    ) {
      setMessage({ text: "Security answers do not match", type: "error" });
      return;
    }

    setFoundUserIndex(index);
    setVerified(true);
    setMessage({
      text: "Security verified. Please set a new password.",
      type: "success",
    });
  };

  /* ================= CHANGE PASSWORD ================= */
  const changePassword = () => {
    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(newPassword)
    ) {
      setMessage({
        text:
          "Password must be 8+ chars with 1 uppercase, 1 number & 1 symbol",
        type: "error",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({
        text: "Passwords do not match",
        type: "error",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users[foundUserIndex].password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));

    setMessage({
      text: "Password changed successfully. Redirecting to login...",
      type: "success",
    });

    setTimeout(() => navigate("/login"), 2500);
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2 className="text-center mb-3">Forgot Password</h2>

        {message.text && (
          <div className={`message-box ${message.type}`}>
            {message.text}
          </div>
        )}

        {!verified ? (
          <>
            <label>Email</label>
            <input
              className="form-control"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Favorite color?</label>
            <input
              className="form-control"
              name="securityA1"
              onChange={handleAnswerChange}
            />

            <label>Mother’s first name?</label>
            <input
              className="form-control"
              name="securityA2"
              onChange={handleAnswerChange}
            />

            <label>Birth city?</label>
            <input
              className="form-control"
              name="securityA3"
              onChange={handleAnswerChange}
            />

            <button
              className="btn btn-submit w-100 mt-3"
              onClick={verifyAnswers}
            >
              Verify Answers
            </button>
          </>
        ) : (
          <>
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="btn btn-submit w-100 mt-3"
              onClick={changePassword}
            >
              Change Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
