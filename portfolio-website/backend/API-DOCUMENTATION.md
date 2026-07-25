# 📡 Portfolio Backend API Documentation

**Base URL**: `http://localhost:5000`

---

## 📑 Table of Contents

1. [Authentication](#authentication)
2. [Contact Endpoints](#contact-endpoints)
3. [Project Endpoints](#project-endpoints)
4. [Admin Endpoints](#admin-endpoints)
5. [Response Format](#response-format)
6. [Error Codes](#error-codes)

---

## 🔐 Authentication

Most admin endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Login Endpoint

**POST** `/api/auth/login`

Login to get JWT token.

**Request Body:**
```json
{
  "email": "tewahidohaimanot241@gmail.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "name": "Tewahido Haimanot",
      "email": "tewahidohaimanot241@gmail.com"
    }
  }
}
```

---

## 📧 Contact Endpoints

### Send Contact Message

**POST** `/api/contact/send`

**Authentication**: None (Public)

Send a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! I will get back to you soon.",
  "data": {
    "id": 5,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry"
  }
}
```

### Get All Contacts (Admin)

**GET** `/api/contact/all`

**Authentication**: Required

**Query Parameters:**
- `status` (optional): Filter by status (`unread`, `read`, `archived`)
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "I would like to discuss...",
      "status": "unread",
      "created_at": "2026-07-24T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 50,
    "offset": 0
  }
}
```

### Update Contact Status (Admin)

**PUT** `/api/contact/:id/status`

**Authentication**: Required

**Request Body:**
```json
{
  "status": "read"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact status updated successfully"
}
```

### Delete Contact (Admin)

**DELETE** `/api/contact/:id`

**Authentication**: Required

**Response:**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

---

## 🚀 Project Endpoints

### Get All Projects

**GET** `/api/projects`

**Authentication**: None (Public)

**Query Parameters:**
- `category` (optional): Filter by category (`fullstack`, `frontend`, `backend`, `all`)
- `featured` (optional): Filter featured projects (`true`/`false`)
- `limit` (optional): Number of results (default: 50)

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 1,
      "title": "E-Commerce Platform",
      "description": "Full-stack e-commerce solution...",
      "category": "fullstack",
      "featured": true,
      "image": "🛒",
      "imageColor": "gradient-1",
      "technologies": ["React", "Node.js", "MongoDB"],
      "highlights": ["Secure Payment", "Real-time Updates"],
      "metrics": {
        "users": "1000+",
        "performance": "95/100"
      },
      "github": "https://github.com/...",
      "demo": "https://demo.com",
      "year": "2025",
      "created_at": "2026-07-24T10:00:00.000Z"
    }
  ]
}
```

### Get Single Project

**GET** `/api/projects/:id`

**Authentication**: None (Public)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "E-Commerce Platform",
    ...
  }
}
```

### Create Project (Admin)

**POST** `/api/projects`

**Authentication**: Required

**Request Body:**
```json
{
  "title": "New Project",
  "description": "Project description here...",
  "category": "fullstack",
  "featured": true,
  "image": "🚀",
  "imageColor": "gradient-1",
  "technologies": ["React", "Node.js"],
  "highlights": ["Feature 1", "Feature 2"],
  "metrics": {
    "users": "500+",
    "performance": "98/100"
  },
  "github": "https://github.com/...",
  "demo": "https://demo.com",
  "year": "2026"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": 7
  }
}
```

### Update Project (Admin)

**PUT** `/api/projects/:id`

**Authentication**: Required

**Request Body:** Same as Create Project

**Response:**
```json
{
  "success": true,
  "message": "Project updated successfully"
}
```

### Delete Project (Admin)

**DELETE** `/api/projects/:id`

**Authentication**: Required

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## 👤 Admin Endpoints

All admin endpoints require authentication.

### Get Dashboard Statistics

**GET** `/api/admin/stats`

**Authentication**: Required

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalContacts": 25,
      "unreadContacts": 10,
      "totalProjects": 6,
      "featuredProjects": 3,
      "recentContacts": 5
    },
    "contactsByStatus": {
      "unread": 10,
      "read": 12,
      "archived": 3
    },
    "projectsByCategory": {
      "fullstack": 3,
      "frontend": 1,
      "backend": 2
    }
  }
}
```

### Get Recent Contacts

**GET** `/api/admin/contacts/recent`

**Authentication**: Required

**Query Parameters:**
- `limit` (optional): Number of results (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 25,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "subject": "Collaboration",
      "message": "Let's work together...",
      "status": "unread",
      "created_at": "2026-07-24T12:00:00.000Z"
    }
  ]
}
```

### Get Admin Profile

**GET** `/api/admin/profile`

**Authentication**: Required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Tewahido Haimanot",
    "email": "tewahidohaimanot241@gmail.com",
    "created_at": "2026-07-01T10:00:00.000Z"
  }
}
```

### Update Admin Profile

**PUT** `/api/admin/profile`

**Authentication**: Required

**Request Body:**
```json
{
  "name": "Tewahido Haimanot",
  "email": "tewahidohaimanot241@gmail.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

### Change Password

**PUT** `/api/auth/change-password`

**Authentication**: Required

**Request Body:**
```json
{
  "currentPassword": "Admin@123",
  "newPassword": "NewSecure@Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Verify Token

**GET** `/api/auth/verify`

**Authentication**: Required

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "admin": {
      "id": 1,
      "email": "tewahidohaimanot241@gmail.com",
      "name": "Tewahido Haimanot"
    }
  }
}
```

---

## 📋 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [ ... ] // Optional validation errors
}
```

---

## ⚠️ Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request / Validation error |
| 401 | Unauthorized / Invalid credentials |
| 404 | Resource not found |
| 500 | Internal server error |

---

## 🔒 Security

- All passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- CORS is enabled for frontend origin
- Input validation on all endpoints
- SQL injection prevention with parameterized queries

---

## 📝 Example Usage with JavaScript

### Send Contact Form

```javascript
const sendMessage = async (formData) => {
  const response = await fetch('http://localhost:5000/api/contact/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  
  return await response.json();
};
```

### Admin Login

```javascript
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem('token', data.data.token);
  }
  
  return data;
};
```

### Get Projects with Authentication

```javascript
const getProjects = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:5000/api/projects', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return await response.json();
};
```

---

## 🧪 Testing with Postman

1. **Import Collection**: Use the endpoints above
2. **Set Environment Variables**:
   - `base_url`: http://localhost:5000
   - `token`: Your JWT token after login
3. **Test Authentication**: Login first to get token
4. **Use Token**: Add to Authorization header for protected routes

---

## 📞 Support

For issues or questions:
- Email: tewahidohaimanot241@gmail.com
- GitHub: https://github.com/tewahidohaimanot

---

**Last Updated**: July 24, 2026
**API Version**: 1.0.0
