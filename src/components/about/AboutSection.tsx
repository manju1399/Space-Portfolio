import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import StarryBackground from '../common/StarryBackground';

const AboutSection = () => {
  const education = [
    {
      degree: 'Bachelor of Engineering - Technology',
      institution: 'SKSJTI ENGINEERING COLLEGE',
      year: '2021',
      grade: 'Score: 7.65',
      icon: 'school',
    },
  ];

  const experience = [
    {
      role: 'Associate Software Engineer',
      company: 'Ezee.ai',
      period: '2025 - PRESENT',
      description: [
        'Developed and enhanced core platform features, contributing to major product releases and performance improvements',
        'Led and mentored junior team members, providing guidance on coding best practices and troubleshooting',
        'Took ownership of end-to-end module delivery, from requirement analysis to deployment and support',
      ],
      icon: 'briefcase',
    },
    {
      role: 'Junior Member of Technical Staff',
      company: 'Ezee.ai',
      period: '2025 - 2029',
      description: [
        'Designed and optimized Bash scripts for rapid processing of large files, significantly improving system efficiency',
        'Delivered major feature releases and enhancements, driving product stability and scalability',
        'Provided end-to-end platform support, ensuring high availability and quick resolution of production issues',
      ],
      icon: 'code-slash',
    },
    {
      role: 'Internship Trainee',
      company: 'Ezee.ai',
      period: '2024 - 2025',
      description: [
        'Developed strong skill set in Java script, Node.js and MongoDB',
        'Minor feature enhancements and bug fixes',
        'Managed Jenkins build trigger and docker deployments in server',
      ],
      icon: 'school',
    },
  ];

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
          <Text style={styles.sectionTitle}>About Me</Text>
          <View style={styles.titleUnderline} />
        </Animatable.View>

        {/* Personal Info */}
        <Animatable.View animation="fadeInUp" delay={200} duration={800}>
          <LinearGradient
            colors={['rgba(108, 99, 255, 0.1)', 'rgba(255, 101, 132, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.infoCard}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="person-circle" size={40} color="#6C63FF" />
            </View>
            <Text style={styles.infoText}>
              A motivated and detail-oriented software developer with hands-on experience
              in backend and server side technologies, including Node.js, MySQL,
              MongoDB, Docker and API integrations. Aiming to contribute to a forward-thinking
              organization by delivering high-quality solutions, solving complex challenges,
              and continuously expanding my technical expertise. Eager to embrace and learn
              emerging technologies to drive innovation and business success.
            </Text>
          </LinearGradient>
        </Animatable.View>

        {/* Contact Info */}
        <Animatable.View animation="fadeInUp" delay={400} duration={800}>
          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <Ionicons name="call" size={20} color="#6C63FF" />
              <Text style={styles.contactText}>+91 8123685361</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={20} color="#FF6584" />
              <Text style={styles.contactText}>manjunath131999@gmail.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="location" size={20} color="#6C63FF" />
              <Text style={styles.contactText}>Basavanagudi, Bangalore</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="globe" size={20} color="#6C63FF" />
              <Text style={styles.contactText}>https://manjunath-9913.web.app</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Education */}
        <Animatable.View animation="fadeInLeft" delay={600} duration={800}>
          <Text style={styles.subsectionTitle}>
            <Ionicons name="school" size={24} color="#6C63FF" /> Education
          </Text>
          {education.map((edu, index) => (
            <LinearGradient
              key={index}
              colors={['rgba(108, 99, 255, 0.15)', 'rgba(20, 20, 42, 0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardIconContainer}>
                  <Ionicons name={edu.icon as any} size={24} color="#6C63FF" />
                </View>
                <View style={styles.cardHeaderText}>
                  <Text style={styles.cardTitle}>{edu.degree}</Text>
                  <Text style={styles.cardSubtitle}>{edu.institution}</Text>
                </View>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardYear}>{edu.year}</Text>
                <Text style={styles.cardGrade}>{edu.grade}</Text>
              </View>
            </LinearGradient>
          ))}
        </Animatable.View>

        {/* Work Experience */}
        <Animatable.View animation="fadeInRight" delay={800} duration={800}>
          <Text style={styles.subsectionTitle}>
            <Ionicons name="briefcase" size={24} color="#FF6584" /> Work Experience
          </Text>
          {experience.map((exp, index) => (
            <LinearGradient
              key={index}
              colors={['rgba(255, 101, 132, 0.15)', 'rgba(20, 20, 42, 0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.cardIconContainer, { backgroundColor: 'rgba(255, 101, 132, 0.2)' }]}>
                  <Ionicons name={exp.icon as any} size={24} color="#FF6584" />
                </View>
                <View style={styles.cardHeaderText}>
                  <Text style={styles.cardTitle}>{exp.role}</Text>
                  <Text style={styles.cardSubtitle}>{exp.company}</Text>
                </View>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardYear}>{exp.period}</Text>
                {exp.description.map((desc, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <View style={styles.bullet} />
                    <Text style={styles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          ))}
        </Animatable.View>

        {/* Languages */}
        <Animatable.View animation="fadeInUp" delay={1000} duration={800}>
          <Text style={styles.subsectionTitle}>
            <Ionicons name="language" size={24} color="#6C63FF" /> Languages
          </Text>
          <View style={styles.languagesContainer}>
            {['English', 'Hindi', 'Kannada', 'Telugu', 'Tamil'].map((lang, index) => (
              <View key={index} style={styles.languageTag}>
                <Text style={styles.languageText}>{lang}</Text>
              </View>
            ))}
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
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
  },
  iconContainer: {
    marginRight: 15,
  },
  infoText: {
    flex: 1,
    color: '#E0E0E0',
    fontSize: 14,
    lineHeight: 22,
  },
  contactGrid: {
    marginBottom: 30,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 42, 0.6)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.2)',
  },
  contactText: {
    color: '#E0E0E0',
    fontSize: 13,
    marginLeft: 12,
    flex: 1,
  },
  subsectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 15,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#B0B0C0',
  },
  cardBody: {
    marginTop: 5,
  },
  cardYear: {
    fontSize: 13,
    color: '#6C63FF',
    marginBottom: 10,
    fontWeight: '600',
  },
  cardGrade: {
    fontSize: 13,
    color: '#E0E0E0',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6584',
    marginTop: 7,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    color: '#E0E0E0',
    fontSize: 13,
    lineHeight: 20,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  languageTag: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.4)',
  },
  languageText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AboutSection;
