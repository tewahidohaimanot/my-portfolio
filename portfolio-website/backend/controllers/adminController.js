const pool = require('../config/database');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    // Get total contacts
    const [[{ totalContacts }]] = await pool.query(
      'SELECT COUNT(*) as totalContacts FROM contacts'
    );

    // Get unread contacts
    const [[{ unreadContacts }]] = await pool.query(
      "SELECT COUNT(*) as unreadContacts FROM contacts WHERE status = 'unread'"
    );

    // Get total projects
    const [[{ totalProjects }]] = await pool.query(
      'SELECT COUNT(*) as totalProjects FROM projects'
    );

    // Get featured projects
    const [[{ featuredProjects }]] = await pool.query(
      'SELECT COUNT(*) as featuredProjects FROM projects WHERE featured = true'
    );

    // Get recent contacts (last 7 days)
    const [[{ recentContacts }]] = await pool.query(
      'SELECT COUNT(*) as recentContacts FROM contacts WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );

    // Get contacts by status
    const [contactsByStatus] = await pool.query(`
      SELECT status, COUNT(*) as count 
      FROM contacts 
      GROUP BY status
    `);

    // Get projects by category
    const [projectsByCategory] = await pool.query(`
      SELECT category, COUNT(*) as count 
      FROM projects 
      GROUP BY category
    `);

    res.json({
      success: true,
      data: {
        overview: {
          totalContacts,
          unreadContacts,
          totalProjects,
          featuredProjects,
          recentContacts
        },
        contactsByStatus: contactsByStatus.reduce((acc, item) => {
          acc[item.status] = item.count;
          return acc;
        }, {}),
        projectsByCategory: projectsByCategory.reduce((acc, item) => {
          acc[item.category] = item.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
};

// @desc    Get recent contacts
// @route   GET /api/admin/contacts/recent
// @access  Private (Admin)
const getRecentContacts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const [contacts] = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC LIMIT ?',
      [limit]
    );

    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Get recent contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent contacts'
    });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private (Admin)
const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const [admins] = await pool.query(
      'SELECT id, name, email, created_at FROM admins WHERE id = ?',
      [adminId]
    );

    if (admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      data: admins[0]
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin profile'
    });
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private (Admin)
const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const { name, email } = req.body;

    // Check if email is already taken by another admin
    const [existingAdmin] = await pool.query(
      'SELECT id FROM admins WHERE email = ? AND id != ?',
      [email, adminId]
    );

    if (existingAdmin.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use'
      });
    }

    await pool.query(
      'UPDATE admins SET name = ?, email = ? WHERE id = ?',
      [name, email, adminId]
    );

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Update admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentContacts,
  getAdminProfile,
  updateAdminProfile
};
