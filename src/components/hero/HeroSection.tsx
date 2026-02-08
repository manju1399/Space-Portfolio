import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions, Platform, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import HeroScene from './HeroScene';

const { width, height } = Dimensions.get('window');

interface HeroSectionProps {
  onNavigateToContact?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToContact }) => {
  const [introStep, setIntroStep] = useState(0); // 0: Robot Intro, 1: Namasthe, 2: Final Content

  // Animation Values
  const finalContentOpacity = useRef(new Animated.Value(0)).current;
  const finalContentTranslateY = useRef(new Animated.Value(20)).current;

  // Handle Intro Steps
  useEffect(() => {
    if (introStep === 1) {
      // Show Final Content immediately after 3D intro
      Animated.parallel([
        Animated.timing(finalContentOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(finalContentTranslateY, { toValue: 0, duration: 1000, useNativeDriver: true })
      ]).start();
    }
  }, [introStep]);

  const handleButtonPress = async (action: string) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (action === 'View Resume') {
      // Download resume from assets
      if (Platform.OS === 'web') {
        try {
          const resumePath = require('../../../assets/Manjunath.pdf');
          const link = document.createElement('a');
          link.href = resumePath;
          link.download = 'Manjunath_Resume.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading resume:', error);
          alert('Resume download will be available soon. Please contact me directly!');
        }
      } else {
        const resumeUrl = require('../../../assets/Manjunath.pdf');
        await Linking.openURL(resumeUrl);
      }
    } else if (action === 'Contact Me') {
      if (onNavigateToContact) {
        onNavigateToContact();
      }
    }
  };

  const isMobile = width < 768;

  return (
    <View style={styles.container}>
      {/* Background & Robot Scene */}
      <HeroScene onIntroStep={setIntroStep} />

      {/* Content Overlay */}
      <View style={[styles.overlayContainer, isMobile && styles.overlayContainerMobile]} pointerEvents="box-none">

        {/* Left Column (Spacer for Robot) - Pass through clicks */}
        {!isMobile && <View style={styles.leftColumn} pointerEvents="none" />}

        {/* Right Column (Content) */}
        <View style={[styles.rightColumn, isMobile && styles.rightColumnMobile]} pointerEvents="box-none">

          {/* Final Content Phase */}
          {introStep >= 1 && (
            <Animated.View
              style={{
                opacity: finalContentOpacity,
                transform: [{ translateY: finalContentTranslateY }],
                width: '100%',
                alignItems: isMobile ? 'center' : 'flex-start'
              }}
            >
              <Text style={[styles.heading, isMobile && styles.textCenter]}>Welcome to My space</Text>

              <View style={styles.divider} />

              <Text style={[styles.bio, isMobile && styles.textCenter]}>
                A motivated and detail-oriented software developer with hands-on experience
                in backend and server side technologies, including Node.js, MySQL, MongoDB,
                Docker and API integrations. Currently working as Associate Software Engineer.
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleButtonPress('View Resume')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#6C63FF', '#5A52D5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.primaryButton}
                  >
                    <Ionicons name="document-text" size={20} color="#FFFFFF" />
                    <Text style={styles.buttonText}>View Resume</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleButtonPress('Contact Me')}
                  activeOpacity={0.8}
                >
                  <View style={styles.secondaryButton}>
                    <Ionicons name="mail" size={20} color="#6C63FF" />
                    <Text style={styles.secondaryButtonText}>Contact Me</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  overlayContainer: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 10, // Above canvas
  },
  overlayContainerMobile: {
    flexDirection: 'column',
  },
  leftColumn: {
    flex: 1, // Occupies left 50%
  },
  rightColumn: {
    flex: 1, // Occupies right 50%
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: -50, // Slight adjustment for balance
  },
  rightColumnMobile: {
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 350, // Push content down below robot (approx robot height)
    paddingBottom: 50,
  },
  namastheText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'web' ? 'sans-serif' : 'System',
    textShadowColor: 'rgba(108, 99, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  heading: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 15,
    lineHeight: 50,
  },
  textCenter: {
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: '#6C63FF',
    marginBottom: 25,
    borderRadius: 2,
  },
  bio: {
    fontSize: 16,
    color: '#B0B0C0',
    lineHeight: 28,
    maxWidth: 500,
    marginBottom: 35,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 10,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 30,
    gap: 10,
    borderWidth: 2,
    borderColor: '#6C63FF',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HeroSection;
