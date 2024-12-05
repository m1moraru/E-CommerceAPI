const http = require('http'); 
const express = require('express'); 
const dotenv = require('dotenv'); 
const app = require('./index'); 

// Initialize dotenv to load environment variables
dotenv.config();

// Create an instance of Express
const expressApp = express();

// Middleware to parse incoming JSON requests
expressApp.use(express.json());

// Middleware to log all incoming requests
expressApp.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Use the imported app instance (Passport middleware and routes)
expressApp.use(app);

// Create a custom HTTP server with an increased max header size
const server = http.createServer(
  {
    maxHeaderSize: 65536, 
  },
  expressApp
);

// Define the port for the server
const PORT = process.env.SERVER_PORT || 3001; 
// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Unhandled exception occurred:', err);
  process.exit(1); // Exit with failure code
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown on termination signals
const gracefulShutdown = (signal) => {
  console.log(`${signal} received. Closing server gracefully...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0); // Exit with success code
  });
};

// Attach signal handlers for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
