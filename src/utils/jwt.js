const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token for a user.
 * @param {object} payload - User data to encode
 * @param {string} secret - JWT secret
 * @param {string} expiresIn - Token expiry (e.g., '1h')
 */
function generateToken(payload, secret, expiresIn = '1h') {
  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * Verifies a JWT token.
 */
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

module.exports = { generateToken, verifyToken };