const API_BASE = "http://localhost:5000/api";

// 💬 Public APIs
export const fetchServices = () =>
  fetch(`${API_BASE}/services`).then(res => res.json());

export const fetchAvailableSlots = (date, serviceId) =>
  fetch(`${API_BASE}/slots?date=${date}&serviceId=${serviceId}`).then(res => res.json());

export const bookAppointment = (data) =>
  fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

// ✅ User Authentication APIs
export const registerUser = (data) =>
  fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const loginUser = (data) =>
  fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

// 🗑️ Optional: Cancel Booking API (if implemented in backend)
export const cancelBooking = (bookingId) =>
  fetch(`${API_BASE}/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}`, // if JWT protected
    },
  }).then(res => res.json());


import { registerUser } from '../utils/api';

const res = await registerUser(form);
