const session = require('express-session');

// List of routes to exclude from session middleware
const excludedRoutes = ['/api/users/register', '/api/users/login'];

// Configure session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  },
});

// Middleware to exclude session for specific routes
const excludeSessionMiddleware = (req, res, next) => {
  if (excludedRoutes.includes(req.path)) {
    console.log(`Session middleware skipped for route: ${req.path}`);
    return next();
  }
  return sessionMiddleware(req, res, next);
};

module.exports = excludeSessionMiddleware;

