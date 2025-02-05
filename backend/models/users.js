const db = require('../config/db'); // Import shared database connection
const pool = require('../config/db');

const Users = {
  async createUser({ email, password, first_name, last_name }) {
    const query = `
      INSERT INTO users (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [email, password, first_name, last_name];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async getUserById(userId) {
    const query = `SELECT * FROM users WHERE id = $1;`;
    const result = await db.query(query, [userId]);
    return result.rows[0];
  },

  async getAllUsers() {
    const query = `SELECT * FROM users;`;
    const result = await db.query(query);
    return result.rows;
  },

  async updateUser(userId, updates) {
    const { email, first_name, last_name } = updates;
    const query = `
      UPDATE users
      SET email = $1, first_name = $2, last_name = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [email, first_name, last_name, userId];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async deleteUser(userId) {
    const query = `DELETE FROM users WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [userId]);
    return result.rows[0];
  },
  async authenticateUser(email) {
    const query = `SELECT * FROM users WHERE email = $1;`;
    const result = await db.query(query, [email]);

    if (result.rows.length === 0) {
      return null; // No user found
    }

    // Return the user object if found, or null if not found
    return result.rows[0]
  },

  async getUserCreatedAt(userId) {
    const query = 'SELECT created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);
    
    if (result.rows.length > 0) {
      return result.rows[0].created_at;
    } else {
      throw new Error('User not found');
    }
  }
};

module.exports = Users;
