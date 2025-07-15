const userService = require('../../services/userService');

/**
 * User Controller - HTTP Request Handlers
 * 
 * Handles HTTP requests for user-related operations.
 * Acts as the interface between HTTP layer and business logic.
 * All methods follow async/await pattern and use Express error handling.
 */

/**
 * Register User Handler
 * 
 * Handles POST /api/users/register requests.
 * Creates a new user account and returns success response.
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing user data
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const register = async (req, res, next) => {
  try {
    // Call user service to handle registration logic
    const user = await userService.register(req.body);
    
    // Send success response with user data (excluding password)
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err) {
    // Pass error to error handling middleware
    next(err);
  }
};

/**
 * Login User Handler
 * 
 * Handles POST /api/users/login requests.
 * Authenticates user and returns JWT token.
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing login credentials
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const login = async (req, res, next) => {
  try {
    // Call user service to handle authentication
    const { token, user } = await userService.login(req.body);
    
    // Send success response with token and user info
    res.json({ token, user });
  } catch (err) {
    // Pass error to error handling middleware
    next(err);
  }
};

/**
 * Get User Profile Handler
 * 
 * Handles GET /api/users/profile requests.
 * Returns authenticated user's profile information.
 * Requires valid JWT token in Authorization header.
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.user - User info from JWT token (set by auth middleware)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getProfile = async (req, res, next) => {
  try {
    // Get user profile using ID from JWT token
    const profile = await userService.getProfile(req.user.id);
    
    // Send profile data in response
    res.json({ profile });
  } catch (err) {
    // Pass error to error handling middleware
    next(err);
  }
};

module.exports = { register, login, getProfile };
