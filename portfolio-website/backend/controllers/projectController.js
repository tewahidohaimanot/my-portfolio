const pool = require('../config/database');
const { validationResult } = require('express-validator');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res) => {
  try {
    const { category, featured, limit = 50 } = req.query;

    let query = 'SELECT * FROM projects';
    const params = [];
    const conditions = [];

    if (category && category !== 'all') {
      conditions.push('category = ?');
      params.push(category);
    }

    if (featured === 'true') {
      conditions.push('featured = true');
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(parseInt(limit));

    const [projects] = await pool.query(query, params);

    // Parse JSON fields
    const parsedProjects = projects.map(project => ({
      ...project,
      technologies: JSON.parse(project.technologies || '[]'),
      highlights: JSON.parse(project.highlights || '[]'),
      metrics: JSON.parse(project.metrics || '{}'),
      featured: Boolean(project.featured)
    }));

    res.json({
      success: true,
      count: parsedProjects.length,
      data: parsedProjects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const [projects] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const project = {
      ...projects[0],
      technologies: JSON.parse(projects[0].technologies || '[]'),
      highlights: JSON.parse(projects[0].highlights || '[]'),
      metrics: JSON.parse(projects[0].metrics || '{}'),
      featured: Boolean(projects[0].featured)
    };

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      title,
      description,
      category,
      featured,
      image,
      imageColor,
      technologies,
      highlights,
      metrics,
      github,
      demo,
      year
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO projects 
       (title, description, category, featured, image, image_color, technologies, highlights, metrics, github, demo, year) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        category,
        featured || false,
        image || null,
        imageColor || null,
        JSON.stringify(technologies || []),
        JSON.stringify(highlights || []),
        JSON.stringify(metrics || {}),
        github || null,
        demo || null,
        year || new Date().getFullYear().toString()
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        id: result.insertId
      }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      featured,
      image,
      imageColor,
      technologies,
      highlights,
      metrics,
      github,
      demo,
      year
    } = req.body;

    const [result] = await pool.query(
      `UPDATE projects SET 
       title = ?, description = ?, category = ?, featured = ?, 
       image = ?, image_color = ?, technologies = ?, highlights = ?, 
       metrics = ?, github = ?, demo = ?, year = ?
       WHERE id = ?`,
      [
        title,
        description,
        category,
        featured,
        image,
        imageColor,
        JSON.stringify(technologies || []),
        JSON.stringify(highlights || []),
        JSON.stringify(metrics || {}),
        github,
        demo,
        year,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
