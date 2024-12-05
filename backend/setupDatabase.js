const { Client } = require('pg');
const { DB } = require('./config');

(async () => {
  const usersTableStmt = `
    CREATE TABLE IF NOT EXISTS e_commerce_api.users (
      id SERIAL PRIMARY KEY NOT NULL,
      email VARCHAR(50) NOT NULL,
      password TEXT NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      role VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      address TEXT,
      google JSON,
      facebook JSON
    );
  `;

  const productsTableStmt = `
    CREATE TABLE IF NOT EXISTS e_commerce_api.products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      price BIGINT NOT NULL,
      description VARCHAR(50) NOT NULL
    );
  `;

  const ordersTableStmt = `
    CREATE TABLE IF NOT EXISTS e_commerce_api.orders (
      id SERIAL PRIMARY KEY,
      total INT NOT NULL,
      status VARCHAR(50) NOT NULL,
      userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const orderItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS e_commerce_api.orderItems (
      id SERIAL PRIMARY KEY,
      orderId INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      productId INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      qty INT NOT NULL,
      price INT NOT NULL,
      name VARCHAR(50) NOT NULL,
      description VARCHAR(200) NOT NULL,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const cartsTableStmt = `
    CREATE TABLE IF NOT EXISTS e_commerce_api.carts (
      id SERIAL PRIMARY KEY,
      userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const cartItemsTableStmt = `
  CREATE TABLE IF NOT EXISTS e_commerce_api.cartItems (
    id SERIAL PRIMARY KEY,                      
    cartId INT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,                 
    productId INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    productName VARCHAR(255) NOT NULL,
    productImage TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,      
    qty INT NOT NULL CHECK (qty > 0), 
    total NUMERIC(10, 2) GENERATED ALWAYS AS (price * qty) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
  );
`;

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT,
    });

    await db.connect();

    console.log("Creating users table...");
    await db.query(usersTableStmt);

    console.log("Creating products table...");
    await db.query(productsTableStmt);

    console.log("Creating orders table...");
    await db.query(ordersTableStmt);

    console.log("Creating orderItems table...");
    await db.query(orderItemsTableStmt);

    console.log("Creating carts table...");
    await db.query(cartsTableStmt);

    console.log("Creating cartItems table...");
    await db.query(cartItemsTableStmt);

    console.log("All tables created successfully.");
    await db.end();
  } catch (err) {
    console.error("ERROR CREATING TABLES:", err.message);
  }
})();

