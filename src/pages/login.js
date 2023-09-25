import React, { useState, useEffect } from "react";
import * as yup from "yup";
// import "../pages/login.css";
import "../pages/card.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { setUserRoleInLocalStorage } from "../utils/auth";
import { toast } from "react-toastify";
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
  // const userName = localStorage.getItem("email")
  //   ? localStorage.getItem("email")
  //   : "admin@admin.com";
  // const userPassword = localStorage.getItem("password")
  //   ? localStorage.getItem("password")
  //   : "admin";
  // const allowedEmail = "sarupbajracharya@gmail.com";
  // const allowedPassword = "12345678";
  // const storedUserData = localStorage.getItem("userData");
  // const userData = storedUserData ? JSON.parse(storedUserData) : null;
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Check credentials when email or password change
    if (email === storedEmail && password === storedPassword) {
      // Set the user's role as 'admin' in local storage
      setUserRoleInLocalStorage("admin");
      // navigate("/dashboard");
    } else {
      // Set the user's role as 'staff' in local storage
      setUserRoleInLocalStorage("staff");
    }
  }, [email, password, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate email and password
    loginSchema
      .validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      )
      .then(() => {})
      .catch((validationErrors) => {
        // Validation failed, display errors
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        toast.error("Invalid email or password");
      });
  };

  return (
    <>
      <div className="form__container d-flex felx-column align-items-center justify-content-center">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="example@gmail.com"
            id="email"
            name="email"
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="********"
            id="password"
            name="password"
          />
          {errors.credentials && (
            <p className="error-message">{errors.credentials}</p>
          )}
          <button type="submit" className="form__button" onClick={handleSubmit}>
            Log In
          </button>
          <button
            className="link-btn"
            onClick={(e) => props.onFormSwitch("register")}
          >
            Register Here
          </button>
        </form>
      </div>
    </>
  );
};
