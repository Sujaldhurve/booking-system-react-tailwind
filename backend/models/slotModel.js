const pool = require('../db');

const createSlot = async (time) => {
  const result = await pool.query(
    'INSERT INTO slots (time) VALUES ($1) RETURNING *',
    [time]
  );
  return result.rows[0];
};

const getAllSlots = async () => {
  const result = await pool.query('SELECT * FROM slots ORDER BY time');
  return result.rows;
};

const removeSlot = async (id) => {
  await pool.query('DELETE FROM slots WHERE id = $1', [id]);
};

module.exports = { createSlot, getAllSlots, removeSlot };
