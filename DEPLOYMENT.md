# Deployment Guide - Scaleunities Team Portfolio

## GitHub Deployment Instructions

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `scaleunities-portfolio` (or your preferred name)
3. Choose **Public** or **Private** based on your preference
4. Do NOT initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 2: Connect Local Repository to GitHub
Copy and paste these commands in your terminal (replace `YOUR_USERNAME` with your GitHub username):

```bash
cd "/Users/macbook/Downloads/project 87"
git remote add origin https://github.com/YOUR_USERNAME/scaleunities-portfolio.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel (Recommended)
Vercel is optimized for Next.js and provides free deployment:

1. Go to [Vercel](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import the GitHub repository
5. Select "Next.js" as the framework (auto-detected)
6. Click "Deploy"

**Your site will be live at:** `https://your-project.vercel.app`

### Environment Variables (if needed)
If you need to add environment variables for production:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add any required variables

### Step 4: Connect Custom Domain (Optional)
1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., scaleunities.com)
3. Follow the DNS configuration instructions

## Continuous Deployment
Once connected to GitHub, your site will:
- ✅ Automatically deploy when you push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Show deployment status in GitHub

## What's Included in Deployment
- ✅ Facebook Pixel tracking
- ✅ Vercel Analytics
- ✅ Google Translate widget
- ✅ Optimized performance (lazy loading, compression)
- ✅ SEO meta tags
- ✅ Responsive design
- ✅ Team section with all 4 members

## Quick Reference
- **Repository Local Path:** `/Users/macbook/Downloads/project 87`
- **Main Branch:** `main`
- **Framework:** Next.js 14+
- **Deployment Target:** Vercel (free tier available)
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

## Troubleshooting
- If `git push` fails: Make sure you've added the remote with correct URL
- If Vercel deployment fails: Check that `next.config.mjs` is valid
- For video loading issues: Ensure `/public/video*.mp4` files exist

---

**Ready to deploy? Follow the steps above!** 🚀
