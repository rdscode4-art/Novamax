const express = require('express');
const router = express.Router();
const { submitApplication, getApplications, updateStatus, deleteApplication } = require('../controllers/partnerController');
const { protect } = require('../middlewares/auth');

router.post('/', submitApplication);                         // Public
router.get('/', protect, getApplications);                   // Admin
router.patch('/:id', protect, updateStatus);                 // Admin
router.delete('/:id', protect, deleteApplication);           // Admin

module.exports = router;
