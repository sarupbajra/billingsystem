import React, { useState } from "react";
import * as yup from "yup";
import "../pages/login.css";
import "../App.css";

const registerSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    registerSchema
      .validate({ name, email, password }, { abortEarly: false })
      .then(() => {
        // Validation successful
        console.log("Registration data:", { name, email, password });
        // Perform your registration logic here (e.g., calling an API to store user data)
        // For now, we'll just clear the form
        setName("");
        setEmail("");
        setPassword("");
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
          <label htmlFor="name">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            id="name"
            name="name"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
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
            <p className="error-message">{errors.password}</p>
          )}
          <button type="submit">Sign Up</button>
        </form>
        <button onClick={() => props.onFormSwitch("login")}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
