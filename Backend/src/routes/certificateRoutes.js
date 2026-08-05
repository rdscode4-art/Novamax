const express = require('express');
const router = express.Router();
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Public
router.get('/', getCertificates);

// Admin
router.post('/', protect, upload.single('file'), createCertificate);
router.put('/:id', protect, upload.single('file'), updateCertificate);
router.delete('/:id', protect, deleteCertificate);

module.exports = router;
