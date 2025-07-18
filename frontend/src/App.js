import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';

import BusinessDashboard from './pages/dashboards/BusinessDashboard';

import AdminDashboard from './pages/admin/AdminDashboard';
import Sevices from './pages/admin/ServicesTab';
import BookingsTab from './pages/admin/BookingsTab';
import SlotsTab from './pages/admin/SlotsTab';
import RepoertTab from './pages/admin/ReportTab';

import { Navigate } from 'react-router-dom'; 
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/services" element={<Sevices />} />
        <Route path="/bookingsTab" element={<BookingsTab />} />
        <Route path="/slotsTab" element={<SlotsTab />} />
        <Route path="/reporttab" element={<RepoertTab  />} />


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* <Route path="/thank-you" element={<ThankYou />} /> */}     
        <Route path="/businessdashboard" element={<BusinessDashboard />} />
      
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
