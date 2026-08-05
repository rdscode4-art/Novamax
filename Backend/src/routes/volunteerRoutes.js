const express = require('express');
const router = express.Router();
const { getVolunteers, createVolunteer, updateVolunteer, deleteVolunteer } = require('../controllers/volunteerController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', getVolunteers);                                             // Public
router.post('/', protect, upload.single('image'), createVolunteer);        // Admin
router.put('/:id', protect, upload.single('image'), updateVolunteer);      // Admin
router.delete('/:id', protect, deleteVolunteer);                           // Admin

module.exports = router;
