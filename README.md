# Novamax Foundation - Full Stack MERN Application

Complete production-ready healthcare membership platform with dynamic APIs, admin panel, and MongoDB database.

## 🏗️ Project Structure

```
novamax/
├── Backend/              # Node.js + Express + MongoDB API
├── vite-project/         # React Frontend (Vite)
└── Admin panel/          # React Admin Dashboard (To be created)
```

---

## 📋 Prerequisites

- **Node.js** v16+ (with npm)
- **MongoDB Atlas** account (or local MongoDB)
- **Git**

---

## 🚀 Quick Start

### 1. **Fix MongoDB Atlas Network Access** ⚠️

Before running the application:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to: **Network Access** → **Add IP Address**
3. Add `0.0.0.0/0` (Allow access from anywhere) OR your specific IP
4. Save and wait 2-3 minutes for changes to propagate

---

### 2. **Backend Setup**

```bash
# Navigate to backend folder
cd Backend

# Install dependencies (if not already installed)
npm install

# Environment variables are already configured in .env file
# MongoDB URI: mongodb+srv://nkkashyap2001:bhoomi1234@cluster0.frywq.mongodb.net/Novamax

# Seed the database with initial data
npm run seed

# Start backend server
npm start
# OR for development with auto-reload
npm run dev
```

**Backend runs on:** `http://localhost:5000`

#### Backend Features:
- ✅ JWT Authentication
- ✅ Image Upload (Multer)
- ✅ Rate Limiting
- ✅ CORS enabled
- ✅ Helmet security
- ✅ Compression
- ✅ Error handling middleware
- ✅ Pagination & Search on all APIs

---

### 3. **Frontend Setup**

```bash
# Navigate to frontend folder
cd vite-project

# Install dependencies (if not already installed)
npm install

# Environment variable is already configured in .env file
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

---

## 📊 Database Models

### 1. **Hospital** (28+ seeded)
- Name, location, address
- Category, specialties, facilities
- Discount offers
- Contact information
- Image, ratings
- Status (active/inactive)

### 2. **Contact** 
- User inquiries from contact form
- Name, email, phone, subject, message
- Status (pending/resolved)

### 3. **PartnerApplication**
- Vendor/Hospital partnership requests
- Organization details
- Business information
- Status (pending/approved/rejected)

### 4. **JoinApplication**
- Membership applications
- Personal & family details
- File attachments
- Status tracking

### 5. **Gallery** (6+ seeded)
- Event photos
- Title, description, category
- Image URLs
- Status & featured flag

### 6. **NGOVolunteer** (10+ seeded)
- Volunteer hierarchy (National → Block level)
- Name, designation, level
- Location, contact information
- Image, status

### 7. **Admin**
- Admin user for authentication
- Email, password (hashed)
- JWT token management

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new admin
POST   /api/auth/login         - Admin login (returns JWT)
GET    /api/auth/me            - Get current admin (protected)
```

### Hospitals
```
GET    /api/hospitals          - Get all hospitals (pagination, search, filters)
GET    /api/hospitals/:id      - Get single hospital
POST   /api/hospitals          - Create hospital (protected)
PUT    /api/hospitals/:id      - Update hospital (protected)
DELETE /api/hospitals/:id      - Delete hospital (protected)
GET    /api/hospitals/search   - Search hospitals by name/location
```

### Contact
```
POST   /api/contact            - Submit contact form
GET    /api/contact            - Get all contacts (protected)
GET    /api/contact/:id        - Get single contact (protected)
PATCH  /api/contact/:id/status - Update status (protected)
DELETE /api/contact/:id        - Delete contact (protected)
```

### Partner Applications
```
POST   /api/partner-applications           - Submit partnership form
GET    /api/partner-applications           - Get all (protected)
GET    /api/partner-applications/:id       - Get single (protected)
PATCH  /api/partner-applications/:id/status - Update status (protected)
DELETE /api/partner-applications/:id       - Delete (protected)
```

### Join Applications
```
POST   /api/join-applications          - Submit join form (multipart/form-data)
GET    /api/join-applications          - Get all (protected)
GET    /api/join-applications/:id      - Get single (protected)
PATCH  /api/join-applications/:id/status - Update status (protected)
DELETE /api/join-applications/:id      - Delete (protected)
```

### Gallery
```
GET    /api/gallery            - Get all gallery items (pagination, filters)
GET    /api/gallery/:id        - Get single item
POST   /api/gallery            - Create item (protected, with image upload)
PUT    /api/gallery/:id        - Update item (protected)
DELETE /api/gallery/:id        - Delete item (protected)
```

### Volunteers
```
GET    /api/volunteers         - Get all volunteers (filters by level)
GET    /api/volunteers/:id     - Get single volunteer
POST   /api/volunteers         - Create volunteer (protected)
PUT    /api/volunteers/:id     - Update volunteer (protected)
DELETE /api/volunteers/:id     - Delete volunteer (protected)
```

### Dashboard Stats
```
GET    /api/admin/dashboard    - Get statistics (protected)
                                Returns: totalMembers, totalHospitals, 
                                healthcareSavings, treatmentsProvided
```

---

## 🎨 Frontend Integration Status

### ✅ Fully Integrated Components
1. **HospitalDirectory** - Fetches from `/api/hospitals`
   - Search functionality
   - Pagination
   - Loading states
   - Error handling

2. **ContactSection** - Submits to `/api/contact`
   - Form validation
   - Success/error messages
   - Form reset after submission

3. **VendorPartnership** - Submits to `/api/partner-applications`
   - File upload support
   - Business info collection

4. **JoinUsForms** - Submits to `/api/join-applications`
   - Multipart form with file upload
   - Family member details
   - Comprehensive validation

5. **OurPartnersSection (NGO Tab)** - Fetches from `/api/volunteers`
   - Level-based filtering
   - Loading states
   - Dynamic volunteer display

6. **GallerySection** - Fetches from `/api/gallery`
   - Auto-scrolling gallery
   - Fallback to default images
   - Status filtering

7. **StatsSection** - Fetches from `/api/admin/dashboard`
   - Dynamic counter animation
   - Real-time statistics
   - Fallback to default values

---

## 🔐 Seed Data

After running `npm run seed`, the database contains:

- **28 Hospitals** across multiple categories (Hospital, Clinic, Medical Store, etc.)
- **6 Gallery Items** (Medical Camps, Events, etc.)
- **10 NGO Volunteers** (National to Block level)
- **1 Admin User**
  - Email: `admin@novamaxfoundation.org`
  - Password: `Admin@123`

---

## 🛠️ Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb+srv://nkkashyap2001:bhoomi1234@cluster0.frywq.mongodb.net/Novamax?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true

JWT_SECRET=novamax_secret_key_2024
JWT_EXPIRE=7d

CLIENT_URL=http://localhost:5173

ADMIN_EMAIL=admin@novamaxfoundation.org
ADMIN_PASSWORD=Admin@123
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing the Application

### 1. Test Backend APIs
```bash
# Get all hospitals
curl http://localhost:5000/api/hospitals

# Search hospitals
curl http://localhost:5000/api/hospitals/search?q=MAX

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","subject":"Test","message":"Hello"}'
```

### 2. Test Frontend
1. Open `http://localhost:5173`
2. Navigate to "Hospitals" section - should show 28 hospitals
3. Use search bar - should filter dynamically
4. Submit contact form - should show success message
5. Check "Join Us" forms - should upload files and submit
6. View gallery - should show dynamic images
7. Check stats section - should animate numbers

---

## 📂 Backend Folder Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Login, register, JWT
│   │   ├── hospitalController.js # Hospital CRUD
│   │   ├── contactController.js  # Contact form
│   │   ├── partnerController.js  # Partnership apps
│   │   ├── joinController.js     # Membership apps
│   │   ├── galleryController.js  # Gallery management
│   │   ├── volunteerController.js# Volunteer CRUD
│   │   └── dashboardController.js# Stats API
│   ├── models/
│   │   ├── Admin.js              # Admin schema
│   │   ├── Hospital.js           # Hospital schema
│   │   ├── Contact.js            # Contact schema
│   │   ├── PartnerApplication.js # Partner schema
│   │   ├── JoinApplication.js    # Join schema
│   │   ├── Gallery.js            # Gallery schema
│   │   ├── NGOVolunteer.js       # Volunteer schema
│   │   └── SiteSettings.js       # Settings schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── hospitalRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── partnerRoutes.js
│   │   ├── joinRoutes.js
│   │   ├── galleryRoutes.js
│   │   ├── volunteerRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middlewares/
│   │   ├── auth.js               # JWT authentication
│   │   ├── errorHandler.js       # Global error handler
│   │   └── upload.js             # Multer file upload
│   ├── utils/
│   │   ├── generateToken.js      # JWT token generator
│   │   └── response.js           # Standard API responses
│   ├── seed/
│   │   └── index.js              # Database seeding script
│   ├── app.js                    # Express app configuration
│   └── server.js                 # Server entry point
├── uploads/                       # Uploaded files storage
├── .env                          # Environment variables
├── .env.example                  # Environment template
└── package.json
```

---

## 🎯 Remaining Work

### Admin Panel (Not Started)
Create `Admin panel/` folder with:
- Login page with JWT authentication
- Dashboard with statistics cards
- CRUD interfaces for all models:
  - Hospitals management
  - Contact inquiries management
  - Partnership applications management
  - Join applications management
  - Gallery management
  - Volunteers management
- Settings page
- Profile management
- Dark mode support
- Responsive design

### Frontend Enhancements
- Admin authentication flow
- Protected routes for admin
- Image upload preview
- Form validation improvements
- Toast notifications
- Loading skeletons
- Error boundaries

---

## ⚠️ Troubleshooting

### MongoDB Connection Error
**Error:** `querySrv ECONNREFUSED` or `MongoNetworkError`

**Solution:**
1. Check MongoDB Atlas Network Access settings
2. Add your IP address: `0.0.0.0/0`
3. Wait 2-3 minutes for changes to apply
4. Verify credentials in `.env` file
5. Try: `ping cluster0.frywq.mongodb.net`

### Backend Not Starting
```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000

# Kill the process if needed (replace PID)
taskkill /PID <PID> /F

# Restart backend
npm start
```

### Frontend Not Connecting to Backend
1. Verify backend is running on `http://localhost:5000`
2. Check `.env` file has `VITE_API_URL=http://localhost:5000/api`
3. Restart Vite dev server: `npm run dev`
4. Check browser console for CORS errors

### File Upload Not Working
1. Ensure `uploads/` folder exists in Backend
2. Check Multer configuration in `src/middlewares/upload.js`
3. Verify form uses `encType="multipart/form-data"`

---

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Update `VITE_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `dist/` folder

### MongoDB Atlas
- Already configured for production use
- Ensure proper IP whitelist settings
- Use connection string with proper authentication

---

## 📞 Support

For issues related to:
- **MongoDB Atlas:** Check Network Access settings
- **Backend:** Verify `.env` configuration and dependencies
- **Frontend:** Ensure `VITE_API_URL` points to running backend

---

## 🏆 Completion Status

### ✅ Completed
- [x] Backend API (100%)
- [x] MongoDB Models (100%)
- [x] JWT Authentication (100%)
- [x] Image Upload Setup (100%)
- [x] Database Seed Script (100%)
- [x] Frontend API Integration (90%)
  - [x] Hospital Directory
  - [x] Contact Form
  - [x] Partnership Form
  - [x] Join Form
  - [x] Gallery Section
  - [x] NGO Volunteers
  - [x] Stats Section

### ⏳ Pending
- [ ] Admin Panel (0%)
- [ ] Image Upload to Cloudinary (optional)
- [ ] Email Notifications (optional)
- [ ] Payment Gateway Integration (future)

---

## 📝 Notes

- All static data has been replaced with dynamic API calls
- Frontend UI remains visually identical to original design
- Backend follows RESTful API conventions
- Proper error handling and validation on all endpoints
- Ready for production deployment
- Scalable architecture for future enhancements

---

**Built with:** Node.js • Express • MongoDB • React • Vite • JWT • Multer
