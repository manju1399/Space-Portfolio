# Firebase Deployment Guide

## Prerequisites
1. Install Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

## Deployment Steps

### Step 1: Build the Web Version
```bash
npx expo export:web
```
This will create a `web-build` folder with your production-ready web app.

### Step 2: Deploy to Firebase
```bash
firebase deploy
```

### Alternative: One-Command Deployment
You can also use:
```bash
npx expo export:web && firebase deploy
```

## Project Configuration
- **Firebase Project ID**: manjunath-9913
- **Hosting URL**: https://manjunath-9913.web.app
- **Build Directory**: web-build

## Troubleshooting

### If you get authentication errors:
```bash
firebase logout
firebase login
```

### If build fails:
1. Clear cache: `npm cache clean --force`
2. Delete node_modules: `rm -rf node_modules`
3. Reinstall: `npm install`
4. Try building again: `npx expo export:web`

### If deployment fails:
1. Check if you're logged in: `firebase projects:list`
2. Verify project: `firebase use manjunath-9913`
3. Try deploying again: `firebase deploy`

## Update Deployment
To update your live site, simply run:
```bash
npx expo export:web && firebase deploy
```

## View Your Site
After deployment, your site will be live at:
- https://manjunath-9913.web.app
- https://manjunath-9913.firebaseapp.com
