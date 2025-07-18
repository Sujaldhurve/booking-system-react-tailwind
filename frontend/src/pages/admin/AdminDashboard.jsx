import React, { useState } from 'react';
import ServicesTab from './ServicesTab';
import SlotsTab from './SlotsTab';
import BookingsTab from './BookingsTab';
import ReportTab from './ReportTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');

  const renderTab = () => {
    switch (activeTab) {
      
      case 'services': return <ServicesTab />;
      case 'slots': return <SlotsTab />;
      case 'bookings': return <BookingsTab />;
      case 'reports': return <ReportTab />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setActiveTab('services')} className={`px-4 py-2 rounded ${activeTab === 'services' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Services</button>
        <button onClick={() => setActiveTab('slots')} className={`px-4 py-2 rounded ${activeTab === 'slots' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Slots</button>
        <button onClick={() => setActiveTab('bookings')} className={`px-4 py-2 rounded ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Bookings</button>
        <button onClick={() => setActiveTab('reports')} className={`px-4 py-2 rounded ${activeTab === 'reports' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Reports</button>
        </div>

      <div className="bg-white p-6 shadow rounded">
        {renderTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;
