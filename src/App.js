import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Order from './pages/Order';
 function App() {
  return (
    <>
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path ='/' exact element={<Home/>} />
          <Route path ='/reports' element={<Reports/>} />
          <Route path ='/order' element={<Order/>} />
        </Routes>
      </Router>
     </div> 
      
    </>
    
  );
}
export default App;