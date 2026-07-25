# 🚀 Portfolio Backend API

Professional Node.js + Express + MySQL backend for portfolio website.

---

## ✨ Features

✅ **Contact Form API** - Handle contact submissions with email notifications  
✅ **Admin Authentication** - Secure JWT-based authentication  
✅ **Project Management** - Full CRUD operations for portfolio projects  
✅ **Admin Dashboard** - Statistics and analytics  
✅ **Input Validation** - Comprehensive validation using express-validator  
✅ **Email Notifications** - Nodemailer integration for contact alerts  
✅ **Security** - Bcrypt password hashing, CORS, SQL injection prevention  

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL 2
- **Authentication**: JWT (jsonwebtoken)
- **Password**: bcryptjs
- **Validation**: express-validator
- **Email**: nodemailer
- **Dev Tool**: nodemon

---

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MySQL connection & table initialization
├── controllers/
│   ├── contactController.js  # Contact form logic
│   ├── authController.js     # Authentication (login, verify, password)
│   ├── projectController.js  # Project CRUD operations
│   └── adminController.js    # Admin dashboard & statistics
├── middleware/
│   ├── auth.js              # JWT verification middleware
│   └── validation.js        # Input validation rules
├── routes/
│   ├── contactRoutes.js     # Contact endpoints
│   ├── authRoutes.js        # Auth endpoints
│   ├── projectRoutes.js     # Project endpoints
│   └── adminRoutes.js       # Admin endpoints
├── utils/
│   ├── email.js             # Email sending functionality
│   └── helpers.js           # Helper functions
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── server.js               # Main server file
├── package.json            # Dependencies
├── API-DOCUMENTATION.md    # Full API docs
├── TESTING-GUIDE.md        # Testing instructions
└── README.md               # This file
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Database

**Install MySQL** if not installed:
- Download: https://dev.mysql.com/downloads/installer/

**Create Database:**
```sql
CREATE DATABASE portfolio_db;
```

### 3. Configure Environment

Update `backend/.env`:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
DB_PORT=3306

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Email (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Admin Credentials
ADMIN_EMAIL=tewahidohaimanot241@gmail.com
ADMIN_PASSWORD=Admin@123
ADMIN_NAME=Tewahido Haimanot

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Start Server

```bash
npm run dev
```

Server will start on http://localhost:5000

---

## 📡 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact/send` | Send contact message |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/auth/login` | Admin login |

### Protected Endpoints (Require JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/verify` | Verify token |
| PUT | `/api/auth/change-password` | Change password |
| GET | `/api/contact/all` | Get all contacts |
| PUT | `/api/contact/:id/status` | Update contact status |
| DELETE | `/api/contact/:id` | Delete contact |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/contacts/recent` | Recent contacts |
| GET | `/api/admin/profile` | Admin profile |
| PUT | `/api/admin/profile` | Update profile |

📚 **Full API Documentation**: See [API-DOCUMENTATION.md](./API-DOCUMENTATION.md)

---

## 🗄️ Database Schema

### Tables

**admins**
- id (INT, PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

**contacts**
- id (INT, PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR)
- subject (VARCHAR)
- message (TEXT)
- status (ENUM: unread, read, archived)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

**projects**
- id (INT, PRIMARY KEY)
- title (VARCHAR)
- description (TEXT)
- category (VARCHAR)
- featured (BOOLEAN)
- image (VARCHAR)
- image_color (VARCHAR)
- technologies (JSON)
- highlights (JSON)
- metrics (JSON)
- github (VARCHAR)
- demo (VARCHAR)
- year (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

---

## 🧪 Testing

### Using Browser
```
http://localhost:5000/api/health
```

### Using PowerShell
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" | Select-Object -Expand Content
```

### Using Postman
See [TESTING-GUIDE.md](./TESTING-GUIDE.md) for detailed instructions.

---

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: express-validator on all inputs
- **SQL Injection Prevention**: Parameterized queries
- **CORS Protection**: Configured for specific origins
- **Environment Variables**: Sensitive data in .env

---

## 📧 Email Configuration (Optional)

The contact form can send email notifications. This is optional!

### Setup Gmail:

1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Update `.env`:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   ```

**Note**: Backend works perfectly without email configuration. Messages are always saved to database.

---

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check credentials in `.env`
- Verify port 3306 is accessible

### Port Already in Use
Change `PORT` in `.env`:
```env
PORT=5001
```

### CORS Errors
Update `FRONTEND_URL` in `.env`:
```env
FRONTEND_URL=http://localhost:5173
```

---

## 📝 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (not yet implemented)
```

---

## 🔄 Frontend Integration

Update frontend Contact component to use API:

```javascript
const response = await fetch('http://localhost:5000/api/contact/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});

const data = await response.json();
```

Frontend automatically updated! ✅

---

## 📈 Future Enhancements

- [ ] Rate limiting
- [ ] Email templates
- [ ] File upload for projects
- [ ] Blog post management
- [ ] Analytics tracking
- [ ] WebSocket for real-time notifications
- [ ] Admin dashboard UI

---

## 📄 License

ISC

---

## 👤 Author

**Tewahido Haimanot**

- Email: tewahidohaimanot241@gmail.com
- GitHub: [@tewahidohaimanot](https://github.com/tewahidohaimanot)
- LinkedIn: [Tewahido Haimanot](https://www.linkedin.com/in/tewahido-haimanot-252562325)

---

## 🙏 Acknowledgments

Built with ❤️ using:
- Express.js
- MySQL
- JWT
- Nodemailer
- bcryptjs

---

**Backend Status**: ✅ Complete and Ready to Use!

For testing instructions, see [TESTING-GUIDE.md](./TESTING-GUIDE.md)  
For API details, see [API-DOCUMENTATION.md](./API-DOCUMENTATION.md)
