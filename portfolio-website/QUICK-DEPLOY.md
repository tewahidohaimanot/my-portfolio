# ⚡ Quick Deploy Checklist

**Get your portfolio live in 30 minutes!**

---

## 🎯 **The Fastest Way to Deploy**

### **Recommended Stack:**
- **Frontend:** Vercel (free)
- **Backend:** Railway (free)
- **Database:** Railway MySQL (free)

---

## 📋 **Step-by-Step (30 Minutes)**

### **STEP 1: Prepare Code (5 min)**

#### A. Create `.env.production` files:

**Frontend root:**
```bash
# No .env needed for Vite - we'll update code directly
```

**Backend `.env` (update these):**
```env
NODE_ENV=production
FRONTEND_URL=https://YOUR-SITE.vercel.app  # Update after frontend deploy
```

#### B. Push to GitHub:

```bash
cd My-Portfolio

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Portfolio ready for deployment"

# Create repo on GitHub.com, then:
git remote add origin https://github.com/tewahidohaimanot/my-portfolio.git
git push -u origin main
```

---

### **STEP 2: Deploy Backend (10 min)**

#### A. Sign up Railway:
1. Go to **https://railway.app**
2. Sign up with GitHub

#### B. Create Project:
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository
4. Set root directory: `portfolio-website/backend`

#### C. Add MySQL:
1. In project, click **"+ New"**
2. Select **"Database"** → **"MySQL"**

#### D. Add Environment Variables:
Click backend service → Variables → Add these:

```
NODE_ENV=production
JWT_SECRET=your_random_secret_here_change_this
ADMIN_EMAIL=tewahidohaimanot241@gmail.com
ADMIN_PASSWORD=ChangeMe123!
ADMIN_NAME=Tewahido Haimanot
EMAIL_USER=tewahidohaimanot241@gmail.com
FRONTEND_URL=https://YOUR-SITE.vercel.app
```

Railway auto-fills database variables!

#### E. Get Backend URL:
Copy your Railway URL: `https://your-app.railway.app`

---

### **STEP 3: Update Frontend Code (5 min)**

Update these files with your Railway URL:

**File 1:** `src/components/Contact/Contact.jsx`
```javascript
// Line ~27
fetch('https://your-app.railway.app/api/contact/send', {
```

**File 2:** `src/pages/Admin/Login.jsx`
```javascript
// Line ~32
const response = await fetch('https://your-app.railway.app/api/auth/login', {
```

**File 3:** `src/pages/Admin/Dashboard.jsx`
```javascript
// Line ~19
const response = await fetch('https://your-app.railway.app/api/admin/stats', {
```

**Commit changes:**
```bash
git add .
git commit -m "Update API URLs for production"
git push
```

---

### **STEP 4: Deploy Frontend (10 min)**

#### A. Sign up Vercel:
1. Go to **https://vercel.com**
2. Sign up with GitHub

#### B. Import Project:
1. Click **"Add New"** → **"Project"**
2. Import your GitHub repository
3. Configure:
   - **Framework:** Vite
   - **Root Directory:** `portfolio-website`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

#### C. Deploy:
1. Click **"Deploy"**
2. Wait ~2 minutes
3. Get your URL: `https://your-site.vercel.app`

#### D. Update Backend CORS:
1. Go back to Railway
2. Update `FRONTEND_URL` variable to your Vercel URL
3. Restart backend service

---

## ✅ **Done! Test Your Site**

### **Test Frontend:**
Visit: `https://your-site.vercel.app`

### **Test Contact Form:**
1. Fill form
2. Submit
3. Should show success! ✅

### **Test Admin:**
1. Go to: `https://your-site.vercel.app/admin`
2. Login with your credentials
3. Should see dashboard! ✅

---

## 🎉 **You're Live!**

Your portfolio URLs:
- **Website:** `https://your-site.vercel.app`
- **Admin:** `https://your-site.vercel.app/admin`
- **API:** `https://your-app.railway.app`

---

## 🚨 **If Something Doesn't Work**

### **Check Logs:**

**Vercel:**
- Go to your project
- Click "Deployments"
- Click latest deployment
- Check "Build Logs"

**Railway:**
- Go to your service
- Click "Deployments"
- Check logs for errors

### **Common Fixes:**

**CORS Error?**
- Update `FRONTEND_URL` in Railway
- Restart backend

**API Not Found?**
- Check API URLs in frontend code
- Verify Railway backend is running

**Database Error?**
- Check database is created in Railway
- Verify environment variables

---

## 📱 **Custom Domain (Optional)**

### **Add to Vercel:**
1. Buy domain (Namecheap, GoDaddy)
2. In Vercel → Domains → Add domain
3. Update DNS records
4. Wait 24 hours for DNS

### **Update URLs:**
Remember to update `FRONTEND_URL` in Railway after adding custom domain!

---

## 💰 **Cost: $0/month**

All services used are **100% FREE**:
- ✅ Vercel: Free plan
- ✅ Railway: Free $5 monthly credit
- ✅ MySQL: Included with Railway

---

## 🎯 **Quick Links**

- **Deploy Frontend:** https://vercel.com/new
- **Deploy Backend:** https://railway.app/new
- **GitHub:** https://github.com/new

---

**Total Time:** ~30 minutes  
**Total Cost:** $0  
**Difficulty:** Easy ⭐⭐☆☆☆

**Your portfolio will be live and professional!** 🚀

---

For detailed guide with alternatives, see **DEPLOYMENT-GUIDE.md**
