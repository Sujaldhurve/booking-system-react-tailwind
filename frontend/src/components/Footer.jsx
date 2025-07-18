// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left - Branding */}
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold text-white">Booking System</p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center - Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <Link
            to="/contact"
            className="hover:text-white transition-colors"
          >
            Contact Us
          </Link>
          <Link
            to="/privacy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
        </div>

        {/* Right - Social Media */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5 opacity-80 hover:opacity-100 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5 opacity-80 hover:opacity-100 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5 opacity-80 hover:opacity-100 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
