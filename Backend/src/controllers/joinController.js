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

// @POST /api/admin/join-applications/:id/approve — Admin
exports.approveApplication = async (req, res, next) => {
  try {
    const app = await JoinApplication.findById(req.params.id);
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
    
    // Auto-generate a password (e.g., Novamax@123 or something random)
    const generatedPassword = Math.random().toString(36).slice(-8);

    const portalUser = await PortalUser.create({
      email: app.email,
      password: generatedPassword,
      fullName: app.fullName,
      role: app.formType === 'volunteer' ? 'volunteer' : 'subadmin',
      referenceId: app._id,
      referenceModel: 'JoinApplication',
      idCardUrl,
      joiningLetterUrl
    });

    // Here you would typically send an email with the generatedPassword, idCard, and joiningLetter
    // For now, we will return the credentials in the response (or assume a mail service is implemented).

    return successResponse(res, { application: app, user: portalUser, generatedPassword }, 'Application approved and Portal User created');
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
