const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: [true, 'Serial number is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
  },
  icon: {
    type: String,
    required: [true, 'Icon emoji is required'],
    default: '💊',
  },
  footerText: {
    type: String,
    required: [true, 'Footer text is required'],
    trim: true,
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    default: '#1a3a6b',
  },
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

module.exports = mongoose.model('Project', projectSchema);
