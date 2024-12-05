const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const AuthService = require('../services/AuthService');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../config/db');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'ECsecret';
const AuthServiceInstance = new AuthService();

module.exports = (app) => {
  // Configure session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, 
      },
    })
  );

  // Initialize Passport and session
  app.use(passport.initialize());
  app.use(passport.session());

  // Serialize user to store only the user ID in the session
  passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.id); // Serialize only the user ID
  });

  // Deserialize user to retrieve user details from the database
  passport.deserializeUser(async (id, done) => {
    try {
      const result = await db.query('SELECT id, first_name FROM users WHERE id = $1', [id]);
      if (result.rows.length) {
        done(null, result.rows[0]); // Attach user object to session
      } else {
        done(new Error('User not found'), null);
      }
    } catch (err) {
      done(err, null);
    }
  });

// Local Strategy (used for email/password authentication)
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
  
        // Compare hashed password here (use bcrypt or similar)
        const match = await bcrypt.compare(password, user.password);
        
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
      } catch (error) {
        return done(error);
      }
    }
));
  

  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CONSUMER_KEY,
        clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Handle Google OAuth login
          const { user, token } = await AuthServiceInstance.googleLogin(profile);

          // Only store user ID and token for session serialization
          return done(null, { id: user.id, token: token }); // Store only the id and token
        } catch (err) {
          console.error('Google OAuth error:', err);
          return done(err);
        }
      }
    )
  );

  // Facebook OAuth Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CONSUMER_KEY,
        clientSecret: process.env.FACEBOOK_CONSUMER_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'emails', 'name'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Handle Facebook OAuth login
          const user = await AuthServiceInstance.facebookLogin(profile);
          return done(null, user);
        } catch (err) {
          console.error('Facebook OAuth error:', err);
          return done(err);
        }
      }
    )
  );

  // JWT Strategy for API Authentication
  passport.use(
    new jwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,  // Correct environment variable for JWT secret
      },
      async (jwtPayload, done) => {
        try {
          // Fetch user data based on the JWT payload (typically user ID)
          const user = await AuthServiceInstance.findUserById(jwtPayload.id);
          if (!user) {
            return done(null, false); // User not found
          }
          return done(null, user); // Return user if found
        } catch (err) {
          return done(err, false); // Error during JWT verification
        }
      }
    )
  );

  return passport;
};
