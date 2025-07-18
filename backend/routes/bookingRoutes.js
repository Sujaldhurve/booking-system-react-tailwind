const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyToken } = require('../middleware/authMiddleware');
const sendEmail = require('../sendEmail'); // ✅ Adjust path based on folder structure


// ✅ Book appointment (protected, POST /api/bookings)
router.post('/', verifyToken, async (req, res) => {
  const { name, email, phone, businessType, date, time } = req.body;
  const userId = req.user.userId;

  if (!name || !email || !phone || !businessType || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const alreadyBooked = await pool.query(
      'SELECT * FROM bookings WHERE business_type = $1 AND date = $2 AND time = $3',
      [businessType, date, time]
    );

    if (alreadyBooked.rows.length > 0) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    await pool.query(
      'INSERT INTO bookings (name, email, phone, business_type, date, time, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [name, email, phone, businessType, date, time, userId]
    );
    try {
    await sendEmail({
      to: email,
      subject: `✅ Booking Confirmed - ${businessType}`,
      html: `
        <h2>Booking Confirmed</h2>
        <p>Hi ${name},</p>
        <p>Your booking for <strong>${businessType}</strong> has been confirmed.</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        <p>Thank you for using our Booking System!</p>
      `,
    });
    } catch (emailErr) {
      console.error('Email not sent:', emailErr.message);
    }

  res.status(200).json({ message: 'Booking successful' });
} catch (err) {
  console.error('Booking error:', err.message);
  res.status(500).json({ message: 'Booking failed' });
}

});

// ✅ Get all bookings (for admin/reports)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY date DESC, time ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// GET /api/bookings/summary?range=week|month
router.get('/summary', async (req, res) => {
  const { range } = req.query;

  let groupBy;
  if (range === 'month') {
    groupBy = "TO_CHAR(date, 'YYYY-MM')";
  } else {
    groupBy = "TO_CHAR(date, 'IYYY-IW')"; // ISO week number
  }

  try {
    const result = await pool.query(`
      SELECT ${groupBy} as period, COUNT(*) as total
      FROM bookings
      GROUP BY period
      ORDER BY period DESC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch summary' });
  }
});


// ✅ Get bookings for logged-in user (GET /api/bookings/my)
router.get('/my', verifyToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE user_id = $1 ORDER BY date DESC, time ASC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// ✅ Cancel a booking (DELETE /api/bookings/:id)
router.delete('/:id', verifyToken, async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.userId;

  try {
    const check = await pool.query('SELECT * FROM bookings WHERE id = $1 AND user_id = $2', [bookingId, userId]);

    if (check.rows.length === 0) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    await pool.query('DELETE FROM bookings WHERE id = $1', [bookingId]);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
});


// POST /api/bookings
router.post('/bookings', async (req, res) => {
  const { name, email, phone, businessType, date, time } = req.body;

  try {
    const alreadyBooked = await pool.query(
      'SELECT * FROM bookings WHERE business_type = $1 AND date = $2 AND time = $3',
      [businessType, date, time]
    );

    if (alreadyBooked.rows.length > 0) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    await pool.query(
      'INSERT INTO bookings (name, email, phone, business_type, date, time) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, email, phone, businessType, date, time]
    );

    res.status(200).json({ message: 'Booking successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  }
});

// GET /api/slots?date=YYYY-MM-DD&serviceId=doctor
router.get('/slots', async (req, res) => {
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

// ✅ Update booking status (PUT /api/bookings/:id/status)
router.put('/:id/status', verifyToken, async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    await pool.query('UPDATE bookings SET status = $1 WHERE id = $2', [status, bookingId]);
    res.json({ message: 'Booking status updated successfully'      
  });
   
    await sendEmail({
    to: customer_email, // You’d need to fetch it
    subject: '✅ Booking Confirmed',
    html: `<p>Your booking has been confirmed by the provider.</p>`
  });  
  }  catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ message: 'Failed to update status' });
  } 
});


module.exports = router;