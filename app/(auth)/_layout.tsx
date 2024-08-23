import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, router, Stack, Redirect, useSegments, useRouter, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, Pressable } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';



export default function AuthLayout() {
  const { isAuthenticated} = useAuth();
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem('userType');
        setUserType(storedUserType);
      } catch (error) {
        console.error('Failed to retrieve user type:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      checkUserType();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <Spinner visible={loading} />;
  }

  if (isAuthenticated && userType) {
    if (userType === 'Car_Owner') {
      return <Redirect href="/(CarOwner)/" />;
    } else if (userType === 'Service_Provider') {
      return <Redirect href="/(ServiceProvider)/" />;
    }
  }

return <Slot/>;
  // return (
  //   <Stack >
  //     <Stack.Screen name="index" options={{ headerShown: false }} />
  //     <Stack.Screen
  //       name="signup11"
  //       options={{
  //         title: '',
  //         headerBackTitle: '',
  //         headerShadowVisible: false,
  //         headerStyle: { backgroundColor: Colors.background },
  //         headerLeft: () => (
  //           <TouchableOpacity onPress={router.back}>
  //             <Ionicons name="arrow-back" size={34} color={Colors.dark} />
  //           </TouchableOpacity>
  //         ),
         
  //       }}
  //     />

  //     <Stack.Screen
  //       name="login"
  //       options={{
  //         title: '',
  //         headerBackTitle: '',
  //         headerShadowVisible: false,
          
  //         headerStyle: { backgroundColor: Colors.background },
  //         headerLeft: () => (
  //           <TouchableOpacity onPress={router.back}>
  //             <Ionicons name="arrow-back" size={34} color={Colors.dark} />
  //           </TouchableOpacity>
  //         ),
  //         headerRight: () => (
  //           <Link href={'/help'} asChild>
  //             <TouchableOpacity>
  //               <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
  //             </TouchableOpacity>
  //           </Link>
  //         ),
  //       }}
  //     />

  //     <Stack.Screen name="help" options={{ title: 'Help', presentation: 'modal', }} />
          
      
  //   </Stack>
  // );

}
