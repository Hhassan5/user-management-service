const User = require('../models/user');

/**
 * User Repository - Data Access Layer
 * 
 * Provides an abstraction layer over direct database operations.
 * Centralizes all user-related database queries and operations.
 * Following Repository pattern for better code organization and testability.
 */
module.exports = {
  /**
   * Find User by Email
   * 
   * Searches for a user document using email address.
   * Commonly used for login authentication and duplicate checking.
   * 
   * @param {string} email - User's email address
   * @returns {Promise<Object|null>} - User document or null if not found
   */
  findByEmail: async (email) => {
    return User.findOne({ email });
  },

  /**
   * Find User by Username
   * 
   * Searches for a user document using username.
   * Used for duplicate checking during registration.
   * 
   * @param {string} username - User's username
   * @returns {Promise<Object|null>} - User document or null if not found
   */
  findByUsername: async (username) => {
    return User.findOne({ username });
  },

  /**
   * Find User by ID
   * 
   * Retrieves a user document using MongoDB ObjectId.
   * Used for profile retrieval and authenticated operations.
   * 
   * @param {string} id - MongoDB ObjectId as string
   * @returns {Promise<Object|null>} - User document or null if not found
   */
  findById: async (id) => {
    return User.findById(id);
  },

  /**
   * Create New User
   * 
   * Creates and saves a new user document to the database.
   * Password will be automatically hashed by pre-save middleware.
   * 
   * @param {Object} userData - User data object
   * @param {string} userData.username - User's username
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's plain text password
   * @param {string} [userData.role] - User's role (optional, defaults to 'student')
   * @returns {Promise<Object>} - Created user document
   */
  create: async (userData) => {
    return User.create(userData);
  },
};
