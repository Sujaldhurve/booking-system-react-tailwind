import React, { useState, useEffect } from 'react';
import BookingForm from '../components/BookingForm';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({});
  const [date, setDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isFormValid = formData.name && formData.email && formData.phone && selectedSlot;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/services');
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!date || !selectedService?.id) return;
      try {
        const res = await fetch(`http://localhost:5000/api/slots?date=${date}&serviceId=${selectedService.id}`);
        const data = await res.json();
        setAvailableSlots(data.slots || []);
      } catch (err) {
        console.error('Failed to fetch slots:', err);
      }
    };
    fetchSlots();
  }, [date, selectedService]);

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      businessType: selectedService.name,
      date,
      time: selectedSlot,
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        setStep(4);
        setSubmitted(true);
      } else {
        alert(result.message || 'Failed to book appointment');
      }
    } catch (err) {
      alert('Something went wrong.');
    }
  };

  const steps = ['Service', 'Date', 'Details', 'Done'];

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-900 text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Book Appointment</h2>

      {/* Progress */}
      <div className="flex items-center mb-8">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center w-full">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                step === i + 1
                  ? 'bg-blue-600'
                  : i + 1 < step
                  ? 'bg-green-600'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {i + 1}
            </div>
            <span className="ml-2 text-sm">{label}</span>
            {i < steps.length - 1 && <div className="flex-grow h-1 bg-gray-600 mx-2"></div>}
          </div>
        ))}
      </div>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <>
          <h3 className="mb-4 font-medium text-lg">Choose a Service</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service);
                  setStep(2);
                }}
                className={`border p-3 rounded transition text-white ${
                  selectedService?.id === service.id
                    ? 'bg-blue-700 border-blue-400'
                    : 'hover:bg-gray-700 border-gray-600'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <>
          <label className="block mb-2 font-medium">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setSelectedSlot('');
            }}
            className="bg-gray-800 text-white border border-gray-600 p-2 w-full rounded mb-4"
          />

          {date && (
            <>
              <label className="block mb-2 font-medium">Available Time Slots:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSlot(slot)}
                      className={`border px-3 py-2 rounded text-sm ${
                        selectedSlot === slot
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-gray-700 text-white hover:bg-blue-500'
                      }`}
                    >
                      {slot}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm col-span-full">No available slots.</p>
                )}
              </div>
            </>
          )}

          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(1)} className="bg-gray-700 text-white px-4 py-2 rounded">
              Back
            </button>
            <button
              onClick={() => selectedSlot && setStep(3)}
              className={`bg-blue-600 text-white px-4 py-2 rounded ${
                !selectedSlot ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!selectedSlot}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 3: Form */}
      {step === 3 && (
        <>
          <h3 className="mb-4 font-medium text-lg">Your Details</h3>
          <BookingForm formData={formData} setFormData={setFormData} />
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(2)} className="bg-gray-700 text-white px-4 py-2 rounded">
              Back
            </button>
            <button
              onClick={handleSubmit}
              className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
                !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!isFormValid}
            >
              Confirm & Submit ✅
            </button>
          </div>
        </>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && submitted && (
        <div className="text-center p-6 bg-green-900 border border-green-600 rounded">
          <h2 className="text-2xl font-bold text-green-300 mb-2">✅ Appointment Confirmed</h2>
          <p className="text-gray-300 mb-4">
            Thank you for booking with{' '}
            <span className="font-semibold text-white">{selectedService?.name}</span>. We’ve sent you a confirmation email.
          </p>
          <button
            onClick={() => {
              setStep(1);
              setFormData({});
              setDate('');
              setSelectedSlot('');
              setSelectedService(null);
              setSubmitted(false);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Book Another
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking;
