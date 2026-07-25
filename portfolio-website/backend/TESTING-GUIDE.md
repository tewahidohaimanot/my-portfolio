# 🧪 Backend Testing Guide

Quick guide to test your Portfolio Backend API.

---

## ⚡ Quick Start

### 1. Start Backend Server

```bash
cd portfolio-website/backend
npm run dev
```

You should see:
```
🚀 Portfolio Backend Server Started
📍 Environment: development
🌐 Server URL: http://localhost:5000
✅ Database connected successfully
✅ Database tables created/verified successfully
```

---

## 🔍 Testing Methods

### Option 1: Browser (Simple GET Requests)

Open in browser:

1. **Health Check**
   ```
   http://localhost:5000/api/health
   ```

2. **Get All Projects**
   ```
   http://localhost:5000/api/projects
   ```

3. **API Info**
   ```
   http://localhost:5000/
   ```

### Option 2: PowerShell (Windows)

#### Test Health Check
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" | Select-Object -Expand Content
```

#### Test Contact Form
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    subject = "Test Subject"
    message = "This is a test message"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/contact/send" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" | Select-Object -Expand Content
```

#### Test Admin Login
```powershell
$body = @{
    email = "tewahidohaimanot241@gmail.com"
    password = "Admin@123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" | Select-Object -Expand Content
```

### Option 3: Postman (Recommended)

Download Postman: https://www.postman.com/downloads/

#### Test Collection

**1. Health Check**
- Method: GET
- URL: `http://localhost:5000/api/health`

**2. Send Contact Message**
- Method: POST
- URL: `http://localhost:5000/api/contact/send`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project opportunity."
}
```

**3. Admin Login**
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "email": "tewahidohaimanot241@gmail.com",
  "password": "Admin@123"
}
```

Copy the `token` from response!

**4. Get All Contacts (Admin)**
- Method: GET
- URL: `http://localhost:5000/api/contact/all`
- Headers: 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_HERE`

**5. Get Dashboard Stats (Admin)**
- Method: GET
- URL: `http://localhost:5000/api/admin/stats`
- Headers: 
  - `Authorization: Bearer YOUR_TOKEN_HERE`

**6. Create Project (Admin)**
- Method: POST
- URL: `http://localhost:5000/api/projects`
- Headers: 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_HERE`
- Body (raw JSON):
```json
{
  "title": "Test Project",
  "description": "This is a test project created via API",
  "category": "fullstack",
  "featured": true,
  "image": "🚀",
  "imageColor": "gradient-1",
  "technologies": ["React", "Node.js", "MySQL"],
  "highlights": ["Feature 1", "Feature 2", "Feature 3"],
  "metrics": {
    "users": "100+",
    "performance": "95/100",
    "uptime": "99.9%"
  },
  "github": "https://github.com/tewahidohaimanot/test-project",
  "demo": null,
  "year": "2026"
}
```

---

## 📊 Expected Results

### ✅ Success Responses

#### Health Check
```json
{
  "success": true,
  "status": "OK",
  "message": "Portfolio Backend API is running"
}
```

#### Contact Form Sent
```json
{
  "success": true,
  "message": "Message sent successfully! I will get back to you soon.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry"
  }
}
```

#### Login Success
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

### ❌ Error Responses

#### Invalid Credentials
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

#### Missing Token
```json
{
  "success": false,
  "message": "Not authorized, no token provided"
}
```

#### Validation Error
```json
{
  "success": false,
  "message": "Validation errors",
  "errors": [
    {
      "msg": "Email is required",
      "param": "email"
    }
  ]
}
```

---

## 🗄️ Database Verification

Check if data is saved correctly:

### Using MySQL Workbench

```sql
-- Check contacts
SELECT * FROM contacts ORDER BY created_at DESC;

-- Check projects
SELECT * FROM projects ORDER BY created_at DESC;

-- Check admin
SELECT id, name, email, created_at FROM admins;
```

### Using MySQL Command Line

```bash
mysql -u root -p
```

```sql
USE portfolio_db;
SHOW TABLES;
SELECT * FROM contacts;
SELECT * FROM projects;
SELECT id, name, email FROM admins;
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Server won't start
**Error**: `Cannot find module 'express'`
**Solution**: Install dependencies
```bash
cd backend
npm install
```

### Issue 2: Database connection failed
**Error**: `ER_ACCESS_DENIED_ERROR`
**Solution**: Check `.env` file
- Verify `DB_PASSWORD` is correct
- Ensure MySQL is running

### Issue 3: Port already in use
**Error**: `EADDRINUSE: address already in use :::5000`
**Solution**: Change port in `.env`
```env
PORT=5001
```

### Issue 4: CORS error in frontend
**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`
**Solution**: Check `FRONTEND_URL` in `.env`
```env
FRONTEND_URL=http://localhost:5173
```

### Issue 5: Email not sending
**Note**: Email is optional. Contact form will work without it!
**Solution**: 
1. Generate Gmail App Password
2. Update `EMAIL_PASSWORD` in `.env`
3. Or just skip email for now (it's optional)

---

## ✅ Testing Checklist

- [ ] Backend server starts successfully
- [ ] Health check returns OK
- [ ] Contact form accepts submissions
- [ ] Data saved in database
- [ ] Admin login works
- [ ] Protected routes require authentication
- [ ] Frontend can fetch projects
- [ ] Frontend contact form connects to backend

---

## 📝 Test Data Examples

### Sample Contact Messages

```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "subject": "Website Development",
  "message": "I need help building a modern website for my business."
}
```

```json
{
  "name": "Bob Smith",
  "email": "bob@techcorp.com",
  "subject": "Full Stack Position",
  "message": "We have an opening for a Full Stack Developer role."
}
```

### Sample Projects

```json
{
  "title": "Task Manager App",
  "description": "A productivity app for managing daily tasks and projects",
  "category": "fullstack",
  "featured": true,
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "highlights": ["Real-time sync", "Offline mode", "Team collaboration"],
  "metrics": {"users": "500+", "rating": "4.8/5"},
  "github": "https://github.com/...",
  "year": "2026"
}
```

---

## 🚀 Next Steps

1. ✅ Test all endpoints manually
2. ✅ Verify database entries
3. ✅ Test frontend integration
4. 🔜 Build admin dashboard (optional)
5. 🔜 Deploy to production

---

## 📞 Need Help?

If something isn't working:

1. Check server console for errors
2. Verify `.env` configuration
3. Ensure MySQL is running
4. Check the API documentation
5. Review error messages carefully

---

**Happy Testing!** 🎉
