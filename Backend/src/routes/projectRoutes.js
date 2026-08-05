const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middlewares/auth');

router.get('/', getProjects);                    // Public
router.post('/', protect, createProject);        // Admin
router.put('/:id', protect, updateProject);      // Admin
router.delete('/:id', protect, deleteProject);   // Admin

module.exports = router;
