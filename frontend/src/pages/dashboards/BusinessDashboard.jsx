import React, { useEffect, useState } from 'react';

const BusinessDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authorized');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/business/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
          setAppointments(data.appointments);
        } else {
          setError(data.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Server error');
      }
    };

    fetchDashboard();
  }, []);

  const handleConfirm = async (id) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'confirmed' }),
      });

      const data = await res.json();

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((appt) => (appt.id === id ? { ...appt, status: 'confirmed' } : appt))
        );
      } else {
        alert(data.message || 'Failed to confirm booking');
      }
    } catch (err) {
      console.error('Confirm error:', err);
      alert('Server error while confirming booking');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Business Dashboard</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {user && (
        <div className="mb-6 bg-white shadow p-4 rounded text-center">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">👤 {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Business Type: {user.business_type}</p>
        </div>
      )}

      <h3 className="text-xl font-bold mb-4 text-center">📅 Appointments</h3>

      {appointments.length === 0 ? (
        <p className="text-center">No appointments found for your business service.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white border p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">👤 {appt.customer_name}</p>
                <p>📅 {appt.date} 🕒 {appt.time}</p>
                <p>
                  Status:{' '}
                  <span
                    className={`font-semibold ${
                      appt.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    {appt.status}
                  </span>
                </p>
              </div>

              {appt.status === 'pending' && (
                <div className="flex items-center">
                  <button
                    onClick={() => handleConfirm(appt.id)}
                    className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition ml-4"
                  >
                    ✅ Confirm
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessDashboard;
