const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { validateProject } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes (Admin only)
router.post('/', protect, validateProject, createProject);
router.put('/:id', protect, validateProject, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
