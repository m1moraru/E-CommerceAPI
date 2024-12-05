const db = require('../config/db'); // Import shared database connection

const Carts = {
  async createCart(userId) {
    const query = `
      INSERT INTO carts (user_id)
      VALUES ($1)
      RETURNING *;
    `;
    const result = await db.query(query, [userId]);
    return result.rows[0];
  },

  async getCartById(cartId) {
    const query = `SELECT * FROM carts WHERE id = $1;`;
    const result = await db.query(query, [cartId]);
    return result.rows[0];
  },

  async getCartByUser(userId) {
    const query = `SELECT * FROM carts WHERE user_id = $1;`;
    const result = await db.query(query, [userId]);
    return result.rows[0];
  },

  async updateCart(cartId) {
    const query = `
      UPDATE carts
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;
    `;
    const result = await db.query(query, [cartId]);
    return result.rows[0];
  },

  async deleteCart(cartId) {
    const query = `DELETE FROM carts WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [cartId]);
    return result.rows[0];
  },
};

module.exports = Carts;

