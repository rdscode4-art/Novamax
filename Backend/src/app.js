const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

const errorHandler = require('./middlewares/errorHandler');

// Routes
const authRoutes = require('./routes/authRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const contactRoutes = require('./routes/contactRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const joinRoutes = require('./routes/joinRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const projectRoutes = require('./routes/projectRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const portalAuthRoutes = require('./routes/portalAuthRoutes');

const app = express();

// Security
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// CORS - allow both frontend and admin panel
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

// Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Novamax API is running', env: process.env.NODE_ENV });
});

// Mount routes
app.use('/api/admin', authRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/contacts', contactRoutes);
app.use('/api/partner-applications', partnerRoutes);
app.use('/api/admin/partner-applications', partnerRoutes);
app.use('/api/join-applications', joinRoutes);
app.use('/api/admin/join-applications', joinRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin/gallery', galleryRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/admin/volunteers', volunteerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin/projects', projectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/admin/certificates', certificateRoutes);
app.use('/api/portal', portalAuthRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Error handler
app.use(errorHandler);

module.exports = app;
