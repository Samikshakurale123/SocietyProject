import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
  const [passwordChanged, setPasswordChanged] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  // Verify security answers
  const verifyAnswers = () => {
    const user = JSON.parse(localStorage.getItem("registeredUser"));

    if (!user) {
      setError("No registered user found");
      return;
    }

    if (!answers.securityA1 || !answers.securityA2 || !answers.securityA3) {
      setError("All security questions are required");
      return;
    }

    const match =
      answers.securityA1.toLowerCase() === user.securityA1.toLowerCase() &&
      answers.securityA2.toLowerCase() === user.securityA2.toLowerCase() &&
      answers.securityA3.toLowerCase() === user.securityA3.toLowerCase();

    if (!match) {
      setError("Security answers are incorrect");
      return;
    }

    setVerified(true);
    setError("");
    setSuccess("Security questions verified. Set a new password.");
  };

  // Change password
  const changePassword = () => {
    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(newPassword)) {
      setError(
        "Password must have at least 8 characters, 1 uppercase letter, 1 number and 1 symbol"
      );
      return;
    }

    const user = JSON.parse(localStorage.getItem("registeredUser"));
    user.password = newPassword;
    localStorage.setItem("registeredUser", JSON.stringify(user));

    setSuccess("Password changed successfully");
    setError("");
    setVerified(false);
    setPasswordChanged(true);
    setNewPassword("");
    setAnswers({ securityA1: "", securityA2: "", securityA3: "" });
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Forgot Password</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        {!passwordChanged ? (
          <>
            {!verified ? (
              <>
                <input
                  placeholder="Favorite color?"
                  name="securityA1"
                  value={answers.securityA1}
                  onChange={handleChange}
                />

                <input
                  placeholder="Mother's first name?"
                  name="securityA2"
                  value={answers.securityA2}
                  onChange={handleChange}
                />

                <input
                  placeholder="Birth city?"
                  name="securityA3"
                  value={answers.securityA3}
                  onChange={handleChange}
                />

                <button onClick={verifyAnswers}>
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
                />

                <button onClick={changePassword}>
                  Change Password
                </button>
              </>
            )}
          </>
        ) : (
          <button onClick={() => navigate("/login")}>
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
}
