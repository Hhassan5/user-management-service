const jwt = require('jsonwebtoken');

/**
 * JWT Utility Functions
 * 
 * Provides helper functions for JSON Web Token operations.
 * Handles token generation and verification for user authentication.
 */

/**
 * Generate JWT Token
 * 
 * Creates a signed JWT token containing user information.
 * Used after successful login to provide authentication credentials.
 * 
 * @param {Object} payload - Data to encode in the token
 * @param {string} payload.id - User's unique identifier
 * @param {string} payload.email - User's email address
 * @param {string} payload.role - User's role (student/instructor/admin)
 * @param {string} secret - JWT signing secret key
 * @param {string} [expiresIn='1h'] - Token expiration time (e.g., '1h', '24h', '7d')
 * @returns {string} - Signed JWT token
 */
function generateToken(payload, secret, expiresIn = '1h') {
  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * Verify JWT Token
 * 
 * Validates and decodes a JWT token.
 * Throws an error if token is invalid, expired, or malformed.
 * 
 * @param {string} token - JWT token to verify
 * @param {string} secret - JWT signing secret used to verify signature
 * @returns {Object} - Decoded token payload
 * @throws {Error} - If token is invalid or expired
 */
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

module.exports = { generateToken, verifyToken };
