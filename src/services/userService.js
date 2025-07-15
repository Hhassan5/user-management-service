const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/jwt');
const config = require('../config/config');

/**
 * User Service - Business Logic Layer
 * 
 * Contains all user-related business logic and operations.
 * Handles user registration, authentication, and profile management.
 * Acts as an intermediary between controllers and data repository.
 */
module.exports = {
  /**
   * Register New User
   * 
   * Handles the complete user registration process:
   * 1. Validates uniqueness of email and username
   * 2. Creates new user record in database
   * 3. Password is automatically hashed by model middleware
   * 
   * @param {Object} userData - User registration data
   * @param {string} userData.username - Desired username
   * @param {string} userData.email - User's email address
   * @param {string} userData.password - Plain text password
   * @param {string} [userData.role] - User role (optional)
   * @returns {Promise<Object>} - Created user object (without password)
   * @throws {Error} - If email or username already exists
   */
  register: async ({ username, email, password, role }) => {
    // Check if email is already registered
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error('Email already in use');
    }
    
    // Check if username is already taken
    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      throw new Error('Username already taken');
    }
    
    // Create new user (password will be hashed automatically)
    const user = await userRepository.create({ username, email, password, role });
    
    return user;
  },

  /**
   * User Login Authentication
   * 
   * Authenticates user credentials and generates access token:
   * 1. Finds user by email
   * 2. Verifies password using bcrypt comparison
   * 3. Generates JWT token with user information
   * 
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - Plain text password
   * @returns {Promise<Object>} - Object containing JWT token and user info
   * @returns {string} returns.token - JWT access token
   * @returns {Object} returns.user - User information (id, email, role)
   * @throws {Error} - If credentials are invalid
   */
  login: async ({ email, password }) => {
    // Find user by email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Verify password against hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Create JWT payload (exclude sensitive information)
    const payload = { 
      id: user._id, 
      email: user.email, 
      role: user.role 
    };
    
    // Generate access token with 2-hour expiration
    const token = generateToken(payload, config.JWT_SECRET, '2h');
    
    return { token, user: payload };
  },

  /**
   * Get User Profile
   * 
   * Retrieves complete user profile information by user ID.
   * Excludes sensitive information like password hash.
   * 
   * @param {string} id - User's MongoDB ObjectId
   * @returns {Promise<Object>} - User profile object (without password)
   * @throws {Error} - If user not found
   */
  getProfile: async (id) => {
    // Find user by ID
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Convert Mongoose document to plain object and exclude password
    const { password, ...profile } = user.toObject();
    
    return profile;
  },
};
