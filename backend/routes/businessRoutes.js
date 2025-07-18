const express = require('express');
const router = express.Router();
const { getBusinessDashboard } = require('../controllers/businessController');
const { verifyToken } = require('../middleware/authMiddleware');

// ✅ Route: GET /api/business/dashboard
router.get('/dashboard', verifyToken, getBusinessDashboard);

module.exports = router;
