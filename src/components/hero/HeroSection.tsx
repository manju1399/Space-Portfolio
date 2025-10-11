import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions, Platform, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import StarryBackground from '../common/StarryBackground';

const { width, height } = Dimensions.get('window');

interface HeroSectionProps {
  onNavigateToContact?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToContact }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for profile ring
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Float animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleButtonPress = async (action: string) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (action === 'View Resume') {
      // Download resume from assets
      if (Platform.OS === 'web') {
        // For web, try to fetch and download the resume
        try {
          // Use require to get the asset path
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
        // For native, use Linking
        const resumeUrl = require('../../../assets/Manjunath.pdf');
        await Linking.openURL(resumeUrl);
      }
    } else if (action === 'Contact Me') {
      // Navigate to contact section
      if (onNavigateToContact) {
        onNavigateToContact();
      }
    }
  };

  return (
    <View style={styles.container}>
      <StarryBackground />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <Animatable.View 
          animation="fadeInDown" 
          duration={1000}
          style={styles.profileContainer}
        >
          <Animated.View 
            style={[
              styles.profileRingOuter,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <LinearGradient
              colors={['#6C63FF', '#FF6584', '#6C63FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profileRing}
            >
              <View style={styles.profileImageContainer}>
                <Image 
                  source={require('../../../assets/meai.jpg')}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
            </LinearGradient>
          </Animated.View>
        </Animatable.View>

        {/* Name and Title */}
        <Animatable.View animation="fadeInUp" delay={300} duration={1000}>
          <Text style={styles.name}>MANJUNATH</Text>
          <Text style={styles.title}>SOFTWARE DEVELOPER</Text>
        </Animatable.View>

        {/* Animated Tagline */}
        <Animatable.View 
          animation="pulse" 
          iterationCount="infinite"
          delay={600}
          style={styles.taglineContainer}
        >
          <LinearGradient
            colors={['rgba(108, 99, 255, 0.2)', 'rgba(255, 101, 132, 0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.taglineGradient}
          >
            <Text style={styles.tagline}>Turning code into constellations ✨</Text>
          </LinearGradient>
        </Animatable.View>

        {/* Bio */}
        <Animatable.View animation="fadeIn" delay={900} duration={1000}>
          <Text style={styles.bio}>
            A motivated and detail-oriented software developer with hands-on experience
            in backend and server side technologies, including Node.js, MySQL, MongoDB,
            Docker and API integrations. Currently working as Associate Software Engineer at Ezee.ai.
          </Text>
        </Animatable.View>

        {/* Action Buttons */}
        <Animatable.View 
          animation="fadeInUp" 
          delay={1200}
          style={styles.buttonContainer}
        >
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
        </Animatable.View>

        {/* Floating Elements */}
        <Animated.View 
          style={[
            styles.floatingPlanet,
            { transform: [{ translateY: floatAnim }] }
          ]}
        >
          <Ionicons name="planet" size={40} color="rgba(108, 99, 255, 0.3)" />
        </Animated.View>

        <Animated.View 
          style={[
            styles.floatingRocket,
            { transform: [{ translateY: floatAnim }] }
          ]}
        >
          <Ionicons name="rocket" size={35} color="rgba(255, 101, 132, 0.3)" />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingVertical: width < 768 ? 20 : 40,
    paddingHorizontal: width < 768 ? 16 : 20,
  },
  profileContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  profileRingOuter: {
    padding: 4,
  },
  profileRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#14142A',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 85,
  },
  name: {
    fontSize: width < 768 ? 24 : 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#6C63FF',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 20,
  },
  taglineContainer: {
    marginVertical: 20,
  },
  taglineGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bio: {
    fontSize: 15,
    color: '#B0B0C0',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: width < 768 ? 'column' : 'row',
    gap: 15,
    marginTop: 10,
    width: width < 768 ? '100%' : 'auto',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    gap: 8,
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
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    gap: 8,
    borderWidth: 2,
    borderColor: '#6C63FF',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
  },
  floatingPlanet: {
    position: 'absolute',
    top: 100,
    right: 30,
  },
  floatingRocket: {
    position: 'absolute',
    bottom: 150,
    left: 30,
  },
});

export default HeroSection;
