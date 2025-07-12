const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/jwt');
const config = require('../config/config');

/**
 * Handles user registration, login, and profile logic.
 */
module.exports = {
  /**
   * Registers a new user.
   */
  register: async ({ username, email, password, role }) => {
    // Check for existing user
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email already in use');
    }
    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      throw new Error('Username already taken');
    }
    const user = await userRepository.create({ username, email, password, role });
    return user;
  },

  /**
   * Authenticates a user and returns a JWT token.
   */
  login: async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');
    // Exclude sensitive fields from token
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = generateToken(payload, config.JWT_SECRET, '2h');
    return { token, user: payload };
  },

  /**
   * Fetches a user profile by ID.
   */
  getProfile: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User not found');
    // Exclude password
    const { password, ...profile } = user.toObject();
    return profile;
  },
};