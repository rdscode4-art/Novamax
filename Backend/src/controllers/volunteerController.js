const NGOVolunteer = require('../models/NGOVolunteer');
const { successResponse, paginatedResponse } = require('../utils/response');

// @GET /api/volunteers — Public
exports.getVolunteers = async (req, res, next) => {
  try {
    const { level, featured } = req.query;
    const filter = { status: 'active' };
    if (level) filter.level = level;
    if (featured === 'true') filter.featured = true;

    const volunteers = await NGOVolunteer.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    return successResponse(res, volunteers);
  } catch (err) {
    next(err);
  }
};

// @POST /api/admin/volunteers — Admin
exports.createVolunteer = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `/uploads/${req.file.filename}`;
    const vol = await NGOVolunteer.create(req.body);
    return successResponse(res, vol, 'Volunteer created', 201);
  } catch (err) {
    next(err);
  }
};

// @PUT /api/admin/volunteers/:id — Admin
exports.updateVolunteer = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `/uploads/${req.file.filename}`;
    const vol = await NGOVolunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vol) return res.status(404).json({ success: false, message: 'Not found' });
    return successResponse(res, vol, 'Updated');
  } catch (err) {
    next(err);
  }
};

// @DELETE /api/admin/volunteers/:id — Admin
exports.deleteVolunteer = async (req, res, next) => {
  try {
    await NGOVolunteer.findByIdAndDelete(req.params.id);
    return successResponse(res, null, 'Deleted');
  } catch (err) {
    next(err);
  }
};
