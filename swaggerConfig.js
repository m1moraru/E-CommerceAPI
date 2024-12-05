const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',  // OpenAPI version
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API documentation for the E-Commerce application',
    },
    servers: [
      {
        url: 'http://localhost:3001/api', // Server URL
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid', // Assuming 'connect.sid' is your session cookie name
        },
      },
    },
  },
  apis: [], // We won't use inline docs here, all the routes will be specified below
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

swaggerDocs.paths = {
  '/signup': {
    post: {
      summary: 'Register a new user (Sign Up)',
      description: 'Registers a new user with email, password, first name, and last name.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'User created successfully' },
        400: { description: 'Invalid input' },
      },
    },
  },
  '/login': {
    post: {
      summary: 'User login (Local)',
      description: 'Logs in the user using email and password.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Login successful' },
        401: { description: 'Invalid credentials' },
      },
    },
  },
  '/account': {
    get: {
      summary: 'Get current user info (Requires Authentication)',
      description: 'Returns the current authenticated user information.',
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: 'Current user information' },
        401: { description: 'Unauthorized, authentication required' },
      },
    },
  },
  '/auth/google': {
    get: {
      summary: 'Google Authentication route',
      description: 'Initiates the Google OAuth2.0 login process.',
      responses: {
        302: { description: 'Redirects to Google authentication' },
      },
    },
  },
  '/auth/google/callback': {
    get: {
      summary: 'Google OAuth callback route',
      description: 'Handles the Google OAuth callback and redirects with a token.',
      parameters: [
        {
          name: 'token',
          in: 'query',
          description: 'JWT token returned after successful authentication',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        302: { description: 'Redirects to the frontend with token' },
      },
    },
  },
  '/auth/facebook': {
    get: {
      summary: 'Facebook Authentication route',
      description: 'Initiates the Facebook OAuth2.0 login process.',
      responses: {
        302: { description: 'Redirects to Facebook authentication' },
      },
    },
  },
  '/auth/facebook/callback': {
    get: {
      summary: 'Facebook OAuth callback route',
      description: 'Handles the Facebook OAuth callback and redirects with a token.',
      parameters: [
        {
          name: 'token',
          in: 'query',
          description: 'JWT token returned after successful authentication',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        302: { description: 'Redirects to the frontend with token' },
      },
    },
  },
  '/{id}': {
    get: {
      summary: 'Get user by ID (Requires Authentication)',
      description: 'Retrieves the user details by ID.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the user',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: 'User details retrieved' },
        401: { description: 'Unauthorized, authentication required' },
        404: { description: 'User not found' },
      },
    },
    put: {
      summary: 'Update user details (Requires Authentication)',
      description: 'Updates the user information such as email, first name, and last name.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the user to update',
          required: true,
          schema: { type: 'integer' },
        },
        {
          name: 'user',
          in: 'body',
          description: 'User information to update',
          required: true,
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              first_name: { type: 'string' },
              last_name: { type: 'string' },
            },
          },
        },
      ],
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: 'User updated successfully' },
        400: { description: 'Invalid input' },
        404: { description: 'User not found' },
      },
    },
    delete: {
      summary: 'Delete user (Requires Authentication)',
      description: 'Deletes the user by ID.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the user to delete',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: 'User deleted successfully' },
        404: { description: 'User not found' },
      },
    },
  },
  '/created_at': {
    get: {
      summary: 'Get user\'s creation date (Requires Authentication)',
      description: 'Retrieves the date when the user was created.',
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: 'User creation date' },
        401: { description: 'Unauthorized, authentication required' },
      },
    },
  },
};

module.exports = swaggerDocs;

