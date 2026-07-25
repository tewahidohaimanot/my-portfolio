# 🚀 Portfolio Deployment Guide

Complete guide to deploy your portfolio website to production.

---

## 📋 **What You'll Deploy**

Your portfolio has **2 parts** that need deployment:

1. **Frontend** (React app) - The website visitors see
2. **Backend** (Node.js API) - The server handling contact forms and admin

---

## 🎯 **Recommended Deployment Strategy**

### **Best Setup (Free Tier Available):**

| Component | Platform | Why |
|-----------|----------|-----|
| **Frontend** | Vercel or Netlify | Fast, free, auto-deploy from Git |
| **Backend** | Railway or Render | Free tier, easy Node.js hosting |
| **Database** | Railway MySQL | Free tier, auto-backup |

---

## 🌐 **Option 1: Vercel (Frontend) + Railway (Backend) [RECOMMENDED]**

This is the **easiest and most popular** setup for React + Node.js apps.

### **Part A: Deploy Frontend to Vercel**

#### **Step 1: Prepare Frontend**

1. **Update backend URL** in your frontend:

**File:** `src/components/Contact/Contact.jsx`

Change from:
```javascript
fetch('http://localhost:5001/api/contact/send', ...)
```

To:
```javascript
fetch('https://your-backend-url.railway.app/api/contact/send', ...)
```

(You'll get this URL after deploying backend)

2. **Update admin dashboard URLs** in:
   - `src/pages/Admin/Login.jsx`
   - `src/pages/Admin/Dashboard.jsx`

Replace all `http://localhost:5001` with your production backend URL.

#### **Step 2: Create Vercel Account**

1. Go to **https://vercel.com**
2. **Sign up** with GitHub account (free)
3. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

#### **Step 3: Push to GitHub**

Your portfolio needs to be on GitHub first:

```bash
# Navigate to your project
cd portfolio-website

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio ready for deployment"

# Create GitHub repo (on GitHub.com)
# Then connect and push:
git remote add origin https://github.com/tewahidohaimanot/my-portfolio.git
git branch -M main
git push -u origin main
```

#### **Step 4: Deploy to Vercel**

**Method A: Using Vercel Website (Easiest)**

1. Go to **https://vercel.com/new**
2. **Import** your GitHub repository
3. **Configure:**
   - Framework Preset: **Vite**
   - Root Directory: **portfolio-website**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables:** (Add these)
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
5. Click **Deploy**

**Method B: Using Vercel CLI**

```bash
cd portfolio-website
vercel

# Follow prompts:
# - Set up and deploy: Yes
# - Scope: Your account
# - Link to existing project: No
# - Project name: my-portfolio
# - Directory: ./ (current)
# - Want to override settings: No
```

#### **Step 5: Get Your Frontend URL**

Vercel will give you a URL like:
```
https://my-portfolio-tewahido.vercel.app
```

---

### **Part B: Deploy Backend to Railway**

#### **Step 1: Prepare Backend**

1. **Update CORS in backend:**

**File:** `backend/.env`
```env
FRONTEND_URL=https://my-portfolio-tewahido.vercel.app
```

2. **Create `railway.json`** in `backend/` folder:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

3. **Update `backend/package.json`** - Add start script:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### **Step 2: Create Railway Account**

1. Go to **https://railway.app**
2. **Sign up** with GitHub (free)
3. Verify your account

#### **Step 3: Create New Project**

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository
4. Railway will detect Node.js automatically

#### **Step 4: Add MySQL Database**

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add MySQL"**
3. Railway creates a MySQL database for you!

#### **Step 5: Configure Environment Variables**

In Railway, go to your backend service → **Variables** tab:

Add these variables:
```
NODE_ENV=production
PORT=5001

# Database (Railway will auto-provide these)
DB_HOST=${{MySQL.MYSQL_HOST}}
DB_USER=${{MySQL.MYSQL_USER}}
DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
DB_NAME=${{MySQL.MYSQL_DATABASE}}
DB_PORT=${{MySQL.MYSQL_PORT}}

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production_12345
JWT_EXPIRE=7d

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=tewahidohaimanot241@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=tewahidohaimanot241@gmail.com

# Frontend URL (from Vercel)
FRONTEND_URL=https://my-portfolio-tewahido.vercel.app

# Admin
ADMIN_EMAIL=tewahidohaimanot241@gmail.com
ADMIN_PASSWORD=Admin@123
ADMIN_NAME=Tewahido Haimanot
```

#### **Step 6: Deploy**

1. Railway will **auto-deploy** your backend
2. Wait for deployment to complete
3. Get your backend URL: `https://your-app.railway.app`

#### **Step 7: Update Frontend with Backend URL**

Now go back to your frontend code and update:

**Files to update:**
- `src/components/Contact/Contact.jsx`
- `src/pages/Admin/Login.jsx`
- `src/pages/Admin/Dashboard.jsx`

Change `http://localhost:5001` to `https://your-app.railway.app`

Then redeploy frontend (Vercel will auto-deploy on Git push).

---

## 🌐 **Option 2: Netlify (Frontend) + Render (Backend)**

### **Frontend on Netlify:**

1. Go to **https://netlify.com**
2. Sign up with GitHub
3. **New site from Git**
4. Choose your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `portfolio-website`
6. Add environment variables
7. Deploy!

### **Backend on Render:**

1. Go to **https://render.com**
2. Sign up with GitHub
3. **New** → **Web Service**
4. Connect your repository
5. Configure:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Root Directory: `portfolio-website/backend`
6. Add MySQL database (Render provides this)
7. Add environment variables
8. Deploy!

---

## 🌍 **Option 3: Complete Free Deployment**

### **Frontend: GitHub Pages**
- Free hosting for static sites
- Custom domain support
- HTTPS included

### **Backend: Heroku Free Tier or Cyclic**
- Free Node.js hosting
- PostgreSQL/MySQL available
- Auto-deploy from Git

---

## 📝 **Pre-Deployment Checklist**

### **Frontend:**
- [ ] Update all `localhost` URLs to production URLs
- [ ] Add production backend URL
- [ ] Test build locally: `npm run build`
- [ ] Check for console errors
- [ ] Optimize images
- [ ] Add environment variables

### **Backend:**
- [ ] Update CORS to allow production frontend URL
- [ ] Change JWT_SECRET to strong random string
- [ ] Update ADMIN_PASSWORD (change from default)
- [ ] Configure email settings
- [ ] Test API endpoints
- [ ] Set NODE_ENV=production

### **Database:**
- [ ] Backup local database
- [ ] Create production database
- [ ] Update connection strings
- [ ] Test database connection

---

## 🔧 **Environment Variables**

### **Frontend (.env in root):**
```env
VITE_API_URL=https://your-backend-url.com
```

### **Backend (.env):**
```env
NODE_ENV=production
PORT=5001

DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=portfolio_db
DB_PORT=3306

JWT_SECRET=change_this_to_random_string_in_production
JWT_EXPIRE=7d

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

FRONTEND_URL=https://your-frontend-url.com

ADMIN_EMAIL=tewahidohaimanot241@gmail.com
ADMIN_PASSWORD=ChangeThisInProduction123!
ADMIN_NAME=Tewahido Haimanot
```

---

## 🔐 **Security Checklist Before Deployment**

### **Critical:**
- [ ] Change default admin password
- [ ] Generate new JWT_SECRET (use random string generator)
- [ ] Never commit `.env` files to Git
- [ ] Enable HTTPS (most platforms do this automatically)
- [ ] Set strong database password
- [ ] Configure CORS properly

### **Recommended:**
- [ ] Add rate limiting to API
- [ ] Enable security headers
- [ ] Use environment-specific configs
- [ ] Set up error logging
- [ ] Configure backups

---

## 📊 **Cost Breakdown (Monthly)**

### **Free Tier (Recommended for Start):**

| Service | Cost | Limits |
|---------|------|--------|
| Vercel (Frontend) | **$0** | 100GB bandwidth |
| Railway (Backend) | **$0** | 500 hours/month |
| Railway MySQL | **$0** | Shared database |
| **Total** | **$0/month** | Perfect for portfolio |

### **Paid Tier (For Heavy Traffic):**

| Service | Cost | Benefits |
|---------|------|----------|
| Vercel Pro | $20/month | Custom domains, more bandwidth |
| Railway Pro | $5/month | Dedicated resources |
| MySQL | Included | Better performance |
| **Total** | ~$25/month | Production-ready |

---

## 🚀 **Quick Deploy Commands**

### **Build Frontend Locally:**
```bash
cd portfolio-website
npm run build

# Test the build
npx vite preview
```

### **Test Backend Locally:**
```bash
cd backend
NODE_ENV=production node server.js
```

### **Push to GitHub:**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## 🎯 **Post-Deployment Steps**

### **1. Test Everything:**
- [ ] Visit your frontend URL
- [ ] Test contact form submission
- [ ] Test CV download
- [ ] Test admin login
- [ ] Check all pages load
- [ ] Test on mobile devices

### **2. Update DNS (If using custom domain):**
- Point your domain to Vercel
- Update backend CORS for custom domain
- Enable HTTPS

### **3. Monitor:**
- Check deployment logs
- Monitor error rates
- Track API usage
- Set up uptime monitoring

---

## 🐛 **Common Deployment Issues**

### **Issue 1: CORS Error**
**Solution:** Update `FRONTEND_URL` in backend `.env`

### **Issue 2: API Not Found (404)**
**Solution:** Check backend URL in frontend code

### **Issue 3: Database Connection Failed**
**Solution:** Verify database credentials in environment variables

### **Issue 4: Build Failed**
**Solution:** 
```bash
# Test build locally first
npm run build

# Check for errors
```

### **Issue 5: Environment Variables Not Working**
**Solution:** 
- Restart deployment
- Check variable names match exactly
- No quotes around values in production

---

## 📱 **Custom Domain Setup**

### **For Frontend (Vercel):**
1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel dashboard → Domains
3. Add your custom domain
4. Update DNS records (Vercel provides instructions)
5. Wait for DNS propagation (up to 24 hours)

### **For Backend:**
- Railway provides free subdomain
- Or use custom domain same process

---

## 📚 **Useful Resources**

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Netlify Docs:** https://docs.netlify.com
- **Render Docs:** https://render.com/docs

---

## ✅ **Final Checklist**

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Database connected
- [ ] Contact form working
- [ ] Admin login working
- [ ] CV download working
- [ ] All images loading
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain (optional)

---

## 🎉 **You're Live!**

Once deployed, your portfolio will be accessible at:
- **Frontend:** `https://your-site.vercel.app`
- **Backend:** `https://your-api.railway.app`
- **Admin:** `https://your-site.vercel.app/admin`

**Share your portfolio URL and start getting noticed!** 🚀

---

**Need help?** Check platform-specific docs or deployment logs for errors.

**Pro Tip:** Start with free tiers, upgrade only when needed!
