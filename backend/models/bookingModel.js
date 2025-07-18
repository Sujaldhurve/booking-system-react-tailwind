const pool = require('../db');

async function createBooking({ name, email, phone, businessType, date }) {
  const result = await pool.query(
    `INSERT INTO bookings (name, email, phone, business_type, date)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, phone, businessType, date]
  );
  return result.rows[0];
}

const fetchAllBookings = async () => {
  const result = await pool.query('SELECT * FROM bookings ORDER BY date DESC');
  return result.rows;
};

module.exports = {
  createBooking,
  fetchAllBookings,
};
