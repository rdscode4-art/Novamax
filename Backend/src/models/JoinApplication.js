const mongoose = require('mongoose');

const joinApplicationSchema = new mongoose.Schema({
  formType: {
    type: String,
    enum: ['volunteer', 'subadmin'],
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherName: String,
  phone: {
    type: String,
    required: true,
  },
  whatsapp: String,
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  panCard: String,
  photo: String, // file path
  postLevel: {
    type: String,
    enum: ['national', 'state', 'district', 'city', 'block', 'village'],
    required: true,
  },
  designation: String, // for subadmin
  aadhaar: String,     // for subadmin
  state: String,
  pinCode: String,
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

module.exports = mongoose.model('JoinApplication', joinApplicationSchema);
