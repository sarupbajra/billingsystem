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
// import Order from './pages/Order';
import Home from "./pages/home";
import BillingPage from "./component/BillingPage";
function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />

          <Routes>
            {/* <Route path="/" exact element={<Login />} /> */}
            <Route path="/" exact element={<Home />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/addorder/:tableId" element={<AddOrderPage />} />
            <Route path="/food-items" element={<FoodItemsPage />} />
            <Route path="/billing/:tableId" element={<BillingPage />} />
            <Route path="/foodMenu" element={<FoodMenu />} />

            {/* <Route path ='/order' element={<Order/>} /> */}
          </Routes>
        </Router>
      </div>
    </>
  );
}
export default App;
