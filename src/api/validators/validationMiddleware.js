const { registerSchema, loginSchema } = require('./userValidator');

/**
 * Validation Middleware Functions
 * 
 * Express middleware functions that validate request data using Joi schemas.
 * Returns 400 Bad Request with detailed error messages for invalid data.
 */

/**
 * Registration Validation Middleware
 * 
 * Validates user registration request body against registerSchema.
 * Ensures all required fields are present and meet validation criteria.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateRegistration = (req, res, next) => {
  // Validate request body against registration schema
  const { error } = registerSchema.validate(req.body);
  
  if (error) {
    // Return detailed validation error message
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }
  
  // Validation passed, continue to next middleware
  next();
};

/**
 * Login Validation Middleware
 * 
 * Validates user login request body against loginSchema.
 * Ensures email and password are provided and meet format requirements.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateLogin = (req, res, next) => {
  // Validate request body against login schema
  const { error } = loginSchema.validate(req.body);
  
  if (error) {
    // Return detailed validation error message
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }
  
  // Validation passed, continue to next middleware
  next();
};

module.exports = { validateRegistration, validateLogin };
