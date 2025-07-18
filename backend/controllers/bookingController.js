const { createBooking, getBookingsByEmail, deleteBookingById, fetchAllBookings } = require('../models/bookingModel');

const pool = require('../db');

const getMyBookings = async (req, res) => {
  const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);


  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user bookings' });
  }
};


const bookAppointment = async (req, res) => {
  const { name, email, phone, businessType, date } = req.body;

  if (!name || !email || !phone || !businessType || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newBooking = await createBooking({ name, email, phone, businessType, date });
    res.status(201).json({ message: 'Booking confirmed', booking: newBooking });
  } catch (err) {
    console.error('Booking Error:', err);
    res.status(500).json({ message: 'Server error while booking', error: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await fetchAllBookings();
    res.json(bookings);
  } catch (err) {
    console.error('Fetch Bookings Error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};

const getUserAppointments = async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const bookings = await getBookingsByEmail(email);
    res.json({ bookings });
  } catch (err) {
    console.error('Get Bookings Error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};

const cancelAppointment = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const deleted = await deleteBookingById(bookingId);
    if (deleted) {
      res.json({ message: 'Appointment canceled successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (err) {
    console.error('Cancel Booking Error:', err);
    res.status(500).json({ message: 'Failed to cancel appointment', error: err.message });
  }
};

module.exports = {
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  getAllBookings,
  getMyBookings,
};
