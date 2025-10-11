import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ProjectDetailsScreen from './src/screens/ProjectDetailsScreen';

const Stack = createStackNavigator();

// Custom theme for the app
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6C63FF',
    accent: '#FF6584',
    background: '#0A0A1A',
    card: '#14142A',
    text: '#FFFFFF',
    border: '#2A2A4A',
    notification: '#FF6584',
  },
};

export default function App() {
  const colorScheme = useColorScheme();
  
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.card,
                borderBottomColor: theme.colors.border,
                borderBottomWidth: 1,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: theme.colors.text,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                title: 'Cosmic Portfolio',
                headerShown: false 
              }} 
            />
            <Stack.Screen 
              name="ProjectDetails" 
              component={ProjectDetailsScreen} 
              options={{ 
                title: 'Project Details',
                headerBackTitle: 'Back'
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
