import React, { useEffect, useState } from 'react';

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/bookings')
      .then(res => res.json())
      .then(setBookings)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">All Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{b.name}</td>
                <td className="p-2 border">{b.business_type}</td>
                <td className="p-2 border">{b.date}</td>
                <td className="p-2 border">{b.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingsTab;
