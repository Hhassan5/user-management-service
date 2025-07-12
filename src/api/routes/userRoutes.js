const express = require('express');
const { register, login, getProfile } = require('../controllers/userController');
const { validateRegistration, validateLogin } = require('../validators/validationMiddleware');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;