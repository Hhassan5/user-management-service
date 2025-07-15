const express = require('express');
const { register, login, getProfile } = require('../controllers/userController');
const { validateRegistration, validateLogin } = require('../validators/validationMiddleware');
const authMiddleware = require('../../middlewares/authMiddleware');

/**
 * User Routes Configuration
 * 
 * Defines all user-related API endpoints and their middleware stack.
 * Each route specifies the HTTP method, path, middleware, and handler function.
 */

// Create Express router instance
const router = express.Router();

/**
 * User Registration Endpoint
 * 
 * POST /api/users/register
 * 
 * Middleware stack:
 * 1. validateRegistration - Validates request body using Joi schema
 * 2. register - Handles user registration logic
 * 
 * Request Body:
 * {
 *   "username": "string",
 *   "email": "string",
 *   "password": "string",
 *   "role": "string" (optional)
 * }
 * 
 * Response: 201 Created with user data
 */
router.post('/register', validateRegistration, register);

/**
 * User Login Endpoint
 * 
 * POST /api/users/login
 * 
 * Middleware stack:
 * 1. validateLogin - Validates request body using Joi schema
 * 2. login - Handles user authentication
 * 
 * Request Body:
 * {
 *   "email": "string",
 *   "password": "string"
 * }
 * 
 * Response: 200 OK with JWT token and user data
 */
router.post('/login', validateLogin, login);

/**
 * User Profile Endpoint
 * 
 * GET /api/users/profile
 * 
 * Middleware stack:
 * 1. authMiddleware - Validates JWT token and sets req.user
 * 2. getProfile - Returns user profile data
 * 
 * Headers:
 * Authorization: Bearer <JWT_TOKEN>
 * 
 * Response: 200 OK with user profile data
 */
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
