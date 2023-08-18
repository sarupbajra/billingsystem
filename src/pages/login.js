import React, { useState } from "react";
import * as yup from "yup";
import "../pages/login.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const allowedEmail = "sarupbajracharya@gmail.com";
  const allowedPassword = "12345678";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === allowedEmail && password === allowedPassword) {
      // Successful login
      console.log("Login successful for:", email);
      // Perform additional login logic or API calls if needed

      // Navigate to the DashboardPage
      navigate("/Dashboard");
    } else {
      // Invalid credentials
      setErrors({ credentials: "Invalid email or password" });
    }
  };

  return (
    <div className="login">
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="example@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          {errors.credentials && (
            <p className="error-message">{errors.credentials}</p>
          )}
          <button type="submit">Log In</button>
        </form>
        <button
          className="link-btn"
          onClick={(e) => props.onFormSwitch("register")}
        >
          Register Here
        </button>
      </div>
    </div>
  );
};
