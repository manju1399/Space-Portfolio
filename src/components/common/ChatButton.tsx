import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! I'm Manjunath's virtual assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const predefinedQuestions = [
    { question: "Who are you?", answer: "I'm Manjunath, a motivated software developer with hands-on experience in backend and server side technologies. Currently working as Associate Software Engineer at Ezee.ai!" },
    { question: "What technologies do you use?", answer: "I work with Node.js, React, React Native, MongoDB, MySQL, Docker, Jenkins, Bash scripting, and API integrations. I'm always learning new technologies!" },
    { question: "Can I collaborate with you?", answer: "Absolutely! I'm always open to exciting collaborations and new opportunities. Feel free to reach out through the Contact section!" },
    { question: "How can I contact you?", answer: "You can reach me at +91 8123685361 or email me at manjunath131999@gmail.com. I'm also available on LinkedIn!" },
    { question: "Show me your latest projects", answer: "Check out the Projects section to see my latest work including MJR File converter, Portfolio website, and various other exciting projects!" },
  ];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping]);

  const handleQuestionPress = async (question: string, answer: string) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Add user message
    const userMessage: Message = {
      id: messages.length,
      text: question,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: messages.length + 1,
        text: answer,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  const toggleChat = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Animated.View style={[styles.floatingButton, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity onPress={toggleChat} activeOpacity={0.8}>
          <LinearGradient
            colors={['#6C63FF', '#FF6584']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.chatButton}
          >
            <Ionicons name={isOpen ? "close" : "chatbubbles"} size={28} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleChat}
      >
        <View style={styles.modalContainer}>
          <View style={styles.chatContainer}>
            {/* Header */}
            <LinearGradient
              colors={['#6C63FF', '#5A52D5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.chatHeader}
            >
              <View style={styles.headerContent}>
                <View style={styles.avatarContainer}>
                  <Ionicons name="chatbubbles" size={24} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.headerTitle}>Chat Assistant</Text>
                  <Text style={styles.headerSubtitle}>Ask me anything!</Text>
                </View>
              </View>
              <TouchableOpacity onPress={toggleChat}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>

            {/* Messages */}
            <ScrollView 
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageBubble,
                    message.isUser ? styles.userMessage : styles.botMessage,
                  ]}
                >
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
              ))}
              
              {isTyping && (
                <View style={[styles.messageBubble, styles.botMessage]}>
                  <View style={styles.typingIndicator}>
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                    <View style={styles.typingDot} />
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Quick Questions */}
            <View style={styles.questionsContainer}>
              <Text style={styles.questionsTitle}>Quick Questions:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {predefinedQuestions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleQuestionPress(item.question, item.answer)}
                    style={styles.questionButton}
                  >
                    <Text style={styles.questionText}>{item.question}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  chatButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  chatContainer: {
    backgroundColor: '#14142A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    overflow: 'hidden',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  messagesContent: {
    padding: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6C63FF',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1A1A2E',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  typingIndicator: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6C63FF',
  },
  questionsContainer: {
    padding: 15,
    backgroundColor: '#14142A',
    borderTopWidth: 1,
    borderTopColor: '#2A2A4A',
  },
  questionsTitle: {
    color: '#B0B0C0',
    fontSize: 12,
    marginBottom: 10,
  },
  questionButton: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  questionText: {
    color: '#6C63FF',
    fontSize: 13,
  },
});

export default ChatButton;
