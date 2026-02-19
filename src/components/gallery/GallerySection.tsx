import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import StarryBackground from '../common/StarryBackground';



interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: string;
  color: string;
}

const GallerySection = () => {
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  // Calculate card width based on screen size
  // On desktop, we want smaller cards to show multiple at once
  // On mobile, full width minus padding
  const CARD_WIDTH = isDesktop ? 400 : width - 60;

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Modern and responsive web applications',
      category: 'Development',
      color: '#6C63FF',
    },
    {
      id: 2,
      title: 'Mobile Apps',
      description: 'Cross-platform mobile solutions',
      category: 'Development',
      color: '#FF6584',
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive interfaces',
      category: 'Design',
      color: '#00CED1',
    },
    {
      id: 4,
      title: 'Backend Systems',
      description: 'Scalable server architectures',
      category: 'Development',
      color: '#FFD700',
    },
    {
      id: 5,
      title: 'Database Design',
      description: 'Efficient data management solutions',
      category: 'Development',
      color: '#9370DB',
    },
    {
      id: 6,
      title: 'API Development',
      description: 'RESTful and GraphQL APIs',
      category: 'Development',
      color: '#FF8C00',
    },
  ];

  const toggleViewMode = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setViewMode(viewMode === 'slider' ? 'grid' : 'slider');
  };

  const handleImagePress = async (item: GalleryItem) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedImage(item);
  };

  const renderSliderView = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 20} // Card width + margin
      snapToAlignment="center"
      decelerationRate="fast"
      contentContainerStyle={styles.sliderContainer}
    >
      {galleryItems.map((item, index) => (
        <Animatable.View
          key={item.id}
          animation="fadeInRight"
          delay={index * 100}
          duration={600}
        >
          <TouchableOpacity
            onPress={() => handleImagePress(item)}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[`${item.color}40`, 'rgba(20, 20, 42, 0.9)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.sliderCard, { width: CARD_WIDTH }]}
            >
              <View style={[styles.imageIconContainer, { backgroundColor: `${item.color}30` }]}>
                <Ionicons name="images" size={80} color={item.color} />
              </View>
              <View style={styles.sliderCardContent}>
                <View style={[styles.categoryBadge, { backgroundColor: `${item.color}20` }]}>
                  <Text style={[styles.categoryText, { color: item.color }]}>{item.category}</Text>
                </View>
                <Text style={styles.sliderTitle}>{item.title}</Text>
                <Text style={styles.sliderDescription}>{item.description}</Text>
                <TouchableOpacity style={[styles.viewButton, { backgroundColor: item.color }]}>
                  <Text style={styles.viewButtonText}>View Details</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      ))}
    </ScrollView>
  );

  const renderGridView = () => (
    <View style={styles.gridContainer}>
      {galleryItems.map((item, index) => (
        <Animatable.View
          key={item.id}
          animation="zoomIn"
          delay={index * 50}
          duration={400}
          style={styles.gridItemWrapper}
        >
          <TouchableOpacity
            onPress={() => handleImagePress(item)}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[`${item.color}40`, 'rgba(20, 20, 42, 0.9)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gridCard}
            >
              <View style={[styles.gridIconContainer, { backgroundColor: `${item.color}30` }]}>
                <Ionicons name="images" size={40} color={item.color} />
              </View>
              <Text style={styles.gridTitle} numberOfLines={1}>{item.title}</Text>
              <View style={[styles.gridCategoryBadge, { backgroundColor: `${item.color}20` }]}>
                <Text style={[styles.gridCategoryText, { color: item.color }]}>{item.category}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StarryBackground />
      <View style={styles.header}>
        {/* Title */}
        <Animatable.View animation="fadeInDown" duration={800}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <View style={styles.titleUnderline} />
        </Animatable.View>

        {/* View Mode Toggle */}
        <Animatable.View animation="fadeIn" delay={300} duration={800}>
          <TouchableOpacity onPress={toggleViewMode} style={styles.toggleButton}>
            <LinearGradient
              colors={['#6C63FF', '#FF6584']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.toggleGradient}
            >
              <Ionicons
                name={viewMode === 'slider' ? 'grid' : 'albums'}
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.toggleText}>
                {viewMode === 'slider' ? 'Grid View' : 'Slider View'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      {/* Content */}
      {viewMode === 'slider' ? renderSliderView() : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderGridView()}
        </ScrollView>
      )}

      {/* Detail Modal */}
      <Modal
        visible={selectedImage !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          <Animatable.View animation="zoomIn" duration={300} style={styles.modalWrapper}>
            <LinearGradient
              colors={[`${selectedImage?.color}40` || '#6C63FF40', 'rgba(20, 20, 42, 0.98)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.modalContent}
            >
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedImage(null)}
              >
                <Ionicons name="close-circle" size={36} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={[styles.modalImageContainer, { backgroundColor: `${selectedImage?.color}30` }]}>
                <Ionicons name="images" size={100} color={selectedImage?.color} />
              </View>

              <View style={[styles.modalCategoryBadge, { backgroundColor: `${selectedImage?.color}20` }]}>
                <Text style={[styles.modalCategoryText, { color: selectedImage?.color }]}>
                  {selectedImage?.category}
                </Text>
              </View>

              <Text style={styles.modalTitle}>{selectedImage?.title}</Text>
              <Text style={styles.modalDescription}>{selectedImage?.description}</Text>

              <View style={styles.modalStats}>
                <View style={styles.modalStatItem}>
                  <Ionicons name="eye" size={20} color="#6C63FF" />
                  <Text style={styles.modalStatText}>1.2k views</Text>
                </View>
                <View style={styles.modalStatItem}>
                  <Ionicons name="heart" size={20} color="#FF6584" />
                  <Text style={styles.modalStatText}>234 likes</Text>
                </View>
              </View>
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
  header: {
    padding: 20,
    paddingBottom: 10,
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
    marginBottom: 20,
  },
  toggleButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  toggleGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  toggleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  sliderContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: 'center',
  },
  sliderCard: {
    // width is now set dynamically in style prop
    height: 450,
    borderRadius: 24,
    marginRight: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
  },
  imageIconContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderCardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sliderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sliderDescription: {
    fontSize: 14,
    color: '#B0B0C0',
    lineHeight: 20,
    marginBottom: 20,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  contentWeb: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItemWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  gridCard: {
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
    minHeight: 150,
  },
  gridIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  gridCategoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  gridCategoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '90%',
    maxWidth: 400,
  },
  modalContent: {
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
    zIndex: 10,
  },
  modalImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalCategoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 15,
  },
  modalCategoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#B0B0C0',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalStats: {
    flexDirection: 'row',
    gap: 30,
  },
  modalStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalStatText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
});

export default GallerySection;
