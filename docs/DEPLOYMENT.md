# Deployment Guide to Vercel

Complete step-by-step guide for deploying the AI Udaan Bootcamp LMS to Vercel.

## Prerequisites

- GitHub account with your project repository
- Vercel account (free tier available)
- Google Apps Script deployed (see GOOGLE_SHEETS.md)
- Environment variables ready

## Step 1: Prepare Your Code

### 1.1 Ensure All Changes Are Committed

```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 1.2 Verify Local Build Works

```bash
npm run build
npm run start
```

If build succeeds locally, you're ready to deploy!

## Step 2: Connect to Vercel

### 2.1 Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**
4. Find your repository: `AI-Udaan-Bootcamp`
5. Click **"Import"**

### 2.2 Project Settings

Vercel will auto-detect it's a Next.js project. Keep default settings.

## Step 3: Configure Environment Variables

### 3.1 In Vercel Dashboard

1. Click on your project
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

```env
DATABASE_URL=file:./dev.db
JWT_SECRET=your-super-secret-key-change-in-production-12345
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

⚠️ **IMPORTANT**: Use your actual Google Apps Script URL from deployed script!

## Step 4: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (3-5 minutes)
3. Once done, you'll get your live URL

## Step 5: Test Everything

### Test Registration Form
1. Fill and submit registration form
2. Check "/success" page shows confirmation
3. Verify data in Google Sheets "Registered Candidates" tab

### Test Contact Form
1. Fill and submit contact form
2. Check success toast appears
3. Verify data in Google Sheets "Enquiries" tab

## Step 6: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your domain
3. Update DNS records (shown in Vercel)
4. Wait 24-48 hours for propagation

---

For detailed troubleshooting, see main README.md
