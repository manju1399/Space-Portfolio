import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import StarryBackground from '../common/StarryBackground';

interface Skill {
  name: string;
  icon: string;
  color: string;
  description: string;
  level: string;
}

const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const skills = {
    backend: [
      { name: 'Node.js', icon: 'logo-nodejs', color: '#339933', description: 'Server-side JavaScript with Event-driven architecture', level: 'Advanced' },
      { name: 'Express.js', icon: 'server', color: '#000000', description: 'Web application framework for Node.js', level: 'Advanced' },
      { name: 'REST APIs', icon: 'globe', color: '#6C63FF', description: 'Designing and implementing scalable APIs', level: 'Advanced' },
      { name: 'GraphQL', icon: 'logo-react', color: '#E10098', description: 'Data query language for APIs', level: 'Intermediate' },
      { name: 'Bash', icon: 'terminal', color: '#4EAA25', description: 'Shell scripting for automation', level: 'Advanced' },
    ],
    database: [
      { name: 'MongoDB', icon: 'leaf', color: '#47A248', description: 'GridFS, Aggregation Pipeline, Time series collections', level: 'Advanced' },
      { name: 'SQL', icon: 'server', color: '#4479A1', description: 'Relational database management', level: 'Intermediate' },
      { name: 'Redis', icon: 'layers', color: '#D82C20', description: 'In-memory data structure store', level: 'Intermediate' },
    ],
    messaging: [
      { name: 'RabbitMQ', icon: 'mail', color: '#FF6600', description: 'Message broker for asynchronous processing', level: 'Advanced' },
      { name: 'Kafka', icon: 'pulse', color: '#231F20', description: 'Distributed event streaming', level: 'Intermediate' },
    ],
    frontend: [
      { name: 'Angular', icon: 'logo-angular', color: '#DD0031', description: 'Platform for building mobile and desktop web apps', level: 'Intermediate' },
      { name: 'TypeScript', icon: 'logo-javascript', color: '#3178C6', description: 'Typed superset of JavaScript', level: 'Intermediate' },
      { name: 'HTML/CSS', icon: 'logo-html5', color: '#E34F26', description: 'Web standards and styling', level: 'Advanced' },
    ],
    devops: [
      { name: 'Docker', icon: 'cube', color: '#2496ED', description: 'Containerization platform', level: 'Advanced' },
      { name: 'Jenkins', icon: 'construct', color: '#D24939', description: 'Automation server for CI/CD', level: 'Intermediate' },
      { name: 'Azure', icon: 'cloud', color: '#007FFF', description: 'Cloud computing services', level: 'Intermediate' },
      { name: 'Nginx', icon: 'shuffle', color: '#009639', description: 'Web server and reverse proxy', level: 'Intermediate' },
    ],
    architecture: [
      { name: 'Microservices', icon: 'apps', color: '#6C63FF', description: 'Architectural style for distributed systems', level: 'Advanced' },
      { name: 'Event-driven', icon: 'flash', color: '#FFD700', description: 'Architecture based on event production and consumption', level: 'Advanced' },
      { name: 'Low-code', icon: 'options', color: '#FF6584', description: 'Config-driven platform design', level: 'Advanced' },
    ]
  };

  const handleSkillPress = async (skill: Skill) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedSkill(skill);
  };

  const renderSkillCard = (skill: Skill, index: number, delay: number) => (
    <Animatable.View
      key={index}
      animation="bounceIn"
      delay={delay}
      duration={800}
    >
      <TouchableOpacity
        onPress={() => handleSkillPress(skill)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[`${skill.color}20`, 'rgba(20, 20, 42, 0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.skillCard}
        >
          <View style={[styles.skillIconContainer, { backgroundColor: `${skill.color}30` }]}>
            <Ionicons name={skill.icon as any} size={32} color={skill.color} />
          </View>
          <Text style={styles.skillName}>{skill.name}</Text>
          <View style={[styles.levelBadge, { backgroundColor: `${skill.color}20` }]}>
            <Text style={[styles.levelText, { color: skill.color }]}>{skill.level}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <StarryBackground />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          isDesktop && styles.contentWeb
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={800}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.subtitle}>Tap on any skill to learn more</Text>
        </Animatable.View>

        <View style={isDesktop ? styles.categoriesGrid : null}>

          {/* Backend Skills */}
          <View style={[styles.categoryContainer, isDesktop && styles.categoryItem]}>
            <View style={styles.categoryHeader}>
              <Ionicons name="server" size={24} color="#339933" />
              <Text style={styles.categoryTitle}>Backend Development</Text>
            </View>
            <View style={styles.skillsGrid}>
              {skills.backend.map((skill, index) => renderSkillCard(skill, index, index * 100))}
            </View>
          </View>

          {/* Database Skills */}
          <View style={[styles.categoryContainer, isDesktop && styles.categoryItem]}>
            <View style={styles.categoryHeader}>
              <Ionicons name="server" size={24} color="#4479A1" />
              <Text style={styles.categoryTitle}>Database Technologies</Text>
            </View>
            <View style={styles.skillsGrid}>
              {skills.database.map((skill, index) => renderSkillCard(skill, index, index * 100))}
            </View>
          </View>

          {/* Messaging & Async */}
          <View style={[styles.categoryContainer, isDesktop && styles.categoryItem]}>
            <View style={styles.categoryHeader}>
              <Ionicons name="mail" size={24} color="#FF6600" />
              <Text style={styles.categoryTitle}>Messaging & Async</Text>
            </View>
            <View style={styles.skillsGrid}>
              {skills.messaging.map((skill, index) => renderSkillCard(skill, index, index * 100))}
            </View>
          </View>

          {/* Frontend Skills */}
          <View style={[styles.categoryContainer, isDesktop && styles.categoryItem]}>
            <View style={styles.categoryHeader}>
              <Ionicons name="desktop" size={24} color="#61DAFB" />
              <Text style={styles.categoryTitle}>Frontend Development</Text>
            </View>
            <View style={styles.skillsGrid}>
              {skills.frontend.map((skill, index) => renderSkillCard(skill, index, index * 100))}
            </View>
          </View>

          {/* DevOps */}
          <View style={[styles.categoryContainer, isDesktop && styles.categoryItem]}>
            <View style={styles.categoryHeader}>
              <Ionicons name="cloud" size={24} color="#2496ED" />
              <Text style={styles.categoryTitle}>DevOps & Cloud</Text>
            </View>
            <View style={styles.skillsGrid}>
              {skills.devops.map((skill, index) => renderSkillCard(skill, index, index * 100))}
            </View>
          </View>

          {/* Architecture */}
          <View style={[styles.categoryContainer, isDesktop && styles.categoryItem]}>
            <View style={styles.categoryHeader}>
              <Ionicons name="construct" size={24} color="#6C63FF" />
              <Text style={styles.categoryTitle}>Architecture & Design</Text>
            </View>
            <View style={styles.skillsGrid}>
              {skills.architecture.map((skill, index) => renderSkillCard(skill, index, index * 100))}
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Skill Detail Modal */}
      <Modal
        visible={selectedSkill !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedSkill(null)}
      >
        <View style={styles.modalContainer}>
          <Animatable.View animation="zoomIn" duration={300}>
            <LinearGradient
              colors={[selectedSkill?.color + '30' || '#6C63FF30', 'rgba(20, 20, 42, 0.95)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalContent}
            >
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedSkill(null)}
              >
                <Ionicons name="close-circle" size={32} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={[styles.modalIconContainer, { backgroundColor: selectedSkill?.color + '30' }]}>
                <Ionicons name={(selectedSkill?.icon || 'star') as any} size={60} color={selectedSkill?.color} />
              </View>

              <Text style={styles.modalTitle}>{selectedSkill?.name}</Text>

              <View style={[styles.modalLevelBadge, { backgroundColor: selectedSkill?.color + '20' }]}>
                <Text style={[styles.modalLevelText, { color: selectedSkill?.color }]}>
                  {selectedSkill?.level}
                </Text>
              </View>

              <Text style={styles.modalDescription}>{selectedSkill?.description}</Text>

              <TouchableOpacity
                onPress={() => setSelectedSkill(null)}
                style={[styles.modalButton, { backgroundColor: selectedSkill?.color }]}
              >
                <Text style={styles.modalButtonText}>Got it!</Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animatable.View>
        </View>
      </Modal>
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
  contentWeb: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 40,
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    marginBottom: 30,
  },
  categoryItem: {
    width: '48%', // 2 columns on desktop
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  skillCard: {
    width: 160,
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
  },
  skillIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 10,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  modalIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  modalLevelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  modalLevelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalDescription: {
    fontSize: 15,
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  modalButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SkillsSection;
