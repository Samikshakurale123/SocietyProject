import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
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
      setMessage({ text: "User not registered. Please register first.", type: "error" });
      return;
    }

    if (user.password !== data.password) {
      setMessage({ text: "Incorrect password. Please try again.", type: "error" });
      return;
    }

    // Successful login
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
    setMessage({ text: "Login successful!", type: "success" });

    setTimeout(() => navigate("/maintenance"), 800);
  };

  // Add fade-up animation on mount
  useEffect(() => {
    const card = document.querySelector(".fade-up");
    if (card) card.classList.add("show");
  }, []);

  return (
    <div className="page-container">
      <div className="auth-card fade-up">
        <h2 className="text-center mb-4">Login</h2>

        {/* Inline message */}
        {message.text && (
          <div className={`message-box ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...register("email", { required: true })}
            />
            {errors.email && <small className="error-text">Email is required</small>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...register("password", { required: true })}
            />
            {errors.password && <small className="error-text">Password is required</small>}
          </div>

          <div className="text-end mb-3">
            <Link to="#" className="link-text">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted">Don’t have an account? </span>
          <Link to="/register" className="link-text fw-semibold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
