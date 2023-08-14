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

  const handleSubmit = (e) => {
    e.preventDefault();
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then(() => {
        // Validation successful
        console.log("Login data:", { email, password });
        // Perform your login logic here (e.g., calling an API to validate credentials)
        // For now, we just navigate to the DashboardPage
        navigate("/Dashboard");
      })
      .catch((validationErrors) => {
        // Validation failed
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
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
          {errors.email && <p className="error-message">*{errors.email}</p>}
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          {errors.password && (
            <p className="error-message">*{errors.password}</p>
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
