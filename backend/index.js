const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Import Routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const slotRoutes = require('./routes/slotRoutes');
const adminRoutes = require('./routes/adminRoutes');
const businessRoutes = require('./routes/businessRoutes');
const serviceRoutes = require('./routes/serviceRoutes');


// ✅ Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);         // Register, Login
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/business', require('./routes/businessRoutes'));
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/manage/slots', slotRoutes); //  for admin slot management
app.use('/api/slots', require('./routes/availableSlots')); //  for fetching available slots


// ✅ Root route
app.get('/', (req, res) => {
  res.send('🟢 Booking API is running...');
});

// ✅ Test DB Connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ connected: true, time: result.rows[0].now });
  } catch (err) {
    console.error('DB Test Failed:', err);
    res.status(500).json({ connected: false, error: err.message });
  }
});

// ✅ 404 Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
