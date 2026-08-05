const PartnerApplication = require('../models/PartnerApplication');
const { successResponse, paginatedResponse } = require('../utils/response');

// @POST /api/partner-applications — Public
exports.submitApplication = async (req, res, next) => {
  try {
    const { applicantType, name, email, phone, registrationNumber, experience, address } = req.body;

    if (!applicantType || !name || !email || !phone || !address)
      return res.status(400).json({ success: false, message: 'Required fields missing' });

    const app = await PartnerApplication.create({
      applicantType, name, email, phone, registrationNumber, experience, address,
    });
    return successResponse(res, app, 'Application submitted successfully', 201);
  } catch (err) {
    next(err);
  }
};

// @GET /api/admin/partner-applications — Admin
exports.getApplications = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, applicantType, search } = req.query;
    const filter = { isDeleted: false };
    if (status) filter.status = status;
    if (applicantType) filter.applicantType = applicantType;
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];

    const skip = (page - 1) * limit;
    const [apps, total] = await Promise.all([
      PartnerApplication.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      PartnerApplication.countDocuments(filter),
    ]);
    return paginatedResponse(res, apps, total, page, limit);
  } catch (err) {
    next(err);
  }
};

// @PATCH /api/admin/partner-applications/:id — Admin
exports.updateStatus = async (req, res, next) => {
  try {
    const app = await PartnerApplication.findByIdAndUpdate(
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

// @DELETE /api/admin/partner-applications/:id — Admin
exports.deleteApplication = async (req, res, next) => {
  try {
    await PartnerApplication.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return successResponse(res, null, 'Deleted');
  } catch (err) {
    next(err);
  }
};
