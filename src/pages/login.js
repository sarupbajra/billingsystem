import React from "react";
import { useState } from "react";
import "../pages/login.css";
import "../App.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label for="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          <label for="password">Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit">Log In</button>
        </form>
        {/* <button className="link-btn" onClick={(e) => props.onFormSwitch('register')}></button> */}
      </div>
    </div>
  );
}
