# 🚀 Quick Setup Guide - Cosmic Portfolio App

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- ✅ Node.js (v14 or higher) installed
- ✅ npm or yarn package manager
- ✅ Expo CLI (`npm install -g expo-cli`)
- ✅ Expo Go app on your mobile device (optional)

## 🛠️ Installation Steps

### Step 1: Install Dependencies
```bash
cd portfolio-app
npm install
```

### Step 2: Configure Formspree (Important!)

1. Visit [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form
4. Copy your form ID (looks like: `xyzabc123`)
5. Open `src/components/contact/ContactSection.tsx`
6. Replace `YOUR_FORM_ID` with your actual form ID:

```typescript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzabc123';
```

### Step 3: Customize Your Information

#### Update Personal Details

**File: `src/components/hero/HeroSection.tsx`**
```typescript
<Text style={styles.name}>YOUR NAME</Text>
<Text style={styles.title}>YOUR TITLE</Text>
<Text style={styles.bio}>Your bio here...</Text>
```

**File: `src/components/about/AboutSection.tsx`**
- Update education array with your details
- Update experience array with your work history
- Update contact information

**File: `src/components/contact/ContactSection.tsx`**
- Update phone number
- Update email address
- Update social media links

### Step 4: Add Your Projects

**File: `src/components/projects/ProjectsSection.tsx`**

Replace the projects array with your own projects:
```typescript
const projects = [
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Project description',
    tags: ['React', 'Node.js'],
    icon: 'code',
    color: '#6C63FF',
    githubUrl: 'https://github.com/yourusername/project',
    demoUrl: 'https://yourproject.com',
    features: [
      'Feature 1',
      'Feature 2',
    ],
  },
  // Add more projects...
];
```

### Step 5: Update Skills

**File: `src/components/skills/SkillsSection.tsx`**

Modify the skills object to match your skillset:
```typescript
const skills = {
  frontend: [
    { name: 'React', icon: 'logo-react', color: '#61DAFB', description: '...', level: 'Advanced' },
    // Add your skills...
  ],
  // Update other categories...
};
```

### Step 6: Customize Chat Responses

**File: `src/components/common/ChatButton.tsx`**

Update predefined questions and answers:
```typescript
const predefinedQuestions = [
  { 
    question: "Your question?", 
    answer: "Your answer..." 
  },
  // Add more Q&A...
];
```

## 🎨 Theme Customization

### Change Color Scheme

**File: `App.tsx`**

```typescript
const theme = {
  colors: {
    primary: '#6C63FF',      // Main purple color
    accent: '#FF6584',       // Pink accent
    background: '#0A0A1A',   // Dark background
    card: '#14142A',         // Card background
    text: '#FFFFFF',         // Text color
    border: '#2A2A4A',       // Border color
  },
};
```

## 🚀 Running the App

### Development Mode

```bash
npm start
```

This will:
1. Start the Metro bundler
2. Show a QR code
3. Provide options to run on different platforms

### Run on Specific Platform

```bash
# Android
npm run android

# iOS (Mac only)
npm run ios

# Web
npm run web
```

### Using Expo Go App

1. Install Expo Go on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code shown in terminal
3. App will load on your device

## 🐛 Common Issues & Solutions

### Issue: Metro bundler won't start
**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: Dependencies not installing
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Unable to resolve module"
**Solution:**
```bash
npm install
npm start -- --reset-cache
```

### Issue: Expo Go can't connect
**Solutions:**
- Ensure phone and computer are on same WiFi network
- Try tunnel mode: `npm start -- --tunnel`
- Check firewall settings

### Issue: TypeScript errors
**Solution:**
Most TypeScript errors are handled with `as any` type assertions. If you see new errors, you can:
1. Fix the type definitions
2. Use type assertion: `(variable as any)`

## 📱 Testing on Physical Device

### Android
1. Enable Developer Mode on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Run: `npm run android`

### iOS (Mac only)
1. Install Xcode from App Store
2. Connect iPhone via USB
3. Trust the computer on iPhone
4. Run: `npm run ios`

## 🌐 Web Testing

```bash
npm run web
```

Opens in browser at `http://localhost:19006`

## 📦 Building for Production

### Using EAS Build (Recommended)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure build:
```bash
eas build:configure
```

4. Build for Android:
```bash
eas build --platform android
```

5. Build for iOS:
```bash
eas build --platform ios
```

### Classic Build (Deprecated but still works)

```bash
expo build:android
expo build:ios
```

## 📸 Adding Custom Images

### Profile Picture
1. Add your image to `assets/` folder
2. Update `HeroSection.tsx`:
```typescript
<Image 
  source={require('../../assets/profile.jpg')} 
  style={styles.profileImage} 
/>
```

### Gallery Images
1. Add images to `assets/gallery/` folder
2. Update `GallerySection.tsx` with actual image sources

## 🎯 Performance Tips

1. **Optimize Images**: Use compressed images (WebP format recommended)
2. **Lazy Loading**: Components load on demand with tab navigation
3. **Animation Performance**: Uses native driver for smooth 60fps animations
4. **Memory Management**: Components unmount when not in view

## 📊 Analytics (Optional)

To add analytics:

1. Install Firebase:
```bash
expo install firebase
```

2. Configure in `App.tsx`
3. Track screen views and events

## 🔒 Security Best Practices

1. **Never commit API keys** to version control
2. Use environment variables for sensitive data
3. Validate all user inputs (already implemented with Yup)
4. Keep dependencies updated: `npm audit fix`

## 📝 Next Steps

After setup:
1. ✅ Test all sections on your device
2. ✅ Verify contact form works with Formspree
3. ✅ Check all links and navigation
4. ✅ Test on both iOS and Android
5. ✅ Optimize images and assets
6. ✅ Build and publish to app stores

## 🆘 Need Help?

- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev)
- **React Native Docs**: [reactnative.dev](https://reactnative.dev)
- **Formspree Docs**: [help.formspree.io](https://help.formspree.io)

## 📧 Support

For issues specific to this template:
- Email: manjunathbr2002@gmail.com
- Check README.md for more details

---

Happy coding! 🚀✨
