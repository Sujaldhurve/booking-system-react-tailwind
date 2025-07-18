const pool = require('../db');

const findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const createUser = async (name, email, hashedPassword, role, businessType) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, business_type)
     VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, business_type`,
    [name, email, hashedPassword, role, businessType]
  );
  return result.rows[0];
};

module.exports = { findUserByEmail, createUser };
