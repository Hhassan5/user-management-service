// Load environment variables from .env file
require('dotenv').config();

/**
 * Application Configuration
 * 
 * Centralizes all configuration settings and environment variables.
 * Provides fallback values for development and ensures consistent configuration access.
 * 
 * Environment Variables:
 * - PORT: Server port number
 * - MONGODB_URI: MongoDB connection string
 * - JWT_SECRET: Secret key for JWT token signing
 */
module.exports = {
  // Server port configuration
  // Default to 3000 if PORT environment variable is not set
  PORT: process.env.PORT || 3000,
  
  // Database connection string
  // Default to local MongoDB instance if not specified
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/user-service',
  
  // JWT secret key for token signing and verification
  // IMPORTANT: Use a strong, unique secret in production
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
};
