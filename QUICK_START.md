# ⚡ Quick Start - Get Your Portfolio Running in 5 Minutes!

## 🎯 Step-by-Step Guide

### 1️⃣ Install Dependencies (1 minute)
```bash
cd portfolio-app
npm install
```

### 2️⃣ Start the App (30 seconds)
```bash
npm start
```

### 3️⃣ View on Your Device (1 minute)
- Download **Expo Go** app on your phone
- Scan the QR code from terminal
- Wait for app to load

**That's it! Your portfolio is running! 🎉**

---

## 🎨 Quick Customization (Optional - 3 minutes)

### Update Your Name & Title
**File**: `src/components/hero/HeroSection.tsx` (Line 76-77)
```typescript
<Text style={styles.name}>YOUR NAME HERE</Text>
<Text style={styles.title}>YOUR TITLE HERE</Text>
```

### Update Contact Info
**File**: `src/components/contact/ContactSection.tsx` (Line 135-145)
```typescript
<Text style={styles.infoValue}>YOUR PHONE</Text>
<Text style={styles.infoValue}>YOUR EMAIL</Text>
```

### Setup Contact Form
1. Go to [formspree.io](https://formspree.io) and sign up (free)
2. Create a form and copy the form ID
3. **File**: `src/components/contact/ContactSection.tsx` (Line 12)
```typescript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

---

## 📱 Testing Options

### Option 1: Expo Go (Easiest)
```bash
npm start
# Scan QR code with Expo Go app
```

### Option 2: Android Emulator
```bash
npm run android
```

### Option 3: iOS Simulator (Mac only)
```bash
npm run ios
```

### Option 4: Web Browser
```bash
npm run web
```

---

## 🐛 Quick Fixes

### Problem: Can't connect to Expo Go
**Solution**: Use tunnel mode
```bash
npm start -- --tunnel
```

### Problem: Metro bundler issues
**Solution**: Clear cache
```bash
npm start -- --reset-cache
```

### Problem: Dependencies error
**Solution**: Reinstall
```bash
rm -rf node_modules
npm install
```

---

## 📂 Key Files to Customize

| File | What to Update |
|------|---------------|
| `src/components/hero/HeroSection.tsx` | Name, title, bio |
| `src/components/about/AboutSection.tsx` | Education, experience |
| `src/components/skills/SkillsSection.tsx` | Your skills |
| `src/components/projects/ProjectsSection.tsx` | Your projects |
| `src/components/contact/ContactSection.tsx` | Contact info, social links |
| `src/components/common/ChatButton.tsx` | Chat questions/answers |

---

## 🎨 Color Customization

**File**: `App.tsx` (Line 16-27)

```typescript
const theme = {
  colors: {
    primary: '#6C63FF',      // Change this
    accent: '#FF6584',       // Change this
    background: '#0A0A1A',   // Change this
    // ... more colors
  },
};
```

---

## 📸 Screenshots

Take screenshots of your app:
1. Open app on device
2. Navigate through sections
3. Screenshot each section
4. Use for app store listings

---

## 🚀 Next Steps

1. ✅ Customize your information
2. ✅ Add your real projects
3. ✅ Update skills section
4. ✅ Test contact form
5. ✅ Add your photos (optional)
6. ✅ Build for production

---

## 📚 More Help?

- **Full Setup**: Read `SETUP_GUIDE.md`
- **All Features**: Check `FEATURES.md`
- **Detailed Info**: See `README.md`

---

## 🎉 You're Ready!

Your cosmic portfolio app is now running with:
- ✨ Animated galaxy background
- 🎨 Beautiful dark theme
- 📱 6 interactive sections
- 💬 Chat assistant
- 📧 Contact form
- 🚀 Smooth animations

**Enjoy your new portfolio app!** 🌟

---

Made with ❤️ by Manjunath
