const router = require('express').Router();
const { registerUser, loginUser, getProfile } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

// Protected routes
router.get('/user/profile', protect, getProfile);

module.exports = router;