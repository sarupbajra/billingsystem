import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import AddOrderPage from "./pages/AddOrder";
import FoodItem from "./component/FoodItem";
import { useState } from "react";
import { Login } from "./pages/login";
import Register from "./pages/Register";
import FoodMenu from "./pages/FoodMenu";
import FoodItemsPage from "./pages/FoodItemsPage";
import { Navigate } from "react-router-dom";
// import Order from './pages/Order';
import Home from "./pages/home";
import BillingPage from "./component/BillingPage";
import { ToastContainer } from "react-toastify";
function App() {
  const user = localStorage.getItem("userRole");
  const userRole = user ? user.role : null; // Get the user's role
  return (
    <>
      <div>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" exact element={<DashboardPage />} />
            {/* <Route
              path="/dashboard"
              element={
                userRole === "admin" ? (
                  <DashboardPage />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            /> */}
            {/* <Route
              path="/addorder/:tableId"
              element={
                userRole === "staff" ? (
                  <AddOrderPage />
                ) : (
                  <Navigate to="/addorder" />
                )
              }
            /> */}
            <Route path="/addorder/:tableId" element={<AddOrderPage />} />
            <Route path="/food-items" element={<FoodItemsPage />} />
            <Route path="/billing/:tableId" element={<BillingPage />} />
            <Route path="/foodMenu" element={<FoodMenu />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </Router>

        <ToastContainer />
      </div>
    </>
  );
}
export default App;
