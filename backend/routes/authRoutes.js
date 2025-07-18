const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

const pool = require('../db');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ Get logged-in user info
router.get('/me', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Fetch user info error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
