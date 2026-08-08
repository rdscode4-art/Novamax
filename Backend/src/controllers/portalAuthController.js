const PortalUser = require('../models/PortalUser');
const generateToken = require('../utils/generateToken');
const { successResponse } = require('../utils/response');

// @POST /api/portal/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const user = await PortalUser.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    if (!user.isActive)
      return res.status(401).json({ success: false, message: 'Account disabled' });

    const token = generateToken(user._id);

    res.cookie('portalToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, {
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        idCardUrl: user.idCardUrl,
        joiningLetterUrl: user.joiningLetterUrl
      },
    }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

// @GET /api/portal/me
exports.getMe = async (req, res, next) => {
  try {
    return successResponse(res, req.portalUser, 'Portal User profile');
  } catch (err) {
    next(err);
  }
};

// @POST /api/portal/logout
exports.logout = (req, res) => {
  res.clearCookie('portalToken');
  return successResponse(res, null, 'Logged out');
};
