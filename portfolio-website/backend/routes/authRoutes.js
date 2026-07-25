const express = require('express');
const router = express.Router();
const { login, verifyToken, changePassword } = require('../controllers/authController');
const { validateLogin, validatePasswordChange } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/login', validateLogin, login);

// Protected routes
router.get('/verify', protect, verifyToken);
router.put('/change-password', protect, validatePasswordChange, changePassword);

module.exports = router;
