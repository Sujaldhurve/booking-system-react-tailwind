import React, { useState, useEffect } from 'react';

const SlotsTab = () => {
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState('');

  // Fetch all slots from backend
  const fetchSlots = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/slots');
    const data = await res.json();
    console.log("Slots received:", data);
    setSlots(data.slots); // ✅ Fix: extract array from response
  } catch (err) {
    console.error("Failed to fetch slots", err);
  }
};

  // Add a new slot
  const addSlot = async () => {
    if (!time) return;
    try {
      const res = await fetch('http://localhost:5000/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time }),
      });
      const newSlot = await res.json();
      setSlots([...slots, newSlot]);
      setTime('');
    } catch (err) {
      console.error('Error adding slot:', err);
    }
  };

  // Delete a slot
  const deleteSlot = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/slots/${id}`, {
        method: 'DELETE',
      });
      setSlots(slots.filter((slot) => slot.id !== id));
    } catch (err) {
      console.error('Error deleting slot:', err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h3 className="text-xl font-semibold mb-4">Manage Time Slots</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <button onClick={addSlot} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {slots.map((slot, index) => (
          <li key={slot + index} className="flex justify-between border-b py-2">
          {slot}
          <button
            onClick={() => deleteSlot(slot)} // ⛔ also fix deleteSlot logic if slot is string
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </li>
        ))}
      </ul>

    </div>
  );
};

export default SlotsTab;
