const db = require('../config/db'); // Import shared database connection

const CartItems = {
  async createCartItem({ cartId, productId, productName, productImage, price, qty }) {
    const query = `
      INSERT INTO cartItems (cartId, productId, productName, productImage, price, qty)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [cartId, productId, productName, productImage, price, qty];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async getCartItemById(cartItemId) {
    const query = `SELECT * FROM cartItems WHERE id = $1;`;
    const result = await db.query(query, [cartItemId]);
    return result.rows[0];
  },

  async getCartItemsByCart(cartId) {
    const query = `SELECT * FROM cartItems WHERE cartId = $1;`;
    const result = await db.query(query, [cartId]);
    return result.rows;
  },

  async updateCartItem(cartItemId, updates) {
    const { qty, price } = updates;
    const query = `
      UPDATE cartItems
      SET qty = $1, price = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *;
    `;
    const values = [qty, price, cartItemId];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async deleteCartItem(cartItemId) {
    const query = `DELETE FROM cartItems WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [cartItemId]);
    return result.rows[0];
  },
};

module.exports = CartItems;
