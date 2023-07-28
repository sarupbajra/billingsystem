import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import AddOrderPage from './pages/AddOrder';
// import Order from './pages/Order';
 function App() {
  return (
    <>
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path ='/' exact element={<DashboardPage/>} />
          <Route path ='/addorder' element={<AddOrderPage/>} />
          {/* <Route path ='/order' element={<Order/>} /> */}
        </Routes>
      </Router>
     </div> 
      
    </>
    
  );
}
export default App;