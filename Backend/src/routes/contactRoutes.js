const express = require('express');
const router = express.Router();
const { submitContact, getContacts, updateContactStatus, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middlewares/auth');

router.post('/', submitContact);                              // Public
router.get('/', protect, getContacts);                       // Admin
router.patch('/:id', protect, updateContactStatus);          // Admin
router.delete('/:id', protect, deleteContact);               // Admin

module.exports = router;
