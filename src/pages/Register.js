import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Select from "react-select";
import "../pages/login.css";
import "../App.css";
import Dropdown from "react-bootstrap/Dropdown";

const registerSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const options = [
  { value: "admin", label: "Admin" },
  { value: "staff", label: "Staff" },
  { value: "customer", label: "Customer" },
];
const MyComponent = () => <Select options={options} />;
export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [users, setUsers] = useState([]);
  // setName("");
  // setEmail("");
  // setPassword("");
  // setSelectedRole(null);

  // useEffect(() => {
  //   // Load users from localStorage
  //   const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  //   setUsers(storedUsers);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerSchema
      .validate(
        {
          name,
          email,
          password,
          role: selectedRole ? selectedRole.value : null,
        },
        { abortEarly: false }
      )
      .then(() => {
        const newUser = {
          name,
          email,
          password,
          role: selectedRole ? selectedRole.value : null,
        };

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        // Validation successful
        console.log("Registration data:", newUser);

        // Clear form fields and reset errors
        setName("");
        setEmail("");
        setPassword("");
        setSelectedRole(null);
        setErrors({});
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
    <>
      <div className="form__container d-flex felx-column align-items-center justify-content-center">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Full Name"
            id="name"
            name="name"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
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
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
          <label htmlFor="name" className="form-label">
            Role
          </label>
          {/* <input
            options={options}
            value={selectedRole}
            onChange={(selectedOption) => setSelectedRole(selectedOption)}
            type="text"
            placeholder="Select a role"
            id="role"
            name="role"
          /> */}
          <Select
            options={options}
            value={selectedRole}
            onChange={(selectedOption) => setSelectedRole(selectedOption)}
            placeholder="Select a role"
            id="role"
            name="role"
          />

          <button type="submit">Sign Up</button>
          <button
            className="form-btn"
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </>
  );
}
