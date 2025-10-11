import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import StarryBackground from '../common/StarryBackground';

const ProjectsSection = () => {
  const navigation = useNavigation();

  const projects = [
    {
      id: 1,
      title: 'MJR File Converter',
      description: 'Converts text files to MDR format with advanced parsing and validation features.',
      tags: ['Python', 'File Processing', 'GUI'],
      icon: 'document-text',
      color: '#6C63FF',
      githubUrl: 'https://github.com/manju1399',
      demoUrl: 'https://convertio-bac37.web.app/',
      features: [
        'Advanced file parsing and conversion',
        'User-friendly GUI interface',
        'Error handling and validation',
        'Batch processing support',
      ],
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Modern and responsive personal portfolio showcasing projects and skills with interactive animations.',
      tags: ['React Native', 'TypeScript', 'Expo'],
      icon: 'globe',
      color: '#FF6584',
      githubUrl: 'https://github.com/manju1399',
      demoUrl: 'https://manjunath-9913.web.app',
      features: [
        'Responsive design for all devices',
        'Smooth animations and transitions',
        'Dark mode support',
        'SEO optimized',
      ],
    },
    {
      id: 3,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      icon: 'cart',
      color: '#00CED1',
      githubUrl: 'https://github.com/manjunath',
      demoUrl: null,
      features: [
        'User authentication and authorization',
        'Shopping cart and checkout',
        'Payment gateway integration',
        'Admin panel for inventory management',
      ],
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team features.',
      tags: ['React Native', 'Firebase', 'Redux'],
      icon: 'checkbox',
      color: '#FFD700',
      githubUrl: 'https://github.com/manjunath',
      demoUrl: null,
      features: [
        'Real-time task synchronization',
        'Team collaboration features',
        'Push notifications',
        'Offline mode support',
      ],
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with forecasts, maps, and location-based alerts.',
      tags: ['React', 'API Integration', 'Charts'],
      icon: 'partly-sunny',
      color: '#FF8C00',
      githubUrl: 'https://github.com/manjunath',
      demoUrl: 'https://weather.manjunath.dev',
      features: [
        '7-day weather forecast',
        'Interactive weather maps',
        'Location-based alerts',
        'Historical data visualization',
      ],
    },
    {
      id: 6,
      title: 'Chat Application',
      description: 'Real-time messaging app with group chats, file sharing, and video calls.',
      tags: ['React', 'Socket.io', 'WebRTC'],
      icon: 'chatbubbles',
      color: '#9370DB',
      githubUrl: 'https://github.com/manjunath',
      demoUrl: null,
      features: [
        'Real-time messaging',
        'Group chat support',
        'File and media sharing',
        'Video call integration',
      ],
    },
  ];

  const handleProjectPress = async (project: any) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    (navigation as any).navigate('ProjectDetails', { project });
  };

  const handleLinkPress = async (url: string | null) => {
    if (!url) return;
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
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
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={800}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.subtitle}>Tap on a project to view details</Text>
        </Animatable.View>

        {/* Projects Grid */}
        <View style={styles.projectsContainer}>
          {projects.map((project, index) => (
            <Animatable.View
              key={project.id}
              animation="fadeInUp"
              delay={index * 100}
              duration={800}
            >
              <TouchableOpacity
                onPress={() => handleProjectPress(project)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={[`${project.color}20`, 'rgba(20, 20, 42, 0.8)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.projectCard}
                >
                  {/* Icon */}
                  <View style={[styles.projectIconContainer, { backgroundColor: `${project.color}30` }]}>
                    <Ionicons name={project.icon as any} size={36} color={project.color} />
                  </View>

                  {/* Content */}
                  <View style={styles.projectContent}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectDescription} numberOfLines={2}>
                      {project.description}
                    </Text>

                    {/* Tags */}
                    <View style={styles.tagsContainer}>
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <View key={idx} style={[styles.tag, { borderColor: project.color }]}>
                          <Text style={[styles.tagText, { color: project.color }]}>{tag}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                      {project.githubUrl && (
                        <TouchableOpacity
                          onPress={(e) => {
                            e.stopPropagation();
                            handleLinkPress(project.githubUrl);
                          }}
                          style={styles.actionButton}
                        >
                          <Ionicons name="logo-github" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                      )}
                      {project.demoUrl && (
                        <TouchableOpacity
                          onPress={(e) => {
                            e.stopPropagation();
                            handleLinkPress(project.demoUrl);
                          }}
                          style={styles.actionButton}
                        >
                          <Ionicons name="globe" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        onPress={() => handleProjectPress(project)}
                        style={[styles.actionButton, { backgroundColor: project.color }]}
                      >
                        <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>

        {/* Stats Section */}
        <Animatable.View animation="fadeIn" delay={600} duration={800}>
          <View style={styles.statsContainer}>
            <LinearGradient
              colors={['rgba(108, 99, 255, 0.2)', 'rgba(255, 101, 132, 0.2)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statsCard}
            >
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{projects.length}+</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>10+</Text>
                <Text style={styles.statLabel}>Technologies</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>2+</Text>
                <Text style={styles.statLabel}>Years Exp</Text>
              </View>
            </LinearGradient>
          </View>
        </Animatable.View>
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
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  titleUnderline: {
    width: 60,
    height: 4,
    backgroundColor: '#6C63FF',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#B0B0C0',
    textAlign: 'center',
    marginBottom: 30,
  },
  projectsContainer: {
    marginBottom: 20,
  },
  projectCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
  },
  projectIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  projectContent: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: '#B0B0C0',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    marginTop: 10,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#B0B0C0',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(108, 99, 255, 0.3)',
  },
});

export default ProjectsSection;
