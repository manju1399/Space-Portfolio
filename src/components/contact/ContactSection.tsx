import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import * as Haptics from "expo-haptics";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toast from "react-native-toast-message";
import StarryBackground from "../common/StarryBackground";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/myznnbov"; // replace with yours

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message is too short")
    .max(500, "Message is too long")
    .required("Message is required"),
});

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false); // ✅ new state

  const handleSubmit = async (values: any, { resetForm }: any) => {
    if (isSubmitting || isSent) return; // ✅ prevent re-send after success
    setIsSubmitting(true);

    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    try {
      const response = await axios.post(FORMSPREE_ENDPOINT, values, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Message Sent 🚀",
          text2: "I'll get back to you soon!",
        });
        resetForm();
        setIsSent(true); // ✅ mark sent

        if (Platform.OS !== "web") {
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
        }

        // Optional: re-enable after 1 minute
        // setTimeout(() => setIsSent(false), 60000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Oops! 😕",
        text2: "Something went wrong. Try again later.",
      });

      if (Platform.OS !== "web") {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialPress = async (url: string) => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) Linking.openURL(url);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: "logo-github",
      url: "https://github.com/manju1399",
      color: "#24292E",
    },
    {
      name: "LinkedIn",
      icon: "logo-linkedin",
      url: "https://www.linkedin.com/in/manjunath-a-9a2874217/",
      color: "#0A66C2",
    },
    {
      name: "Twitter",
      icon: "logo-twitter",
      url: "https://x.com/manjunath131999?s=2",
      color: "#1DA1F2",
    },
    {
      name: "Email",
      icon: "mail",
      url: "mailto:manjunath131999@gmail.com",
      color: "#EA4335",
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
        <Animatable.View animation="fadeInDown" duration={800}>
          <Text style={styles.sectionTitle}>Get In Touch</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.subtitle}>
            Let's collaborate on your next project! 🚀
          </Text>
        </Animatable.View>

        {/* Contact Form */}
        <Animatable.View animation="fadeInUp" delay={200} duration={800}>
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={ContactSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                {/* Name */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="person"
                      size={20}
                      color="#6C63FF"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Your name"
                      placeholderTextColor="#666"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>

                {/* Email */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="mail"
                      size={20}
                      color="#6C63FF"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="your.email@example.com"
                      placeholderTextColor="#666"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Message */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Message</Text>
                  <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                    <Ionicons
                      name="chatbubble"
                      size={20}
                      color="#6C63FF"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      placeholder="Your message..."
                      placeholderTextColor="#666"
                      multiline
                      numberOfLines={5}
                      textAlignVertical="top"
                      value={values.message}
                      onChangeText={handleChange("message")}
                      onBlur={handleBlur("message")}
                    />
                  </View>
                  {touched.message && errors.message && (
                    <Text style={styles.errorText}>{errors.message}</Text>
                  )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting || isSent}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={
                      isSent
                        ? ["#0F9D58", "#1B5E20"]
                        : isSubmitting
                        ? ["#444", "#222"]
                        : ["#6C63FF", "#FF6584"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.submitButton,
                      (isSubmitting || isSent) && { opacity: 0.7 },
                    ]}
                  >
                    {isSubmitting ? (
                      <>
                        <ActivityIndicator size="small" color="#FFF" />
                        <Text style={styles.submitButtonText}>Sending...</Text>
                      </>
                    ) : isSent ? (
                      <>
                        <Ionicons name="checkmark-circle" size={22} color="#FFF" />
                        <Text style={styles.submitButtonText}>Sent ✅</Text>
                      </>
                    ) : (
                      <>
                        <Ionicons name="send" size={20} color="#FFFFFF" />
                        <Text style={styles.submitButtonText}>Send Message</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </Animatable.View>

        {/* Social Links */}
        <Animatable.View animation="fadeInUp" delay={400} duration={800}>
          <Text style={styles.socialTitle}>Connect With Me</Text>
          <View style={styles.socialContainer}>
            {socialLinks.map((social, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSocialPress(social.url)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[`${social.color}40`, "rgba(20, 20, 42, 0.8)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.socialButton}
                >
                  <Ionicons
                    name={social.icon as any}
                    size={28}
                    color={social.color}
                  />
                  <Text style={styles.socialName}>{social.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </Animatable.View>

        {/* Footer */}
        <Animatable.View animation="fadeIn" delay={600} duration={800}>
          <Text style={styles.footer}>Made with ❤️ by Manjunath</Text>
        </Animatable.View>
      </ScrollView>

      {/* Toast Container */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A1A" },
  scrollView: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  titleUnderline: {
    width: 60,
    height: 4,
    backgroundColor: "#6C63FF",
    alignSelf: "center",
    borderRadius: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#B0B0C0",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: { marginBottom: 20 },
  inputLabel: { fontSize: 14, color: "#FFFFFF", marginBottom: 8, fontWeight: "600" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20,20,42,0.8)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(108,99,255,0.3)",
    paddingHorizontal: 15,
  },
  textAreaWrapper: { alignItems: "flex-start", paddingTop: 15 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: "#FFFFFF", fontSize: 14, paddingVertical: 15 },
  textArea: { height: 120, textAlignVertical: "top" },
  errorText: { color: "#FF6584", fontSize: 12, marginTop: 5, marginLeft: 5 },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  socialTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
  },
  socialButton: {
    width: 160,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(108,99,255,0.3)",
    gap: 10,
  },
  socialName: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  footer: { fontSize: 14, color: "#B0B0C0", textAlign: "center", marginTop: 10 },
});

export default ContactSection;



// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// import * as Haptics from 'expo-haptics';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import StarryBackground from '../common/StarryBackground';

// const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myznnbov'; // Replace with your Formspree form ID

// const ContactSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, 'Name is too short')
//     .max(50, 'Name is too long')
//     .required('Name is required'),
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   message: Yup.string()
//     .min(10, 'Message is too short')
//     .max(500, 'Message is too long')
//     .required('Message is required'),
// });

// const ContactSection = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (values: any, { resetForm }: any) => {
//     setIsSubmitting(true);
//     if (Platform.OS !== 'web') {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//     }

//     try {
//       const response = await axios.post(FORMSPREE_ENDPOINT, values, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         Alert.alert(
//           'Success! 🚀',
//           'Your message has been sent successfully. I\'ll get back to you soon!',
//           [{ text: 'OK', onPress: () => resetForm() }]
//         );
//         if (Platform.OS !== 'web') {
//           await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//         }
//       }
//     } catch (error) {
//       Alert.alert(
//         'Oops! 😕',
//         'Something went wrong. Please try again or contact me directly.',
//         [{ text: 'OK' }]
//       );
//       if (Platform.OS !== 'web') {
//         await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSocialPress = async (url: string) => {
//     if (Platform.OS !== 'web') {
//       await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     }
//     const supported = await Linking.canOpenURL(url);
//     if (supported) {
//       await Linking.openURL(url);
//     }
//   };

//   const socialLinks = [
//     { name: 'GitHub', icon: 'logo-github', url: 'https://github.com/manju1399', color: '#24292E' },
//     { name: 'LinkedIn', icon: 'logo-linkedin', url: 'https://www.linkedin.com/in/manjunath-a-9a2874217/', color: '#0A66C2' },
//     { name: 'Twitter', icon: 'logo-twitter', url: 'https://x.com/manjunath131999?s=2', color: '#1DA1F2' },
//     { name: 'Email', icon: 'mail', url: 'mailto:manjunath131999@gmail.com', color: '#EA4335' },
//   ];

//   return (
//     <View style={styles.container}>
//       <StarryBackground />
//       <ScrollView 
//         style={styles.scrollView}
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <Animatable.View animation="fadeInDown" duration={800}>
//           <Text style={styles.sectionTitle}>Get In Touch</Text>
//           <View style={styles.titleUnderline} />
//           <Text style={styles.subtitle}>
//             Let's collaborate on your next project! 🚀
//           </Text>
//         </Animatable.View>

//         {/* Contact Info Cards */}
//         <Animatable.View animation="fadeInUp" delay={200} duration={800}>
//           <View style={styles.infoCardsContainer}>
//             <LinearGradient
//               colors={['rgba(108, 99, 255, 0.2)', 'rgba(20, 20, 42, 0.8)']}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.infoCard}
//             >
//               <View style={styles.infoIconContainer}>
//                 <Ionicons name="call" size={24} color="#6C63FF" />
//               </View>
//               <Text style={styles.infoLabel}>Phone</Text>
//               <Text style={styles.infoValue}>+91 8123685361</Text>
//             </LinearGradient>

//             <LinearGradient
//               colors={['rgba(255, 101, 132, 0.2)', 'rgba(20, 20, 42, 0.8)']}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.infoCard}
//             >
//               <View style={[styles.infoIconContainer, { backgroundColor: 'rgba(255, 101, 132, 0.2)' }]}>
//                 <Ionicons name="mail" size={24} color="#FF6584" />
//               </View>
//               <Text style={styles.infoLabel}>Email</Text>
//               <Text style={styles.infoValue} numberOfLines={1}>
//                 manjunath131999@gmail.com
//               </Text>
//             </LinearGradient>
//           </View>
//         </Animatable.View>

//         {/* Contact Form */}
//         <Animatable.View animation="fadeInUp" delay={400} duration={800}>
//           <Formik
//             initialValues={{ name: '', email: '', message: '' }}
//             validationSchema={ContactSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//               <View style={styles.formContainer}>
//                 {/* Name Input */}
//                 <View style={styles.inputContainer}>
//                   <Text style={styles.inputLabel}>Name</Text>
//                   <View style={styles.inputWrapper}>
//                     <Ionicons name="person" size={20} color="#6C63FF" style={styles.inputIcon} />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Your name"
//                       placeholderTextColor="#666"
//                       value={values.name}
//                       onChangeText={handleChange('name')}
//                       onBlur={handleBlur('name')}
//                     />
//                   </View>
//                   {touched.name && errors.name && (
//                     <Text style={styles.errorText}>{errors.name}</Text>
//                   )}
//                 </View>

//                 {/* Email Input */}
//                 <View style={styles.inputContainer}>
//                   <Text style={styles.inputLabel}>Email</Text>
//                   <View style={styles.inputWrapper}>
//                     <Ionicons name="mail" size={20} color="#6C63FF" style={styles.inputIcon} />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="your.email@example.com"
//                       placeholderTextColor="#666"
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                       value={values.email}
//                       onChangeText={handleChange('email')}
//                       onBlur={handleBlur('email')}
//                     />
//                   </View>
//                   {touched.email && errors.email && (
//                     <Text style={styles.errorText}>{errors.email}</Text>
//                   )}
//                 </View>

//                 {/* Message Input */}
//                 <View style={styles.inputContainer}>
//                   <Text style={styles.inputLabel}>Message</Text>
//                   <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
//                     <Ionicons name="chatbubble" size={20} color="#6C63FF" style={styles.inputIcon} />
//                     <TextInput
//                       style={[styles.input, styles.textArea]}
//                       placeholder="Your message..."
//                       placeholderTextColor="#666"
//                       multiline
//                       numberOfLines={5}
//                       textAlignVertical="top"
//                       value={values.message}
//                       onChangeText={handleChange('message')}
//                       onBlur={handleBlur('message')}
//                     />
//                   </View>
//                   {touched.message && errors.message && (
//                     <Text style={styles.errorText}>{errors.message}</Text>
//                   )}
//                 </View>

//                 {/* Submit Button */}
//                 <TouchableOpacity
//                   onPress={() => handleSubmit()}
//                   disabled={isSubmitting}
//                   activeOpacity={0.8}
//                 >
//                   <LinearGradient
//                     colors={isSubmitting ? ['#666', '#444'] : ['#6C63FF', '#FF6584']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                     style={styles.submitButton}
//                   >
//                     {isSubmitting ? (
//                       <Text style={styles.submitButtonText}>Sending...</Text>
//                     ) : (
//                       <>
//                         <Ionicons name="send" size={20} color="#FFFFFF" />
//                         <Text style={styles.submitButtonText}>Send Message</Text>
//                       </>
//                     )}
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </Formik>
//         </Animatable.View>

//         {/* Social Links */}
//         <Animatable.View animation="fadeInUp" delay={600} duration={800}>
//           <Text style={styles.socialTitle}>Connect With Me</Text>
//           <View style={styles.socialContainer}>
//             {socialLinks.map((social, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => handleSocialPress(social.url)}
//                 activeOpacity={0.8}
//               >
//                 <LinearGradient
//                   colors={[`${social.color}40`, 'rgba(20, 20, 42, 0.8)']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={styles.socialButton}
//                 >
//                   <Ionicons name={social.icon as any} size={28} color={social.color} />
//                   <Text style={styles.socialName}>{social.name}</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </Animatable.View>

//         {/* Footer */}
//         <Animatable.View animation="fadeIn" delay={800} duration={800}>
//           <Text style={styles.footer}>
//             Made with ❤️ by Manjunath
//           </Text>
//         </Animatable.View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0A0A1A',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   sectionTitle: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   titleUnderline: {
//     width: 60,
//     height: 4,
//     backgroundColor: '#6C63FF',
//     alignSelf: 'center',
//     borderRadius: 2,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#B0B0C0',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   infoCardsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   infoCard: {
//     flex: 1,
//     padding: 20,
//     borderRadius: 16,
//     marginHorizontal: 5,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(108, 99, 255, 0.3)',
//   },
//   infoIconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(108, 99, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#B0B0C0',
//     marginBottom: 5,
//   },
//   infoValue: {
//     fontSize: 12,
//     color: '#FFFFFF',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   formContainer: {
//     marginBottom: 30,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     marginBottom: 8,
//     fontWeight: '600',
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(20, 20, 42, 0.8)',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(108, 99, 255, 0.3)',
//     paddingHorizontal: 15,
//   },
//   textAreaWrapper: {
//     alignItems: 'flex-start',
//     paddingTop: 15,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     color: '#FFFFFF',
//     fontSize: 14,
//     paddingVertical: 15,
//   },
//   textArea: {
//     height: 120,
//     textAlignVertical: 'top',
//   },
//   errorText: {
//     color: '#FF6584',
//     fontSize: 12,
//     marginTop: 5,
//     marginLeft: 5,
//   },
//   submitButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     borderRadius: 12,
//     gap: 10,
//     shadowColor: '#6C63FF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.5,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   submitButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   socialTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 10,
//     marginBottom: 30,
//   },
//   socialButton: {
//     width: 160,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(108, 99, 255, 0.3)',
//     gap: 10,
//   },
//   socialName: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   footer: {
//     fontSize: 14,
//     color: '#B0B0C0',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// export default ContactSection;
