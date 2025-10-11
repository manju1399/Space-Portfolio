# 🌌 Cosmic Portfolio - React Native App

A stunning personal portfolio app built with React Native (Expo) featuring a dark galaxy theme with interactive animations, glowing elements, and smooth transitions.

## ✨ Features

### 🎨 Design
- **Dark Galaxy Theme**: Deep space background with animated stars and nebula effects
- **Neon Gradient Accents**: Electric blue, purple, and pink color scheme
- **Glowing Elements**: Subtle borders, buttons, and interactive components
- **Smooth Animations**: Using react-native-reanimated and react-native-animatable

### 📱 Sections

1. **Hero Section**
   - Animated profile with glowing ring and pulse effect
   - Dynamic tagline: "Turning code into constellations ✨"
   - Quick action buttons with haptic feedback

2. **About Me**
   - Education and work experience
   - Contact information
   - Languages and personal details

3. **Skills (Pictorial)**
   - Visual skill cards with icons and colors
   - Interactive tap-to-view details
   - Categorized by Frontend, Backend, Tools, and Soft Skills

4. **Projects**
   - Animated project cards with 3D effects
   - GitHub and live demo links
   - Detailed project view with features

5. **Gallery**
   - Dual viewing modes: Slider and Grid
   - Smooth transitions between views
   - Interactive image details modal

6. **Contact Form**
   - Formspree integration for email
   - Form validation with Formik + Yup
   - Success/error toast notifications
   - Social media links

7. **Chat Assistant**
   - Floating chat button
   - Predefined questions with auto-responses
   - Typing animation effect

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Formspree**
   - Go to [Formspree.io](https://formspree.io) and create a free account
   - Create a new form and get your form ID
   - Update the endpoint in `src/components/contact/ContactSection.tsx`:
     ```typescript
     const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
     ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator
   - Or press `w` for web browser

## 📦 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **UI Components**: React Native Paper
- **Animations**: 
  - react-native-reanimated
  - react-native-animatable
- **Forms**: Formik + Yup
- **HTTP Client**: Axios
- **Icons**: @expo/vector-icons (Ionicons)
- **Gradients**: expo-linear-gradient
- **Haptics**: expo-haptics

## 📁 Project Structure

```
portfolio-app/
├── src/
│   ├── components/
│   │   ├── about/          # About section
│   │   ├── common/         # Reusable components
│   │   ├── contact/        # Contact form
│   │   ├── gallery/        # Gallery section
│   │   ├── hero/           # Hero section
│   │   ├── projects/       # Projects section
│   │   └── skills/         # Skills section
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   └── ProjectDetailsScreen.tsx
│   └── assets/             # Images and fonts
├── App.tsx                 # Main app entry
├── package.json
└── README.md
```

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`src/components/hero/HeroSection.tsx`)
   - Update name, title, and bio

2. **About Section** (`src/components/about/AboutSection.tsx`)
   - Update education and work experience
   - Update contact details

3. **Skills Section** (`src/components/skills/SkillsSection.tsx`)
   - Add/remove skills
   - Update skill levels and descriptions

4. **Projects Section** (`src/components/projects/ProjectsSection.tsx`)
   - Add your projects with GitHub/demo links
   - Update project descriptions and features

5. **Contact Section** (`src/components/contact/ContactSection.tsx`)
   - Update social media links
   - Update email and phone number

### Theme Colors

The main theme colors are defined in `App.tsx`:
```typescript
const theme = {
  colors: {
    primary: '#6C63FF',      // Purple
    accent: '#FF6584',       // Pink
    background: '#0A0A1A',   // Dark space
    card: '#14142A',         // Card background
    text: '#FFFFFF',         // White text
    border: '#2A2A4A',       // Border color
  },
};
```

## 🌟 Key Features Explained

### Haptic Feedback
All interactive elements provide tactile feedback using Expo Haptics for better UX.

### Animated Stars Background
The `StarryBackground` component creates 50 animated stars with random positions and twinkling effects.

### Chat Assistant
Predefined questions with auto-responses simulate a chatbot experience. Customize questions in `ChatButton.tsx`.

### Form Validation
Contact form uses Yup schema for validation:
- Name: 2-50 characters
- Email: Valid email format
- Message: 10-500 characters

## 📱 Building for Production

### Android
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

### Web
```bash
npm run web
```

## 🐛 Troubleshooting

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### Dependencies issues
```bash
rm -rf node_modules
npm install
```

### Expo Go connection issues
- Ensure your phone and computer are on the same network
- Try using tunnel mode: `npm start -- --tunnel`

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Manjunath**
- Email: manjunathbr2002@gmail.com
- Phone: +91 8217801894
- Location: Ramanagara, Karnataka

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Native community for excellent libraries
- Formspree for free form handling

---

Made with ❤️ and ✨ by Manjunath
