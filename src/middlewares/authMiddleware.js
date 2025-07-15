const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * JWT Authentication Middleware
 * 
 * Express middleware that validates JWT tokens for protected routes.
 * Extracts token from Authorization header and verifies its validity.
 * Sets req.user with decoded token payload for use in subsequent middleware.
 * 
 * Expected Header Format:
 * Authorization: Bearer <JWT_TOKEN>
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports = (req, res, next) => {
  // Extract Authorization header
  const authHeader = req.headers['authorization'];
  
  // Check if Authorization header exists and has correct format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'Missing or invalid Authorization header. Format: Bearer <token>' 
    });
  }
  
  // Extract token from "Bearer <token>" format
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify token using JWT secret
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Add decoded user information to request object
    // This will be available in subsequent middleware and route handlers
    req.user = decoded;
    
    // Continue to next middleware
    next();
  } catch (err) {
    // Token verification failed (invalid, expired, or malformed)
    return res.status(401).json({ 
      error: 'Invalid or expired token' 
    });
  }
};
