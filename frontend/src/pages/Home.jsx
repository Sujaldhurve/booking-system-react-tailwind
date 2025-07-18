import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Real-time Availability',
    icon: '📅',
    desc: 'Easily check and book available time slots without delays.',
  },
  {
    title: 'Email Reminders',
    icon: '🔔',
    desc: 'Stay informed with automatic confirmation and reminder emails.',
  },
  {
    title: 'Secure Booking',
    icon: '🔐',
    desc: 'Your data is safe and protected with modern security standards.',
  },
  {
    title: 'Flexible Services',
    icon: '🛠️',
    desc: 'Book consultations, salon visits, coaching sessions and more.',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      {/* Hero Section */}
      <div className="px-6 py-16 flex-grow">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-24">
          {/* Text First */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-cyan-400 drop-shadow leading-tight">
              Plan. Book. Relax. 🌙
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Your trusted platform for managing appointments with ease and flexibility.
              Secure, simple, and tailored to your needs.
            </p>
            <button
              onClick={handleBookingClick}
              className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:from-cyan-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
            >
              Book an Appointment
            </button>
          </div>

          {/* Image */}
          <div>
            <img
              src="/images/booking-hero.png"
              alt="Booking Illustration"
              className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-cyan-500/20 transition-transform transform hover:-translate-y-2 duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
