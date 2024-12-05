const db = require('../config/db'); // Import shared database connection

const OrderItems = {
  async createOrderItem({ orderId, productId, qty, price, name, description }) {
    const query = `
      INSERT INTO orderItems (orderId, productId, qty, price, name, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [orderId, productId, qty, price, name, description];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async getOrderItemById(orderItemId) {
    const query = `SELECT * FROM orderItems WHERE id = $1;`;
    const result = await db.query(query, [orderItemId]);
    return result.rows[0];
  },

  async getOrderItemsByOrder(orderId) {
    const query = `SELECT * FROM orderItems WHERE orderId = $1;`;
    const result = await db.query(query, [orderId]);
    return result.rows;
  },

  async updateOrderItem(orderItemId, updates) {
    const { qty, price, name, description } = updates;
    const query = `
      UPDATE orderItems
      SET qty = $1, price = $2, name = $3, description = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [qty, price, name, description, orderItemId];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async deleteOrderItem(orderItemId) {
    const query = `DELETE FROM orderItems WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [orderItemId]);
    return result.rows[0];
  },
};

module.exports = OrderItems;
