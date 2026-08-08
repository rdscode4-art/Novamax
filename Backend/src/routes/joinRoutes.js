const express = require('express');
const router = express.Router();
const { submitJoinApplication, getApplications, updateStatus, deleteApplication } = require('../controllers/joinController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.post('/', upload.single('photo'), submitJoinApplication);  // Public
router.get('/', protect, getApplications);                        // Admin
router.patch('/:id', protect, updateStatus);                      // Admin
router.post('/:id/approve', protect, upload.fields([{ name: 'idCard' }, { name: 'joiningLetter' }]), require('../controllers/joinController').approveApplication); // Admin
router.delete('/:id', protect, deleteApplication);                // Admin

module.exports = router;
