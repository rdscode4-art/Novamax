const Hospital = require('../models/Hospital');
const Contact = require('../models/Contact');
const PartnerApplication = require('../models/PartnerApplication');
const JoinApplication = require('../models/JoinApplication');
const Gallery = require('../models/Gallery');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const { successResponse } = require('../utils/response');

// @GET /api/admin/dashboard
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalHospitals,
      totalContacts,
      newContacts,
      totalPartnerApps,
      pendingPartnerApps,
      totalJoinApps,
      pendingJoinApps,
      totalGallery,
      totalProjects,
      totalCertificates,
    ] = await Promise.all([
      Hospital.countDocuments({ status: 'active' }),
      Contact.countDocuments({ isDeleted: false }),
      Contact.countDocuments({ isDeleted: false, status: 'new' }),
      PartnerApplication.countDocuments({ isDeleted: false }),
      PartnerApplication.countDocuments({ isDeleted: false, status: 'pending' }),
      JoinApplication.countDocuments({ isDeleted: false }),
      JoinApplication.countDocuments({ isDeleted: false, status: 'pending' }),
      Gallery.countDocuments({ status: 'active' }),
      Project.countDocuments({ status: 'active' }),
      Certificate.countDocuments(),
    ]);

    // Recent contacts
    const recentContacts = await Contact.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent applications
    const recentApplications = await JoinApplication.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(5);

    return successResponse(res, {
      // Flat structure for frontend StatsSection
      totalHospitals,
      totalMembers: totalJoinApps,
      healthcareSavings: 10,
      treatmentsProvided: 2,
      // Detailed stats for admin dashboard
      stats: {
        totalHospitals,
        totalContacts,
        newContacts,
        totalPartnerApps,
        pendingPartnerApps,
        totalJoinApps,
        pendingJoinApps,
        totalGallery,
        totalProjects,
        totalCertificates,
      },
      recentContacts,
      recentApplications,
    });
  } catch (err) {
    next(err);
  }
};
