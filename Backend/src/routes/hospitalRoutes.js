const express = require('express');
const router = express.Router();
const {
  getHospitals, getHospital, createHospital,
  updateHospital, deleteHospital, getFilters,
} = require('../controllers/hospitalController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Public
router.get('/', getHospitals);
router.get('/filters', getFilters);
router.get('/:id', getHospital);

// Admin
router.post('/', protect, upload.single('image'), createHospital);
router.put('/:id', protect, upload.single('image'), updateHospital);
router.delete('/:id', protect, deleteHospital);

module.exports = router;
