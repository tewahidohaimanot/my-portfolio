const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getRecentContacts,
  getAdminProfile,
  updateAdminProfile
} = require('../controllers/adminController');
const { validateAdminProfile } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// All admin routes are protected
router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/contacts/recent', getRecentContacts);
router.get('/profile', getAdminProfile);
router.put('/profile', validateAdminProfile, updateAdminProfile);

module.exports = router;
