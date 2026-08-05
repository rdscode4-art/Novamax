const express = require('express');
const router = express.Router();
const { getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', getGallery);                                              // Public
router.post('/', protect, upload.single('image'), createGalleryItem);    // Admin
router.put('/:id', protect, upload.single('image'), updateGalleryItem);  // Admin
router.delete('/:id', protect, deleteGalleryItem);                       // Admin

module.exports = router;
