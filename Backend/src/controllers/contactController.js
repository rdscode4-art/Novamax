const Contact = require('../models/Contact');
const { successResponse, paginatedResponse } = require('../utils/response');

// @POST /api/contact — Public
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });

    const contact = await Contact.create({ name, email, phone, subject, message });
    return successResponse(res, contact, 'Message sent successfully', 201);
  } catch (err) {
    next(err);
  }
};

// @GET /api/admin/contacts — Admin
exports.getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const filter = { isDeleted: false };
    if (status) filter.status = status;
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];

    const skip = (page - 1) * limit;
    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Contact.countDocuments(filter),
    ]);
    return paginatedResponse(res, contacts, total, page, limit);
  } catch (err) {
    next(err);
  }
};

// @PATCH /api/admin/contacts/:id — Admin (update status)
exports.updateContactStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    return successResponse(res, contact, 'Status updated');
  } catch (err) {
    next(err);
  }
};

// @DELETE /api/admin/contacts/:id — Admin (soft delete)
exports.deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return successResponse(res, null, 'Deleted');
  } catch (err) {
    next(err);
  }
};
