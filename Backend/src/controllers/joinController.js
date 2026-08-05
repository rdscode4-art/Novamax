const JoinApplication = require('../models/JoinApplication');
const { successResponse, paginatedResponse } = require('../utils/response');

// @POST /api/join-applications — Public
exports.submitJoinApplication = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = `/uploads/${req.file.filename}`;

    if (!data.formType || !data.fullName || !data.email || !data.phone || !data.address || !data.postLevel)
      return res.status(400).json({ success: false, message: 'Required fields missing' });

    const app = await JoinApplication.create(data);
    return successResponse(res, app, 'Application submitted successfully', 201);
  } catch (err) {
    next(err);
  }
};

// @GET /api/admin/join-applications — Admin
exports.getApplications = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, formType, search } = req.query;
    const filter = { isDeleted: false };
    if (status) filter.status = status;
    if (formType) filter.formType = formType;
    if (search) filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];

    const skip = (page - 1) * limit;
    const [apps, total] = await Promise.all([
      JoinApplication.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      JoinApplication.countDocuments(filter),
    ]);
    return paginatedResponse(res, apps, total, page, limit);
  } catch (err) {
    next(err);
  }
};

// @PATCH /api/admin/join-applications/:id — Admin
exports.updateStatus = async (req, res, next) => {
  try {
    const app = await JoinApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!app) return res.status(404).json({ success: false, message: 'Not found' });
    return successResponse(res, app, 'Status updated');
  } catch (err) {
    next(err);
  }
};

// @DELETE /api/admin/join-applications/:id — Admin
exports.deleteApplication = async (req, res, next) => {
  try {
    await JoinApplication.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return successResponse(res, null, 'Deleted');
  } catch (err) {
    next(err);
  }
};
