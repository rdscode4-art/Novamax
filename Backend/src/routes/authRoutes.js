const express = require('express');
const router = express.Router();
const { login, getMe, logout, changePassword, updateProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.post('/logout', protect, logout);
router.put('/change-password', protect, changePassword);

module.exports = router;
