// Format date to readable string
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Sanitize input to prevent XSS
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Generate random string
const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Pagination helper
const paginate = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return { limit: parseInt(limit), offset };
};

// Success response formatter
const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data
  };
};

// Error response formatter
const errorResponse = (message = 'Error occurred', errors = null) => {
  const response = {
    success: false,
    message
  };
  if (errors) {
    response.errors = errors;
  }
  return response;
};

module.exports = {
  formatDate,
  sanitizeInput,
  generateRandomString,
  paginate,
  successResponse,
  errorResponse
};
