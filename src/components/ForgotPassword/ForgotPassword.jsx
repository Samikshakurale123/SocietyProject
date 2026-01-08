import { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [answers, setAnswers] = useState({
    securityA1: "",
    securityA2: "",
    securityA3: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  // ✅ Correct answers (for demo purpose)
  const correctAnswers = {
    securityA1: "blue",
    securityA2: "sita",
    securityA3: "pune",
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const verifyAnswers = () => {
    const isCorrect =
      answers.securityA1.toLowerCase() === correctAnswers.securityA1 &&
      answers.securityA2.toLowerCase() === correctAnswers.securityA2 &&
      answers.securityA3.toLowerCase() === correctAnswers.securityA3;

    if (isCorrect) {
      setVerified(true);
      setError("");
    } else {
      setError("❌ Security answers are incorrect");
    }
  };

  const handlePasswordChange = () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    alert("✅ Password changed successfully!");
    setNewPassword("");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>Forgot Password</h2>

        {!verified ? (
          <>
            <label>Favorite color?</label>
            <input
              type="text"
              name="securityA1"
              placeholder="Enter answer"
              onChange={handleChange}
            />

            <label>Mother’s first name?</label>
            <input
              type="text"
              name="securityA2"
              placeholder="Enter answer"
              onChange={handleChange}
            />

            <label>Birth city?</label>
            <input
              type="text"
              name="securityA3"
              placeholder="Enter answer"
              onChange={handleChange}
            />

            {error && <p className="error">{error}</p>}

            <button onClick={verifyAnswers}>Verify Answers</button>
          </>
        ) : (
          <>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button onClick={handlePasswordChange}>
              Change Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
