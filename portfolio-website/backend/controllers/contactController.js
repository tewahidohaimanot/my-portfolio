const pool = require('../config/database');
const { sendContactEmail } = require('../utils/email');
const { validationResult } = require('express-validator');

// @desc    Send contact form message
// @route   POST /api/contact/send
// @access  Public
const sendContactMessage = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Save to database
    const [result] = await pool.query(
      'INSERT INTO contacts (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject, message, 'unread']
    );

    // Send email notification (optional, will fail silently if email not configured)
    try {
      await sendContactEmail({ name, email, subject, message });
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: {
        id: result.insertId,
        name,
        email,
        subject
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact/all
// @access  Private (Admin)
const getAllContacts = async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM contacts';
    const params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [contacts] = await pool.query(query, params);
    const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM contacts');

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id/status
// @access  Private (Admin)
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    await pool.query('UPDATE contacts SET status = ? WHERE id = ?', [status, id]);

    res.json({
      success: true,
      message: 'Contact status updated successfully'
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM contacts WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact'
    });
  }
};

module.exports = {
  sendContactMessage,
  getAllContacts,
  updateContactStatus,
  deleteContact
};
