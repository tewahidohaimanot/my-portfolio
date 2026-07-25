const express = require('express');
const router = express.Router();
const { 
  sendContactMessage, 
  getAllContacts, 
  updateContactStatus, 
  deleteContact 
} = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/send', validateContact, sendContactMessage);

// Protected routes (Admin only)
router.get('/all', protect, getAllContacts);
router.put('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

module.exports = router;
