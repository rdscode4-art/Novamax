const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require('../controllers/portalAuthController');
const { protectPortalUser } = require('../middlewares/auth');

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protectPortalUser, getMe);

module.exports = router;
