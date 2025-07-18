import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg border-4 border-gray-400">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold tracking-wide">Booking System</h1>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-indigo-300 transition">Home</Link>
          <Link to="/booking" className="hover:text-indigo-300 transition">Book</Link>
          <Link to="/dashboard" className="hover:text-indigo-300 transition">Dashboard</Link>
          <Link to="/admin" className="hover:text-indigo-300 transition">Admin</Link>
          <Link to="/businessDashboard" className="hover:text-indigo-300 transition">Business Dash</Link>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name || 'User'}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-gray-900 px-3 py-1 rounded hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-3 pb-4 text-white font-medium bg-gray-800 border-t border-gray-400">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/booking" onClick={() => setMenuOpen(false)}>Book</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
          <Link to="/businessDashboard" onClick={() => setMenuOpen(false)}>Business Dash</Link>

          <hr className="border-white opacity-30 w-1/2 my-2" />

          {user ? (
            <>
              <span className="text-sm">Hi, {user.name || 'User'}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-gray-900 px-4 py-1 rounded hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
