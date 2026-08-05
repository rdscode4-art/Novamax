const mongoose = require('mongoose');
const slugify = require('slugify');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hospital name is required'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
    enum: ['Hospital', 'Doctor Clinic', 'Medical Store', 'Diagnosis Center', 'X-Ray / Ultrasound'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  facilities: [{
    type: String,
  }],
  image: {
    type: String,
    default: 'https://via.placeholder.com/600x400?text=Hospital',
  },
  discount: {
    type: String,
    default: 'Available',
  },
  phone: String,
  email: String,
  website: String,
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

hospitalSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Hospital', hospitalSchema);
