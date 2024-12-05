const Users = require('../models/users');
const db = require('../config/db');

(async () => {
  try {
    // Provide test data for user creation with a unique email
    const testUser = {
      email: `test${Date.now()}@example.com`,
      password: 'securepassword123',
      first_name: 'Test',
      last_name: 'User',
    };

    console.log('Starting test for createUser...');
    const newUser = await Users.createUser(testUser);
    console.log('Newly created user:', newUser);

    // Clean up: Optional
    await db.query('DELETE FROM users WHERE email = $1', [testUser.email]);
    console.log('Test user deleted.');
  } catch (err) {
    console.error('Error during createUser test:', err);
  } finally {
    process.exit(0); 
  }
})();

