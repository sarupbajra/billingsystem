import React from "react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label for="email">email</label>
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
      <button>Log In</button>
    </form>
  );
}
