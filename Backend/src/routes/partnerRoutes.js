const express = require('express');
const router = express.Router();
const { submitApplication, getApplications, updateStatus, deleteApplication } = require('../controllers/partnerController');
const { protect } = require('../middlewares/auth');

router.post('/', submitApplication);                         // Public
router.get('/', protect, getApplications);                   // Admin
router.patch('/:id', protect, updateStatus);                 // Admin
router.post('/:id/approve', protect, require('../middlewares/upload').fields([{ name: 'idCard' }, { name: 'joiningLetter' }]), require('../controllers/partnerController').approveApplication); // Admin
router.delete('/:id', protect, deleteApplication);           // Admin

module.exports = router;
