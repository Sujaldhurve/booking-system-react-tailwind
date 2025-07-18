import React from 'react';

const BookingForm = ({ formData, setFormData }) => {
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputStyles =
    'bg-gray-800 text-white border border-gray-600 placeholder-gray-400 p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300';

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <input
        name="name"
        placeholder="Full Name"
        className={inputStyles}
        required
        value={formData.name || ''}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className={inputStyles}
        required
        value={formData.email || ''}
        onChange={handleChange}
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        className={inputStyles}
        required
        value={formData.phone || ''}
        onChange={handleChange}
      />
      <select
        name="gender"
        className={inputStyles}
        required
        value={formData.gender || ''}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="male" className="bg-gray-800">Male</option>
        <option value="female" className="bg-gray-800">Female</option>
        <option value="other" className="bg-gray-800">Other</option>
      </select>
      <input
        name="address"
        placeholder="Address"
        className={`${inputStyles} sm:col-span-2`}
        required
        value={formData.address || ''}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Notes (optional)"
        className={`${inputStyles} sm:col-span-2 h-28 resize-none`}
        value={formData.message || ''}
        onChange={handleChange}
      />
    </form>
  );
};

export default BookingForm;
