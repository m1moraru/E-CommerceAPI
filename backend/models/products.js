const db = require('../config/db'); // Import shared database connection

const Products = {
  async createProduct({ name, price, description }) {
    const query = `
      INSERT INTO products (name, price, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, price, description];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async getProductById(productId) {
    const query = `SELECT * FROM products WHERE id = $1;`;
    const result = await db.query(query, [productId]);
    return result.rows[0];
  },

  async getAllProducts() {
    const query = `SELECT * FROM products;`;
    const result = await db.query(query);
    return result.rows;
  },

  async updateProduct(productId, updates) {
    const { name, price, description } = updates;
    const query = `
      UPDATE products
      SET name = $1, price = $2, description = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [name, price, description, productId];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async deleteProduct(productId) {
    const query = `DELETE FROM products WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [productId]);
    return result.rows[0];
  },
};

module.exports = Products;
