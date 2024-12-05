const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const passport = require('passport');
const cartItemsRoutes = require('./routes/cartItemsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');
const orderItemsRoutes = require('./routes/orderItemsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const orderHistoryRoutes = require('./routes/orderHistoryRoutes');
const bodyParser = require('body-parser');
const passportConfig = require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swaggerConfig'); 
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

dotenv.config();
const app = express();

// CORS Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Allow cookies and other credentials
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
    ],
  })
);

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Security feature to help prevent attacks
    secure: false,  // Set this to true if using HTTPS
    maxAge: 3600000, // Cookie expiration time (1 hour)
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Initialize Passport
passportConfig(app);

// Google callback route for OAuth authentication
app.get('/api/users/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    successRedirect: '/'
  })
);

// Protect this route to verify if the user is logged in
app.get('/api/users/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Register routes
app.use('/api/cartItems', cartItemsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/orderItems', orderItemsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/order-history', orderHistoryRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Test session route
app.get('/test-session', (req, res) => {
  console.log('Session data:', req.session);
  res.json({ message: 'Session data', session: req.session });
});

// Error handling for other uncaught exceptions
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
