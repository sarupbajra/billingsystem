import React from "react";

// utils/auth.js

export const setUserRoleInLocalStorage = (role) => {
  localStorage.setItem("userRole", role);
};
