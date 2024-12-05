require('dotenv').config();
const { Pool } = require('pg');

// Configure the database connection
console.log('Initializing PostgreSQL connection pool...');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT,
});
//console.log('DB_PASSWORD type:', typeof process.env.DB_PASSWORD, process.env.DB_PASSWORD);

// Log all queries for debugging
const originalQuery = pool.query;
pool.query = (...args) => {
  console.log('Executing query:', args[0]);
  return originalQuery.apply(pool, args);
};

pool.query('SELECT NOW()')
  .then((res) => {
    console.log('Database connected, current time:', res.rows[0]);
})
  .catch((err) => {
    console.error('Error during database query:', err.message);
});



// Log successful connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// Log and exit on error
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});


module.exports = pool;
