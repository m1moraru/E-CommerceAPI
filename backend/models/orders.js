const db = require('../config/db'); // Import shared database connection

const Orders = {
  async createOrder({ total, status, userId }) {
    const query = `
      INSERT INTO orders (total, status, userId)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [total, status, userId];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async getOrderById(orderId) {
    const query = `SELECT * FROM orders WHERE id = $1;`;
    const result = await db.query(query, [orderId]);
    return result.rows[0];
  },

  async getOrdersByUser(userId) {
    const query = `SELECT * FROM orders WHERE userId = $1;`;
    const result = await db.query(query, [userId]);
    return result.rows;
  },

  async getOrderWithItems(orderId) {
    const query = `
      SELECT o.*, oi.*
      FROM orders o
      JOIN orderItems oi ON o.id = oi.orderId
      WHERE o.id = $1;
    `;
    const result = await db.query(query, [orderId]);
    return result.rows;
  },

  async updateOrder(orderId, updates) {
    const { total, status } = updates;
    const query = `
      UPDATE orders
      SET total = $1, status = $2, modified = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *;
    `;
    const values = [total, status, orderId];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async deleteOrder(orderId) {
    const query = `DELETE FROM orders WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [orderId]);
    return result.rows[0];
  },
};

module.exports = Orders;
