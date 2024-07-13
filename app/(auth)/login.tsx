import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as WebBrowser from "expo-web-browser";
import Spinner from 'react-native-loading-spinner-overlay';
import { supabase } from '@/lib/supabase';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
} from 'react-native';
import { isLoading } from 'expo-font';

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook',
  }

  export const useWarmUpBrowser = () => {
    useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }, []);
  };
  
  WebBrowser.maybeCompleteAuthSession();
  const Page = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
    useWarmUpBrowser();
    
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
        const { createdSessionId, setActive, signUp } = await selectedAuth();
  
        if (createdSessionId) {
          setActive!({ session: createdSessionId });
          console.log(signUp)
          if(signUp){
          
          
          const { data, error } = await supabase
          .from('users')
          .insert([
            { 
              name: signUp?.firstName + ' ' + signUp?.lastName , 
              email: signUp?.emailAddress
            },
          ])
          .select()
        
      
        
         console.log("user")
        
            if(data)
              {
                console.log(data);
              }  
          }
            /* const { data, error } = await supabase
            .from('users') 
            .insert([
              { name: signUp?.firstName + ' ' + signUp?.lastName, 
                email: signUp?.emailAddress},
            ])
            .select() */

            
            
          
         /*  router.back(); */
        }
      } catch (err) {
        console.error('OAuth error', err);
      }
    };

    const onSignInPress = async () => {
      if (!isLoaded) {
        return;
      }
      setLoading(true);
      try {
        const completeSignIn = await signIn.create({
          identifier: emailAddress,
          password,
        });
  
        // This indicates the user is signed in
        await setActive({ session: completeSignIn.createdSessionId });

        


      } catch (err: any) {
        alert(err.errors[0].message);
      } finally {
        setLoading(false);
      }
    };
  
  
    return (


      <View style={styles.container}>
          <Spinner visible={loading}/>
            <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>Welcome back</Text>
            <Text style={defaultStyles.descriptionText}>
            Enter the email to log into your account.
            </Text>
            </View>

        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          value={emailAddress} 
          onChangeText={setEmailAddress}
          style={[defaultStyles.inputField, { marginBottom: 5 }]}
        />

        <TextInput
          autoCapitalize="none"
          placeholder="password"
          value={password} 
          onChangeText={setPassword} secureTextEntry 
          style={[defaultStyles.inputField, { marginBottom: 5 }]}
        />


        <TouchableOpacity style={defaultStyles.btn}onPress={onSignInPress} >
          <Text style={defaultStyles.btnText}>Continue</Text>
        </TouchableOpacity>
  
<Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text>Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Create Account</Text>
        </Pressable>
      </Link>




        <View style={styles.seperatorView}>
          <View
            style={{
              flex: 1,
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Text style={styles.seperator}>or</Text>
          <View
            style={{
              flex: 1,
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>
  
        <View style={{ gap: 20 }}>
         
  
          <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
            <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
            <Text style={styles.btnOutlineText}>Continue with Apple</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
            <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} />
            <Text style={styles.btnOutlineText}>Continue with Google</Text>
          </TouchableOpacity>
  
         {/*  <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
            <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
            <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };
  
  export default Page;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
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
     button: {
    margin: 8,
    alignItems: 'center',
  },
  });