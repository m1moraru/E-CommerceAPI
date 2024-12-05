# E-Commerce API Portfolio Project

## Overview
- The E-Commerce API is a fully functional REST API for an online store, built with Node.js and PostgreSQL. It supports user authentication, product management, cart functionality, and order processing. This API serves as the backend for an e-commerce website and can be connected to any frontend application.
The API includes authentication via Passport.js, payment processing via Stripe, and detailed API documentation using Swagger..

## Features

- User Authentication: Users can sign up, log in, and access their account  details.

- Product Management: Admins can manage products, including creating, updating, and deleting them.

- Cart Management: Users can add products to their cart, update item quantities, and remove items.

- Order Processing: Users can place orders, view order history, and manage their orders.

- Payment Integration: Stripe is integrated for payment processing when users place orders.

- API Documentation: All endpoints are documented with Swagger for easy integration and understanding.

## Technologies Used

The following technologies and libraries are used in the development of this backend application:

### Backend Technologies:
- Node.js - JavaScript runtime for building scalable and fast network applications.
- Express - Web framework for Node.js, used for building the API and handling HTTP requests.
- Passport - Authentication middleware for Node.js, used to implement various authentication strategies (local, Google, Facebook).
- bcrypt - Library for hashing passwords to enhance security.
- jsonwebtoken - Used for creating JSON Web Tokens (JWT) for authentication (though it is not used in your current implementation due to the decision to use session-based authentication).
- passport-google-oauth20 - Passport strategy for Google OAuth 2.0 authentication.
- passport-facebook - Passport strategy for Facebook authentication.
- passport-local - Passport strategy for local username/password authentication.
- express-session - Middleware for managing session data for users after login.
- pg: PostgreSQL client for Node.js to interact with the database.
- pg-format - Library for formatting SQL queries to prevent SQL injection.
- pg-hstore - A library for serializing and deserializing JSON data for PostgreSQL.
- sequelize - ORM for Node.js, providing easy access to PostgreSQL and other SQL databases.
- dotenv - Loads environment variables from a `.env` file to securely store sensitive information like database credentials and API keys.
- swagger-jsdoc - Used to generate API documentation in Swagger format based on JSDoc comments.
- swagger-ui-express - Middleware for serving Swagger API documentation through Express.

### Development Tools:
- nodemon - Development tool that automatically restarts the server when file changes are detected.
- @babel/plugin-proposal-private-property-in-object - Babel plugin for supporting private properties in JavaScript objects.

### Proxy and HTTP Requests:
- axios - Promise-based HTTP client for the browser and Node.js to make API requests.
- http-proxy-middleware - Middleware used to proxy requests from the frontend to the backend in a development environment.

### Authentication and OAuth:
- react-google-login - React component for implementing Google login in the frontend.

### CORS:
- cors - Middleware for enabling Cross-Origin Resource Sharing (CORS), allowing your app to make requests across different domains.

## Setup Instructions
Follow these steps to get the backend application running locally:

### 1. Clone the Repository
Clone the repository to your local machine using the following command:

` ```bash`
`git clone https://github.com/Kashi754/e-commerce-API.git`
`cd e-commerce-API`

### 2.  Install Dependencies
- `npm install`

### 3. Set Ip the Database
- Before running the application, you need to set up the PostgreSQL tables by running the setupDatabase script. This script will create the necessary tables in your PostgreSQL database.

- To set up the database, run the following command:
`node setupDatabase.js`

- This will connect to the PostgreSQL database and create the following tables if they do not already exist:

- users
- products
- orders
- orderItems
- carts
- cartItems

### 3. Set Up Environment Variables
- DB_HOST=localhost
- DB_PORT=5400
- DB_USER=your_database_user
- DB_PASSWORD=your_database_password
- DB_NAME=e_commerce_api
- SESSION_SECRET=your_session_secret

### 4. Running the Application
- `npm start`
- The API will start and be accessible at `http://localhost:3001`
