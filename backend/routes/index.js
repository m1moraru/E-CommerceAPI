const express = require('express');
const authRoutes = require('./authRoutes');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Protected route example
router.get('/protected', ensureAuthenticated, (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});

module.exports = router;
