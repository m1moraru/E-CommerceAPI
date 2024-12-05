const Users = require('../models/users'); // Adjust the path as necessary

(async () => {
  try {
    console.log('Testing createUser...');
    const newUser = await Users.createUser({
      email: 'testuser@example.com',
      password: 'securepassword123',
      first_name: 'Test',
      last_name: 'User',
    });
    console.log('Created User:', newUser);

    console.log('\nTesting getUserById...');
    const fetchedUser = await Users.getUserById(newUser.id);
    console.log('Fetched User by ID:', fetchedUser);

    console.log('\nTesting getAllUsers...');
    const allUsers = await Users.getAllUsers();
    console.log('All Users:', allUsers);

    console.log('\nTesting updateUser...');
    const updatedUser = await Users.updateUser(newUser.id, {
      email: 'updateduser@example.com',
      first_name: 'Updated',
      last_name: 'User',
    });
    console.log('Updated User:', updatedUser);

    console.log('\nTesting deleteUser...');
    const deletedUser = await Users.deleteUser(newUser.id);
    console.log('Deleted User:', deletedUser);

    console.log('\nAll methods tested successfully!');
  } catch (err) {
    console.error('Error during testing:', err);
  }
})();
