import React from "react";
import { Login } from "./login";
import Register from "./Register";
import { useState } from "react";
export default function Home() {
  const [currentForm, setCurrentForm] = useState();

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div>
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
  );
}
