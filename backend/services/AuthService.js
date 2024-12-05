const db = require('../config/db'); // Import database connection
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import JWT for token generation

// Secret key for JWT (ensure this is set in your .env file)
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

class AuthService {
  // Generate JWT Token
  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email }, // Payload
      SECRET_KEY, // Secret key
      { expiresIn: '1d' } // Token expiration: 1 day
    );
  }

  async login({ email, password }) {
    try {
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

      if (user.rows.length === 0) {
        throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.rows[0].password); // Assuming password is hashed
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      return user.rows[0]; // Return the user if credentials are valid
    } catch (err) {
      throw err;
    }
  }

  async googleLogin(profile) {
    try {
      const { id: google_id, emails, name } = profile;
  
      if (!google_id || !emails || !emails[0]?.value || !name) {
        throw new Error('Invalid profile data from Google');
      }
  
      let user = await db.query('SELECT * FROM users WHERE google_id = $1', [google_id]);
  
      if (user.rows.length > 0) {
        console.log('Existing user found:', user.rows[0]);
        return { user: user.rows[0], token: this.generateToken(user.rows[0]) };
      } else {
        console.log('Creating new user with Google data:', profile);
  
        const defaultPassword = 'google_default_password';
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
  
        const newUser = await db.query(
          'INSERT INTO users (google_id, email, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [
            google_id,
            emails[0].value,
            name.givenName,
            name.familyName,
            hashedPassword
          ]
        );
  
        return { user: newUser.rows[0], token: this.generateToken(newUser.rows[0]) };
      }
    } catch (err) {
      console.error('Error in googleLogin:', err);
      throw new Error('Google login failed');
    }
  }

  async facebookLogin(profile) {
    try {
      let user = await db.query('SELECT * FROM users WHERE facebook_id = $1', [profile.id]);
      if (user.rows.length === 0) {
        // If user doesn't exist, create a new one with default password
        const defaultPassword = 'facebook_default_password';
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        user = await db.query('INSERT INTO users (facebook_id, email, name, password) VALUES ($1, $2, $3, $4) RETURNING *', [
          profile.id,
          profile.emails[0].value,
          profile.name.givenName + ' ' + profile.name.familyName,
          hashedPassword
        ]);
      }

      // Generate a JWT token for the user
      const token = this.generateToken(user.rows[0]);

      return { user: user.rows[0], token }; // Return both user and token
    } catch (err) {
      throw err;
    }
  }

  // Find user by ID
  async findUserById(id) {
    try {
      // Fetch user by ID
      const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      const user = result.rows[0];

      if (!user) {
        throw new Error('User not found');
      }

      // Return user details
      return { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthService;

