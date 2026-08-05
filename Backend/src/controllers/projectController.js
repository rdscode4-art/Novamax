const Project = require('../models/Project');
const { successResponse, paginatedResponse } = require('../utils/response');

// @GET /api/projects - Public: get all active projects
exports.getProjects = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, featured } = req.query;
    const filter = {};
    
    // Public route: only show active by default
    if (req.originalUrl.startsWith('/api/admin')) {
      if (status) filter.status = status;
    } else {
      filter.status = 'active';
    }
    
    if (featured === 'true') filter.featured = true;

    const total = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .sort({ sortOrder: 1, createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return paginatedResponse(res, projects, total, page, limit, 'Projects fetched');
  } catch (err) {
    next(err);
  }
};

// @POST /api/admin/projects - Admin: create project
exports.createProject = async (req, res, next) => {
  try {
    const { serialNumber, title, description, icon, footerText, color, status, featured, sortOrder } = req.body;
    
    const project = await Project.create({
      serialNumber,
      title,
      description,
      icon,
      footerText,
      color,
      status: status || 'active',
      featured: featured || false,
      sortOrder: sortOrder || 0,
    });

    return successResponse(res, project, 'Project created', 201);
  } catch (err) {
    next(err);
  }
};

// @PUT /api/admin/projects/:id - Admin: update project
exports.updateProject = async (req, res, next) => {
  try {
    const { serialNumber, title, description, icon, footerText, color, status, featured, sortOrder } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { serialNumber, title, description, icon, footerText, color, status, featured, sortOrder },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    return successResponse(res, project, 'Project updated');
  } catch (err) {
    next(err);
  }
};

// @DELETE /api/admin/projects/:id - Admin: delete project
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    return successResponse(res, null, 'Project deleted');
  } catch (err) {
    next(err);
  }
};
