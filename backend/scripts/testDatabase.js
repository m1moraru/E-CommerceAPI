const db = require('../config/db'); // Adjust the path if your db.js is in a different location

(async () => {
    try {
        const res = await db.query('SELECT NOW()');
        console.log('Database connected successfully:', res.rows[0]);
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
})();
