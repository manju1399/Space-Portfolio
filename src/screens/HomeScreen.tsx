import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, TouchableOpacity, Text, Animated, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { triggerHaptic } from '../utils/haptics';

// Import section components
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import SkillsSection from '../components/skills/SkillsSection';
import ProjectsSection from '../components/projects/ProjectsSection';
import GallerySection from '../components/gallery/GallerySection';
import ContactSection from '../components/contact/ContactSection';
import ChatButton from '../components/common/ChatButton';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const slideAnim = useRef(new Animated.Value(-dimensions.width)).current;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  // Lock body scroll on web when menu is open
  useEffect(() => {
    if (Platform.OS === 'web') {
      const isDesktopView = dimensions.width >= 1024;
      if (menuOpen && !isDesktopView) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }, [menuOpen, dimensions.width]);

  const menuItems = [
    { name: 'Home', icon: 'home', component: HeroSection },
    { name: 'About', icon: 'person', component: AboutSection },
    { name: 'Skills', icon: 'code-slash', component: SkillsSection },
    { name: 'Projects', icon: 'folder', component: ProjectsSection },
    { name: 'Gallery', icon: 'images', component: GallerySection },
    { name: 'Contact', icon: 'mail', component: ContactSection },
  ];

  const toggleMenu = async () => {
    await triggerHaptic('medium');
    const toValue = menuOpen ? -dimensions.width : 0;

    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();

    setMenuOpen(!menuOpen);
  };

  const handleMenuItemPress = async (itemName: string) => {
    await triggerHaptic('light');
    setActiveSection(itemName);
    if (dimensions.width < 1024) {
      toggleMenu();
    }
  };

  const handleNavigateToContact = () => {
    setActiveSection('Contact');
  };

  const ActiveComponent = menuItems.find(item => item.name === activeSection)?.component || HeroSection;

  const isDesktop = dimensions.width >= 1024;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A1A" />

      {/* Header */}
      <View style={styles.header}>
        {/* Mobile: Hamburger */}
        {!isDesktop && (
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerButton}>
            <Ionicons name={menuOpen ? 'close' : 'menu'} size={28} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        {/* Desktop: Logo/Title */}
        {isDesktop && (
          <View style={styles.desktopLogo}>
            <Ionicons name="rocket" size={24} color="#6C63FF" />
            <Text style={styles.logoText}>Manju's Space</Text>
          </View>
        )}

        {/* Mobile: Section Title */}
        {!isDesktop && <Text style={styles.headerTitle}>{activeSection}</Text>}

        {/* Desktop: Navigation Links */}
        {isDesktop && (
          <View style={styles.desktopNav}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.desktopNavItem,
                  activeSection === item.name && styles.desktopNavItemActive
                ]}
                onPress={() => handleMenuItemPress(item.name)}
              >
                <Ionicons
                  name={item.icon as any}
                  size={18}
                  color={activeSection === item.name ? '#6C63FF' : '#B0B0C0'}
                />
                <Text style={[
                  styles.desktopNavText,
                  activeSection === item.name && styles.desktopNavTextActive
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!isDesktop && <View style={styles.headerSpacer} />}
      </View>

      {/* Main Content */}
      <View style={styles.content} pointerEvents={!isDesktop && menuOpen ? 'none' : 'auto'}>
        {activeSection === 'Home' ? (
          <HeroSection onNavigateToContact={handleNavigateToContact} />
        ) : (
          <ActiveComponent />
        )}
      </View>

      {/* Sliding Menu - Mobile Only */}
      {!isDesktop && (
        <Animated.View
          style={[
            styles.menu,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <LinearGradient
            colors={['#14142A', '#1A1A2E']}
            style={styles.menuGradient}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Manju's Space</Text>
              <TouchableOpacity onPress={toggleMenu}>
                <Ionicons name="close" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.menuItems} showsVerticalScrollIndicator={false}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItem,
                    activeSection === item.name && styles.menuItemActive
                  ]}
                  onPress={() => handleMenuItemPress(item.name)}
                >
                  <View style={[
                    styles.menuIconContainer,
                    activeSection === item.name && styles.menuIconContainerActive
                  ]}>
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={activeSection === item.name ? '#6C63FF' : '#B0B0C0'}
                    />
                  </View>
                  <Text style={[
                    styles.menuItemText,
                    activeSection === item.name && styles.menuItemTextActive
                  ]}>
                    {item.name}
                  </Text>
                  {activeSection === item.name && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.menuFooter}>
              <Text style={styles.menuFooterText}>Made with ❤️</Text>
              <Text style={styles.menuFooterSubtext}>v1.0.0</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      )}

      {/* Overlay - Mobile Only */}
      {!isDesktop && menuOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleMenu}
        />
      )}

      {/* Chat Button */}
      <ChatButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#14142A',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A4A',
    zIndex: 100, // Ensure header stays on top
    // @ts-ignore
    position: Platform.OS === 'web' ? 'fixed' : 'relative',
    top: 0,
    left: 0,
    right: 0,
  },
  hamburgerButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 60 : 0, // Add padding for fixed header on web
  },
  menu: {
    // @ts-ignore
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    maxWidth: 300,
    zIndex: 1000,
  },
  menuGradient: {
    flex: 1,
    paddingTop: 60,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A4A',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  menuItems: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    position: 'relative',
  },
  menuItemActive: {
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIconContainerActive: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
  },
  menuItemText: {
    fontSize: 16,
    color: '#B0B0C0',
    fontWeight: '500',
  },
  menuItemTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: '100%',
    backgroundColor: '#6C63FF',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  menuFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A4A',
    alignItems: 'center',
  },
  menuFooterText: {
    fontSize: 14,
    color: '#B0B0C0',
    marginBottom: 4,
  },
  menuFooterSubtext: {
    fontSize: 12,
    color: '#666',
  },
  overlay: {
    // @ts-ignore
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  // Desktop Navigation Styles
  desktopLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  desktopNav: {
    flexDirection: 'row',
    gap: 8,
  },
  desktopNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  desktopNavItemActive: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
  },
  desktopNavText: {
    fontSize: 14,
    color: '#B0B0C0',
    fontWeight: '500',
  },
  desktopNavTextActive: {
    color: '#6C63FF',
    fontWeight: '600',
  },
});

export default HomeScreen;
