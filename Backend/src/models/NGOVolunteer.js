const mongoose = require('mongoose');

const ngoVolunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['National Level', 'State Level', 'District Level', 'City Level', 'Block Level'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  contact: String,
  phone: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('NGOVolunteer', ngoVolunteerSchema);
