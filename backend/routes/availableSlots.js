// routes/availableSlots.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const { date, serviceId } = req.query;

  try {
    const bookedSlots = await pool.query(
      'SELECT time FROM bookings WHERE date = $1 AND business_type = $2',
      [date, serviceId]
    );

    const booked = bookedSlots.rows.map(row => row.time);

    const result = await pool.query('SELECT time FROM slots ORDER BY time ASC');
    const allSlots = result.rows.map(row => row.time);
    const availableSlots = allSlots.filter(time => !booked.includes(time));

    res.json({ slots: availableSlots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching slots' });
  }
});

module.exports = router;
