const express = require('express');
const router = express.Router();
const pool = require('../db');

//////////////////////
// Services
//////////////////////

// Get all services
router.get('/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

// Add a new service
router.post('/services', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Service name is required' });

  try {
    const result = await pool.query('INSERT INTO services (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add service' });
  }
});

// Delete service
router.delete('/services/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM services WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
});

//////////////////////
// Slots
//////////////////////

// Get all time slots
router.get('/slots/all', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM slots ORDER BY time ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch slots' });
  }
});

// Add a new slot
router.post('/slots', async (req, res) => {
  const { time } = req.body;
  if (!time) return res.status(400).json({ message: 'Time is required' });

  try {
    const result = await pool.query('INSERT INTO slots (time) VALUES ($1) RETURNING *', [time]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add slot' });
  }
});

// Delete a slot
router.delete('/slots/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM slots WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete slot' });
  }
});

module.exports = router;
