import React from 'react';

const TimeSlotSelector = ({ slots, onSelect }) => {
  if (!slots.length) return <p className="text-gray-300">No slots available</p>;

  return (
    <div className="grid grid-cols-3 gap-3 mt-4 bg-gray-900 p-4 rounded-lg shadow-inner">
      {slots.map((slot, i) => (
        <button
          key={i}
          onClick={() => onSelect(slot)}
          className="p-2 bg-gray-700 text-white rounded hover:bg-indigo-500 hover:text-white transition"
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
