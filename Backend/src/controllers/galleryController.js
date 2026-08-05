const Gallery = require('../models/Gallery');
const { successResponse, paginatedResponse } = require('../utils/response');
const fs = require('fs');
const path = require('path');

// @GET /api/gallery — Public
exports.getGallery = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, category, featured } = req.query;
    const filter = { status: 'active' };
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Gallery.find(filter).sort({ featured: -1, sortOrder: 1, createdAt: -1 }).skip(skip).limit(Number(limit)),
      Gallery.countDocuments(filter),
    ]);
    return paginatedResponse(res, items, total, page, limit);
  } catch (err) {
    next(err);
  }
};

// @POST /api/admin/gallery — Admin
exports.createGalleryItem = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Image is required' });
    req.body.image = `/uploads/${req.file.filename}`;
    const item = await Gallery.create(req.body);
    return successResponse(res, item, 'Gallery item created', 201);
  } catch (err) {
    next(err);
  }
};

// @PUT /api/admin/gallery/:id — Admin
exports.updateGalleryItem = async (req, res, next) => {
  try {
    if (req.file) {
      const old = await Gallery.findById(req.params.id);
      if (old && old.image && old.image.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '../../', old.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      req.body.image = `/uploads/${req.file.filename}`;
    }
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    return successResponse(res, item, 'Updated');
  } catch (err) {
    next(err);
  }
};

// @DELETE /api/admin/gallery/:id — Admin
exports.deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    if (item.image && item.image.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../../', item.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    return successResponse(res, null, 'Deleted');
  } catch (err) {
    next(err);
  }
};
