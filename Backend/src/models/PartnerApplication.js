const mongoose = require('mongoose');

const partnerApplicationSchema = new mongoose.Schema({
  applicantType: {
    type: String,
    enum: ['doctor', 'hospital', 'pathology', 'diagnostics'],
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  registrationNumber: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  experience: String,
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PartnerApplication', partnerApplicationSchema);
