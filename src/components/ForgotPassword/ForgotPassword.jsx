import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirecting to login
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({
    securityA1: "",
    securityA2: "",
    securityA3: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false); // track password change

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  // VERIFY SECURITY QUESTIONS
  const verifyAnswers = () => {
    const user = JSON.parse(localStorage.getItem("registeredUser"));
    if (!user) {
      setError("❌ No registered user found");
      return;
    }

    if (!answers.securityA1 || !answers.securityA2 || !answers.securityA3) {
      setError("❌ All security questions are required");
      return;
    }

    const match =
      answers.securityA1.toLowerCase() === user.securityA1.toLowerCase() &&
      answers.securityA2.toLowerCase() === user.securityA2.toLowerCase() &&
      answers.securityA3.toLowerCase() === user.securityA3.toLowerCase();

    if (!match) {
      setError("❌ Security answers are incorrect");
      return;
    }

    setVerified(true);
    setError("");
    setSuccess("✅ Security questions verified. You can set a new password now.");
  };

  // CHANGE PASSWORD
  const changePassword = () => {
    if (!newPassword) {
      setError("❌ Please enter a new password");
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(newPassword)) {
      setError(
        "❌ Password must have 8 chars, 1 uppercase, 1 number & 1 symbol"
      );
      return;
    }

    const user = JSON.parse(localStorage.getItem("registeredUser"));
    if (!user) {
      setError("❌ No registered user found");
      return;
    }

    user.password = newPassword;
    localStorage.setItem("registeredUser", JSON.stringify(user));

    setSuccess("✅ Password changed successfully!");
    setError("");
    setNewPassword("");
    setVerified(false);
    setAnswers({ securityA1: "", securityA2: "", securityA3: "" });
    setPasswordChanged(true); // show login button
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>Forgot Password</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        {!passwordChanged ? (
          <>
            {!verified ? (
              <>
                <input
                  className="form-control mb-3"
                  placeholder="Favorite color?"
                  name="securityA1"
                  value={answers.securityA1}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-3"
                  placeholder="Mother’s first name?"
                  name="securityA2"
                  value={answers.securityA2}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-4"
                  placeholder="Birth city?"
                  name="securityA3"
                  value={answers.securityA3}
                  onChange={handleChange}
                  required
                />
                <button className="btn-verify" onClick={verifyAnswers}>
                  Verify Answers
                </button>
              </>
            ) : (
              <>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button className="btn-change" onClick={changePassword}>
                  Change Password
                </button>
              </>
            )}
          </>
        ) : (
          <div className="login-redirect">
            <button
              className="btn-login"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
