import Colors from '@/constants/Colors';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import QueryProvider from '@/providers/QueryProvider';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
/* const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY; */
import * as SecureStore from 'expo-secure-store';
import { Slot } from "expo-router";
const CLERK_PUBLISHABLE_KEY ='pk_test_YWRqdXN0ZWQtYnV6emFyZC02LmNsZXJrLmFjY291bnRzLmRldiQ';
import AuthProvider from '@/providers/AuthProvider'

/* pk_test_dG91Y2hpbmctYmVkYnVnLTQ0LmNsZXJrLmFjY291bnRzLmRldiQ'; */


  const InitialLayout = () => {

 const [loaded, error] = useFonts({
  SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),   
  mon: require('../assets/fonts/Montserrat-Regular.ttf'),
  'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
  'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'), 


 });

    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    
    return <Slot />;
  };
  
  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };
  
  const RootLayout = () => {
    return (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <AuthProvider>
       <QueryProvider>
        <InitialLayout />
        </QueryProvider>
        </AuthProvider>
      </ClerkProvider>
    );
  };
  
  export default RootLayout;
  