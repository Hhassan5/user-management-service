const userService = require('../../services/userService');

/**
 * Handles user registration.
 */
const register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

/**
 * Handles user login.
 */
const login = async (req, res, next) => {
  try {
    const { token, user } = await userService.login(req.body);
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

/**
 * Fetches the authenticated user's profile.
 */
const getProfile = async (req, res, next) => {
  try {
    const profile = await userService.getProfile(req.user.id);
    res.json({ profile });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getProfile };