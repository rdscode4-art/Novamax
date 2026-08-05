const Certificate = require('../models/Certificate');
const { successResponse } = require('../utils/response');

exports.getCertificates = async (req, res, next) => {
  try {
    const certs = await Certificate.find().sort({ sortOrder: 1, createdAt: -1 });
    return successResponse(res, certs);
  } catch (err) {
    next(err);
  }
};

exports.createCertificate = async (req, res, next) => {
  try {
    if (req.file) req.body.fileUrl = `/uploads/${req.file.filename}`;
    const cert = await Certificate.create(req.body);
    return successResponse(res, cert, 'Certificate added successfully', 201);
  } catch (err) {
    next(err);
  }
};

exports.updateCertificate = async (req, res, next) => {
  try {
    if (req.file) req.body.fileUrl = `/uploads/${req.file.filename}`;
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cert) return res.status(404).json({ success: false, message: 'Not found' });
    return successResponse(res, cert, 'Certificate updated');
  } catch (err) {
    next(err);
  }
};

exports.deleteCertificate = async (req, res, next) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ success: false, message: 'Not found' });
    return successResponse(res, null, 'Certificate deleted');
  } catch (err) {
    next(err);
  }
};
