
import { useFonts } from 'expo-font';
import { Link, router, Stack, Redirect, useSegments, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, Pressable } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { Slot } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { FontAwesome ,  Ionicons } from '@expo/vector-icons';



export default function carOwnerLayout() {
  const { isAuthenticated} = useAuth();
  console.log('isAuthenticated', isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/" />;
  }

  return  (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> 
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <Ionicons size={30} name="map" color={color} /> 
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="heart-outline" color={color} />          
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-circle-outline" color={color} />
        
        }}/>
    </Tabs>)
  
  
  }
  