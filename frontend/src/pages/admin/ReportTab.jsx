import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportTab = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('weekly');

  useEffect(() => {
    fetch('http://localhost:5000/api/bookings')
      .then((res) => res.json())
      .then(setBookings)
      .catch(console.error);
  }, []);

  const groupBookings = () => {
    const grouped = {};
    bookings.forEach(({ date }) => {
      const d = new Date(date);
      let key;

      if (filter === 'weekly') {
        const week = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`;
        key = week;
      } else {
        key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      }

      grouped[key] = (grouped[key] || 0) + 1;
    });

    const labels = Object.keys(grouped).sort();
    const counts = labels.map((label) => grouped[label]);

    return { labels, counts };
  };

  const { labels, counts } = groupBookings();

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Appointments',
        data: counts,
        backgroundColor: [
          '#60A5FA', '#F472B6', '#34D399', '#FCD34D', '#C084FC', '#F87171', '#4ADE80',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">📈 Booking Reports </h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Table View */}
      <table className="w-full mt-6 text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border text-left">Date</th>
            <th className="p-2 border text-left">Total Appointments</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label) => (
            <tr key={label}>
              <td className="p-2 border">{label}</td>
              <td className="p-2 border">{counts[labels.indexOf(label)]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="max-w-md mx-auto">
        <Pie data={data} />
      </div>

    </div>
  );
};

export default ReportTab;
