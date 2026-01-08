import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser) {
      setError("No registered user found");
      return;
    }

    const isEmailOrMobileMatch =
      loginData.identifier === storedUser.email ||
      loginData.identifier === storedUser.mobile;

    const isPasswordMatch = loginData.password === storedUser.password;

    if (isEmailOrMobileMatch && isPasswordMatch) {
      setSuccess("✅ Login successful!");
      setError("");
    } else {
      setError("❌ Invalid email/mobile or password");
      setSuccess("");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="identifier"
            placeholder="Email or Mobile"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {/* Forgot password link */}
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
