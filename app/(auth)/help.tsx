import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';


const Page = () => {

  enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook',
  }

  const router = useRouter();
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });
  
    const onSelectAuth = async (strategy: Strategy) => {
      const selectedAuth = {
        [Strategy.Google]: googleAuth,
        [Strategy.Apple]: appleAuth,
        [Strategy.Facebook]: facebookAuth,
      }[strategy];
  
      try {
        const { createdSessionId, setActive } = await selectedAuth();
  
        if (createdSessionId) {
          setActive!({ session: createdSessionId });
          router.back();
        }
      } catch (err) {
        console.error('OAuth error', err);
      }
    };
  return (
  <View>
    <Text>Help</Text>
    {/* async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }
     */}
</View>
);
};

export default Page;

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
padding: 26,
},

seperatorView: {
flexDirection: 'row',
gap: 10,
alignItems: 'center',
marginVertical: 30,
},
seperator: {
fontFamily: 'mon-sb',
color: Colors.gray,
fontSize: 16,
},
btnOutline: {
backgroundColor: '#fff',
borderWidth: 1,
borderColor: Colors.gray,
height: 50,
borderRadius: 8,
alignItems: 'center',
justifyContent: 'center',
flexDirection: 'row',
paddingHorizontal: 10,
},
btnOutlineText: {
color: '#000',
fontSize: 16,
fontFamily: 'mon-sb',
},
});