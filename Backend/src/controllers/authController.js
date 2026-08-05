const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');
const { successResponse } = require('../utils/response');

// @POST /api/admin/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    if (!admin.isActive)
      return res.status(401).json({ success: false, message: 'Account disabled' });

    await Admin.updateOne({ _id: admin._id }, { lastLogin: new Date() });

    const token = generateToken(admin._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, {
      token,
      admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

// @GET /api/admin/me
exports.getMe = async (req, res, next) => {
  try {
    return successResponse(res, req.admin, 'Admin profile');
  } catch (err) {
    next(err);
  }
};

// @PUT /api/admin/me
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { name, email },
      { new: true, runValidators: true }
    );
    return successResponse(res, admin, 'Profile updated');
  } catch (err) {
    next(err);
  }
};

// @POST /api/admin/logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  return successResponse(res, null, 'Logged out');
};

// @PUT /api/admin/change-password
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin._id).select('+password');

    if (!(await admin.matchPassword(currentPassword)))
      return res.status(400).json({ success: false, message: 'Current password incorrect' });

    admin.password = newPassword;
    await admin.save();
    return successResponse(res, null, 'Password changed');
  } catch (err) {
    next(err);
  }
};
