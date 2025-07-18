// src/pages/ThankYou.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10 text-center max-w-xl mx-auto bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-400 mb-4">✅ Appointment Confirmed!</h2>
      <p className="text-lg text-gray-300 mb-2">
        Thank you for booking your appointment.
      </p>
      <p className="text-md text-gray-400 mb-6">
        A confirmation email will be sent to you shortly.
      </p>
      <button
        onClick={() => navigate('/booking')}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        📅 Book Another Appointment
      </button>
    </div>
  );
};

export default ThankYou;
