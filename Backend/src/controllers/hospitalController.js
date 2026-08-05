const Hospital = require('../models/Hospital');
const { successResponse, paginatedResponse } = require('../utils/response');
const slugify = require('slugify');

// @GET /api/hospitals — Public
exports.getHospitals = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, search, category, state, featured } = req.query;
    const filter = { status: 'active' };

    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { state: { $regex: search, $options: 'i' } },
    ];
    if (category) filter.category = category;
    if (state) filter.state = { $regex: state, $options: 'i' };
    if (featured === 'true') filter.featured = true;

    const skip = (page - 1) * limit;
    const [hospitals, total] = await Promise.all([
      Hospital.find(filter).sort({ featured: -1, sortOrder: 1, createdAt: -1 }).skip(skip).limit(Number(limit)),
      Hospital.countDocuments(filter),
    ]);

    return paginatedResponse(res, hospitals, total, page, limit);
  } catch (err) {
    next(err);
  }
};

// @GET /api/hospitals/:id — Public
exports.getHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findOne({ _id: req.params.id, status: 'active' });
    if (!hospital) return res.status(404).json({ success: false, message: 'Hospital not found' });
    return successResponse(res, hospital);
  } catch (err) {
    next(err);
  }
};

// @POST /api/admin/hospitals — Admin
exports.createHospital = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `/uploads/${req.file.filename}`;
    const hospital = await Hospital.create(req.body);
    return successResponse(res, hospital, 'Hospital created', 201);
  } catch (err) {
    next(err);
  }
};

// @PUT /api/admin/hospitals/:id — Admin
exports.updateHospital = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `/uploads/${req.file.filename}`;
    if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!hospital) return res.status(404).json({ success: false, message: 'Hospital not found' });
    return successResponse(res, hospital, 'Hospital updated');
  } catch (err) {
    next(err);
  }
};

// @DELETE /api/admin/hospitals/:id — Admin
exports.deleteHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) return res.status(404).json({ success: false, message: 'Hospital not found' });
    return successResponse(res, null, 'Hospital deleted');
  } catch (err) {
    next(err);
  }
};

// @GET /api/hospitals/filters — Public (for dropdowns)
exports.getFilters = async (req, res, next) => {
  try {
    const categories = await Hospital.distinct('category');
    const states = await Hospital.distinct('state');
    return successResponse(res, { categories, states });
  } catch (err) {
    next(err);
  }
};
