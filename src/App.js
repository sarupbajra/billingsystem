import React, { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import AddOrderPage from "./pages/AddOrder";
import FoodItem from "./component/FoodItem";
import { Login } from "./pages/login";
import Register from "./pages/Register";
import FoodMenu from "./pages/FoodMenu";
import FoodItemsPage from "./pages/FoodItemsPage";
import Home from "./pages/home";
import BillingPage from "./component/BillingPage";
import { ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";

function App() {
  const user = localStorage.getItem("userRole");
  const [userRole, setUserRole] = useState(null);
  const handleLogin = (role) => {
    setUserRole(role);
  };
  return (
    <>
      <div>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" exact element={<DashboardPage />} />

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
