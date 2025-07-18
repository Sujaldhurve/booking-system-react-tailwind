const pool = require('../db');

const getBusinessDashboard = async (req, res) => {
  const userId = req.user.userId;

  try {
    const userResult = await pool.query(
      'SELECT id, name, email, business_type FROM users WHERE id = $1',
      [userId]
    );

    const user = userResult.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });

    const bookingsResult = await pool.query(
      `SELECT 
        id, name AS customer_name, email, phone, TO_CHAR(date, 'YYYY-MM-DD') AS date, 
        TO_CHAR(time, 'HH24:MI') AS time, status 
       FROM bookings 
       WHERE business_type = $1 
       ORDER BY date DESC, time ASC`,
      [user.business_type]
    );

    res.json({
      user,
      appointments: bookingsResult.rows,
    });
  } catch (err) {
    console.error('Business dashboard error:', err);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
};

module.exports = {
  getBusinessDashboard,
};
