const express = require('express');
const usersController = require('../controllers/userController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated'); // Ensure middleware is correctly imported
const passport = require('passport');
const router = express.Router();

// Register a new user (Sign Up)
router.post('/signup', usersController.createUser);

// User login (Local)
router.post('/login', usersController.loginUser);

// User info (me) - requires authentication
//router.get('/users/me', (req, res) => {
//  if (!req.isAuthenticated()) {
//    return res.status(401).json({ error: 'Not authenticated' });
//  }
//  res.json(req.user); // Send the user data
//});

// Route to check if the user is authenticated
//router.get('/auth/me', (req, res) => {
//  if (req.isAuthenticated()) {
//    return res.json({
//      isAuthenticated: true,
//      user: req.user, // Assumes req.user is populated by Passport
//    });
//  }
//  return res.json({
//    isAuthenticated: false,
//    user: null,
//  });
//});

// Protected routes (require authentication)
router.get('/account', ensureAuthenticated, usersController.getMe);
router.get('/me', ensureAuthenticated, usersController.getMe);

// Google Authentication route
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = req.user.token;  // Get the token from the user object
    console.log('Redirecting with token:', token);
    res.redirect(`http://localhost:3000?token=${token}`);  // Send token in the URL to frontend
  }
);

// Facebook Authentication route
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

// Facebook OAuth callback route
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    res.redirect(`http://localhost:3000/?token=${req.user.token}`);
  }
);

// Additional routes (CRUD operations)
router.get('/:id', ensureAuthenticated, usersController.getUser);
router.put('/:id', ensureAuthenticated, usersController.updateUser);
router.delete('/:id', ensureAuthenticated, usersController.deleteUser);
router.get('/created_at', ensureAuthenticated, usersController.getUserCreatedAt);

module.exports = router;
