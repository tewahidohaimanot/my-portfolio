# 🆓 FREE Backend Deployment Guide

## Option 1: Render.com (RECOMMENDED)

### Why Render?
- ✅ Completely free (no credit card needed)
- ✅ 750 free hours/month (24/7 for 1 app)
- ✅ Auto-deploys from GitHub
- ✅ Easy setup (5-10 minutes)
- ✅ Your code works without changes

---

## Step-by-Step: Deploy Backend to Render

### Step 1: Sign Up
1. Go to https://render.com
2. Click "Get Started"
3. Sign up with your GitHub account

### Step 2: Create Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect Account" to link GitHub
4. Find and select your `my-portfolio` repository
5. Click "Connect"

### Step 3: Configure Service
Fill in these settings:

**Name:** `my-portfolio-backend`

**Root Directory:** `portfolio-website/backend`

**Environment:** `Node`

**Region:** Choose closest to you

**Branch:** `master`

**Build Command:** `npm install`

**Start Command:** `node server.js`

**Instance Type:** Select **"Free"**

### Step 4: Add Environment Variables
Click "Advanced" and add these:

```
NODE_ENV=production
PORT=5001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=your-vercel-url-here

# Database (add after Step 5)
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=portfolio_db
```

### Step 5: Set Up Free MySQL Database

**Option A: FreeSQLDatabase.com**
1. Go to https://www.freesqldatabase.com/
2. Sign up for free account
3. Create new database
4. Copy credentials and add to Render environment variables

**Option B: db4free.net**
1. Go to https://db4free.net/
2. Sign up (no credit card needed)
3. Create database
4. Copy credentials and add to Render

**Option C: Switch to PostgreSQL (Render provides it free)**
1. In Render dashboard, click "New +" → "PostgreSQL"
2. Name: `portfolio-db`
3. Select "Free" tier
4. Click "Create Database"
5. Copy connection string
6. Update your backend code to use PostgreSQL instead of MySQL

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. Your backend will be live at: `https://my-portfolio-backend.onrender.com`

### Step 7: Test Your Backend
Visit in browser:
```
https://your-app-name.onrender.com/health
```

You should see: `{"status":"OK","timestamp":"..."}`

---

## Update Frontend to Use Live Backend

After backend is deployed, update these 3 files:

### 1. `src/components/Contact/Contact.jsx`
Find line ~25:
```javascript
// OLD
const API_URL = 'http://localhost:5001/api/contact/send';

// NEW
const API_URL = 'https://your-app-name.onrender.com/api/contact/send';
```

### 2. `src/pages/Admin/Login.jsx`
Find line ~30:
```javascript
// OLD
const response = await fetch('http://localhost:5001/api/auth/login', {

// NEW
const response = await fetch('https://your-app-name.onrender.com/api/auth/login', {
```

### 3. `src/pages/Admin/Dashboard.jsx`
Find line ~30:
```javascript
// OLD
const API_BASE_URL = 'http://localhost:5001/api/admin';

// NEW
const API_BASE_URL = 'https://your-app-name.onrender.com/api/admin';
```

**Then:**
1. Commit changes: `git add .` → `git commit -m "Update API URLs for production"`
2. Push to GitHub: `git push`
3. Vercel will auto-deploy your updated frontend

---

## Important Notes

### ⚠️ Render Free Tier Limitations
- App sleeps after 15 minutes of inactivity
- First request after sleep takes 30-50 seconds to wake up
- 750 hours/month (enough for 24/7)

### 💡 To Keep App Awake (Optional)
Use free service like UptimeRobot to ping your backend every 5 minutes:
1. Go to https://uptimerobot.com
2. Add monitor for your backend URL
3. Set interval to 5 minutes

---

## Alternative: Deploy Backend to Vercel (Serverless)

If you prefer Vercel for everything:

### Step 1: Create Serverless Structure
Your backend needs to be restructured for Vercel's serverless format.

Would you like me to convert your backend to work on Vercel? 
(This requires code changes but everything stays free)

---

## Troubleshooting

### Backend won't start on Render
- Check logs in Render dashboard
- Verify all environment variables are set
- Make sure `PORT` is set to `5001` or remove it (Render auto-assigns)

### Database connection fails
- Verify database credentials in environment variables
- Check if database host allows remote connections
- Try using PostgreSQL instead (easier on Render)

### CORS errors
- Make sure `FRONTEND_URL` environment variable is set correctly
- Should be your Vercel URL: `https://your-site.vercel.app`

---

## 🎯 Quick Checklist

- [ ] Render account created
- [ ] Web service deployed
- [ ] Database set up (MySQL or PostgreSQL)
- [ ] Environment variables added
- [ ] Backend is live and accessible
- [ ] Frontend API URLs updated
- [ ] Changes pushed to GitHub
- [ ] Vercel auto-deployed frontend
- [ ] Test contact form on live site
- [ ] Test admin login on live site

---

## Need Help?

1. **Check Render logs:** Dashboard → Your Service → Logs
2. **Test endpoints:** Use your browser or Postman
3. **Verify environment variables:** Make sure all are set correctly
4. **Check database:** Ensure it's accessible from Render's servers

---

## Summary

**Free Services Used:**
- ✅ GitHub (code hosting) - FREE
- ✅ Vercel (frontend) - FREE
- ✅ Render (backend) - FREE
- ✅ FreeSQLDatabase or db4free (MySQL) - FREE

**Total Cost: $0/month** 🎉

**Live in: 15-20 minutes**
