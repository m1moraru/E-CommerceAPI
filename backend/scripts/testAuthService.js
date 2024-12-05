// AuthService.js
const db = require('../config/db');

async function testQuery() {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('Database query result:', result.rows[0]);
  } catch (err) {
    console.error('Error in testQuery:', err);
  }
}

const AuthService = {
    async authenticateUser(email) {
      try {
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await db.query(query, [email]);
        return result.rows[0];
      } catch (err) {
        console.error('Error authenticating user:', err);
        throw err;
      }
    },
};
  

testQuery();
