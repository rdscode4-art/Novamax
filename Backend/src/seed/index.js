require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const dns = require('dns');
const Admin = require('../models/Admin');
const Hospital = require('../models/Hospital');
const Gallery = require('../models/Gallery');
const NGOVolunteer = require('../models/NGOVolunteer');
const Project = require('../models/Project');

// Use Google DNS to resolve SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
  console.log('✅ MongoDB connected for seeding');
};

const hospitals = [
  { name: 'MAX Super Speciality Hospital', category: 'Hospital', location: 'Dwarka, Delhi', state: 'Delhi', address: 'Sector 14, Dwarka, New Delhi - 110075', facilities: ['ICU', 'Emergency 24/7', 'Operation Theater'], image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80', discount: 'Upto 40% Off', featured: true },
  { name: 'Fortis Hospital', category: 'Hospital', location: 'Bannerghatta, Bangalore', state: 'Karnataka', address: 'Bannerghatta Road, Bangalore - 560076', facilities: ['Cardiology', 'Neurology', '24/7 Pharmacy'], image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80', discount: 'Upto 40% Off', featured: true },
  { name: 'Apollo Hospitals', category: 'Hospital', location: 'Jubilee Hills, Hyderabad', state: 'Telangana', address: 'Jubilee Hills, Road No 36, Hyderabad - 500033', facilities: ['Oncology', 'Cardiology', 'Ortho'], image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80', discount: 'Upto 35% Off', featured: true },
  { name: 'AIIMS', category: 'Hospital', location: 'Ansari Nagar, Delhi', state: 'Delhi', address: 'Ansari Nagar East, New Delhi - 110029', facilities: ['All Specialities', 'Research', 'Emergency'], image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80', discount: 'Upto 30% Off' },
  { name: 'Narayana Health', category: 'Hospital', location: 'Bommasandra, Bangalore', state: 'Karnataka', address: 'Bommasandra Industrial Area, Bangalore', facilities: ['Cardiac', 'Cancer Care', 'Transplant'], image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80', discount: 'Upto 30% Off' },
  { name: 'KIMS Hospital', category: 'Hospital', location: 'Secunderabad, Hyderabad', state: 'Telangana', address: 'Minister Road, Secunderabad - 500003', facilities: ['Multi Speciality', 'Emergency', 'ICU'], image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&q=80', discount: 'Upto 30% Off' },
  { name: 'Sharma Dental Clinic', category: 'Doctor Clinic', location: 'Andheri West, Mumbai', state: 'Maharashtra', address: 'Andheri West, Near Metro Station, Mumbai - 400053', facilities: ['Root Canal', 'Implants', 'Teeth Whitening'], image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80', discount: '20% Off on Consultation' },
  { name: 'Apollo Pharmacy', category: 'Medical Store', location: 'Jubilee Hills, Hyderabad', state: 'Telangana', address: 'Jubilee Hills, Road No 36, Hyderabad - 500033', facilities: ['All Medicines', 'Home Delivery', '24/7 Open'], image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80', discount: 'Flat 15% Off' },
  { name: 'Dr. Lal PathLabs', category: 'Diagnosis Center', location: 'Connaught Place, Delhi', state: 'Delhi', address: 'Connaught Place, New Delhi - 110001', facilities: ['Blood Test', 'Covid Testing', 'Full Body Checkup'], image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80', discount: 'Upto 30% Off' },
  { name: 'Vision Imaging Center', category: 'X-Ray / Ultrasound', location: 'Koregaon Park, Pune', state: 'Maharashtra', address: 'Koregaon Park, Pune - 411001', facilities: ['Digital X-Ray', '3D Ultrasound', 'MRI Scan'], image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80', discount: '25% Off on Scans' },
];

const galleryItems = [
  { title: 'Medical Camp - Rural Bihar', category: 'Medical Camps', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80', featured: true },
  { title: 'Free Medicine Distribution', category: 'Free Medicine Distribution', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80', featured: true },
  { title: 'Hospital Partnership Event', category: 'Hospital Activities', image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80' },
  { title: 'Health Awareness Drive', category: 'Health Awareness', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80' },
  { title: 'NGO Annual Meet', category: 'NGO Events', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80' },
  { title: 'Doctor Meet & Greet', category: 'Doctor Meet', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80' },
];

const volunteers = [
  { name: 'Dr. Ramesh Kumar', designation: 'National President', level: 'National Level', location: 'New Delhi, India', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', contact: 'contact@novamax.org', featured: true },
  { name: 'Sunita Sharma', designation: 'State Coordinator', level: 'State Level', location: 'Uttar Pradesh', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', contact: 'up@novamax.org' },
  { name: 'Rajan Mehta', designation: 'District Volunteer Head', level: 'District Level', location: 'Lucknow, UP', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', contact: 'lucknow@novamax.org' },
];

const projects = [
  { serialNumber: '01', title: '10/- RUPEES MEDICINE CENTRE', description: 'Quality medicines available at just ₹10 to make healthcare affordable for all.', icon: '💊', footerText: 'Affordable Medicines • Better Health', color: '#1a3a6b', sortOrder: 1, featured: true },
  { serialNumber: '02', title: 'HEALTH AND WELLNESS PROGRAM', description: 'Promoting a healthier lifestyle through awareness, fitness, nutrition and regular checkups.', icon: '🧘‍♀️', footerText: 'Healthy Living • Happy Life', color: '#057a55', sortOrder: 2, featured: true },
  { serialNumber: '03', title: 'AI HEALTH CARD', description: 'Smart digital health cards powered by AI for instant access to your medical history.', icon: '🤖', footerText: 'Smart Healthcare • Instant Access', color: '#ea580c', sortOrder: 3, featured: true },
  { serialNumber: '04', title: '24x7 TELEMEDICINE', description: 'Get online consultations from top doctors anytime, anywhere for immediate care.', icon: '🩺', footerText: 'Expert Doctors • 24/7 Availability', color: '#7c3aed', sortOrder: 4 },
  { serialNumber: '05', title: 'MOBILE MEDICAL VAN', description: 'Bringing healthcare to your doorstep with fully equipped mobile medical clinics.', icon: '🚐', footerText: 'Healthcare at Doorstep • Fast Response', color: '#0891b2', sortOrder: 5 },
  { serialNumber: '06', title: 'DIGITAL MEDICAL RECORDS', description: 'Securely store and manage all your medical records digitally for easy sharing.', icon: '📋', footerText: 'Secure Storage • Easy Management', color: '#d97706', sortOrder: 6 },
  { serialNumber: '07', title: 'NOVAMAX DIGITAL CLINIC', description: 'State-of-the-art digital clinics equipped with modern diagnostic technologies.', icon: '🏥', footerText: 'Modern Diagnostics • Quality Care', color: '#e11d48', sortOrder: 7 },
  { serialNumber: '08', title: 'FREE HEALTH CAMPS', description: 'Organizing regular health checkup camps in rural areas to provide free medical advice.', icon: '🩺', footerText: 'Next Initiative • Coming Soon', color: '#2f7a35', sortOrder: 8 },
  { serialNumber: '09', title: 'MATERNITY SUPPORT', description: 'Ensuring safe motherhood by providing essential medical care and nutritional support.', icon: '🤱', footerText: 'Mother & Child Care • Better Future', color: '#0ea5e9', sortOrder: 9 },
];

const seed = async () => {
  try {
    await connectDB();

    // Clear existing
    await Promise.all([
      Admin.deleteMany({}),
      Hospital.deleteMany({}),
      Gallery.deleteMany({}),
      NGOVolunteer.deleteMany({}),
      Project.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed Admin
    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@novamaxfoundation.org',
      password: 'Admin@123',
      role: 'superadmin',
    });
    console.log('✅ Admin seeded');

    // Seed Hospitals (use create to trigger pre-save slug generation)
    for (const h of hospitals) {
      await Hospital.create(h);
    }
    console.log(`✅ ${hospitals.length} hospitals seeded`);

    // Seed Gallery
    await Gallery.insertMany(galleryItems);
    console.log(`✅ ${galleryItems.length} gallery items seeded`);

    // Seed Volunteers
    await NGOVolunteer.insertMany(volunteers);
    console.log(`✅ ${volunteers.length} volunteers seeded`);

    // Seed Projects
    await Project.insertMany(projects);
    console.log(`✅ ${projects.length} projects seeded`);

    console.log('🎉 Database seeded successfully!');
    console.log('📧 Admin Email: admin@novamaxfoundation.org');
    console.log('🔑 Admin Password: Admin@123\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
