import Colors from '@/constants/Colors';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, router, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, Pressable } from 'react-native';





export default function OnBoardingLayout() {
  
  return (
    <Stack>
    <Stack.Screen name="Username" options={{ headerShown: false }} />          
    <Stack.Screen name="AccountType" options={{ headerShown: false, presentation: 'modal' }} />   
               
  </Stack>
  );

}
