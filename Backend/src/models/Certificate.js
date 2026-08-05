const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
    default: '🏆'
  },
  badge: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#1a3a6b',
  },
  bg: {
    type: String,
    default: 'rgba(26,58,107,0.07)',
  },
  fileUrl: {
    type: String,
  },
  sortOrder: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
