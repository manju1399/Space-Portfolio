import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProjectDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { project } = route.params || {};

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Project not found</Text>
      </View>
    );
  }

  const handleOpenLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {project.image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: project.image }} style={styles.projectImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageGradient}
          />
          <Text style={styles.projectTitle}>{project.title}</Text>
        </View>
      )}

      <View style={styles.contentContainer}>
        <View style={styles.tagsContainer}>
          {project.tags?.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.description}>{project.description}</Text>

        {project.features && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {project.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonContainer}>
          {project.githubUrl && (
            <TouchableOpacity 
              style={[styles.button, styles.githubButton]}
              onPress={() => handleOpenLink(project.githubUrl)}
            >
              <Ionicons name="logo-github" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>View Code</Text>
            </TouchableOpacity>
          )}
          
          {project.demoUrl && (
            <TouchableOpacity 
              style={[styles.button, styles.demoButton]}
              onPress={() => handleOpenLink(project.demoUrl)}
            >
              <Ionicons name="globe" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Live Demo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(20, 20, 42, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  projectImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  projectTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  contentContainer: {
    padding: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.5)',
  },
  tagText: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    color: '#E0E0E0',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
    paddingLeft: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6C63FF',
    marginTop: 8,
    marginRight: 10,
  },
  featureText: {
    flex: 1,
    color: '#E0E0E0',
    fontSize: 14,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  githubButton: {
    backgroundColor: '#24292E',
  },
  demoButton: {
    backgroundColor: '#6C63FF',
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '600',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ProjectDetailsScreen;
