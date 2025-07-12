const User = require('../models/user');

/**
 * User data access layer
 */
module.exports = {
  /**
   * Finds a user by email.
   * @param {string} email
   */
  findByEmail: async (email) => User.findOne({ email }),

  /**
   * Finds a user by username.
   * @param {string} username
   */
  findByUsername: async (username) => User.findOne({ username }),

  /**
   * Finds a user by ID.
   * @param {string} id
   */
  findById: async (id) => User.findById(id),

  /**
   * Creates a new user.
   * @param {object} userData
   */
  create: async (userData) => User.create(userData),
};