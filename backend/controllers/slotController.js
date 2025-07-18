const { createSlot, getAllSlots, removeSlot } = require('../models/slotModel');

const pool = require('../db');

const addSlot = async (req, res) => {
  const { time } = req.body;
  if (!time) return res.status(400).json({ message: 'Time is required' });

  try {
    const newSlot = await createSlot(time);
    res.status(201).json(newSlot);
  } catch (err) {
    res.status(500).json({ message: 'Error adding slot', error: err.message });
  }
};

const getSlots = async (req, res) => {
  try {
    const slots = await getAllSlots();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching slots', error: err.message });
  }
};

const deleteSlot = async (req, res) => {
  try {
    await removeSlot(req.params.id);
    res.json({ message: 'Slot deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting slot', error: err.message });
  }
};

const getAvailableSlots = async (req, res) => {
  const { date, serviceId } = req.query;
  if (!date || !serviceId) {
    return res.status(400).json({ message: 'Date and serviceId are required' });
  }

  try {
    const booked = await pool.query(
      'SELECT time FROM bookings WHERE date = $1 AND business_type = $2',
      [date, serviceId]
    );
    const bookedTimes = booked.rows.map(r => r.time);

    const all = await pool.query('SELECT time FROM slots ORDER BY time ASC');
    const available = all.rows
      .map(r => r.time)
      .filter(t => !bookedTimes.includes(t));

    return res.json({ slots: available });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching slots', error: err.message });
  }
};

module.exports = { addSlot, getSlots, deleteSlot,  getAvailableSlots };
