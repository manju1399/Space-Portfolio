import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export const triggerHaptic = async (style: 'light' | 'medium' | 'heavy' = 'medium') => {
  // Haptics only work on native platforms (iOS/Android), not on web
  if (Platform.OS === 'web') {
    return;
  }

  try {
    const impactStyle = 
      style === 'light' ? Haptics.ImpactFeedbackStyle.Light :
      style === 'heavy' ? Haptics.ImpactFeedbackStyle.Heavy :
      Haptics.ImpactFeedbackStyle.Medium;
    
    await Haptics.impactAsync(impactStyle);
  } catch (error) {
    // Silently fail if haptics are not available
    console.log('Haptics not available');
  }
};

export const triggerNotification = async (type: 'success' | 'warning' | 'error' = 'success') => {
  if (Platform.OS === 'web') {
    return;
  }

  try {
    const notificationType =
      type === 'success' ? Haptics.NotificationFeedbackType.Success :
      type === 'warning' ? Haptics.NotificationFeedbackType.Warning :
      Haptics.NotificationFeedbackType.Error;
    
    await Haptics.notificationAsync(notificationType);
  } catch (error) {
    console.log('Haptics not available');
  }
};
