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

// @POST /api/admin/partner-applications/:id/approve — Admin
exports.approveApplication = async (req, res, next) => {
  try {
    const app = await PartnerApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: 'Not found' });
    if (app.status === 'approved') return res.status(400).json({ success: false, message: 'Already approved' });

    let idCardUrl = null;
    let joiningLetterUrl = null;

    if (req.files) {
      if (req.files.idCard) idCardUrl = `/uploads/${req.files.idCard[0].filename}`;
      if (req.files.joiningLetter) joiningLetterUrl = `/uploads/${req.files.joiningLetter[0].filename}`;
    }

    app.status = 'approved';
    await app.save();

    const PortalUser = require('../models/PortalUser');
    
    // Auto-generate a password
    const generatedPassword = Math.random().toString(36).slice(-8);

    const portalUser = await PortalUser.create({
      email: app.email,
      password: generatedPassword,
      fullName: app.name,
      role: 'partner',
      referenceId: app._id,
      referenceModel: 'PartnerApplication',
      idCardUrl,
      joiningLetterUrl
    });

    return successResponse(res, { application: app, user: portalUser, generatedPassword }, 'Application approved and Portal User created');
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
