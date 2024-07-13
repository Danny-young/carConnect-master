import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { Link, Stack, useRouter } from 'expo-router';
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
import Spinner from 'react-native-loading-spinner-overlay';
import { supabase } from '@/lib/supabase';

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook',
  }
  const Page = () => {
  const signup = useSignUp
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });


      if(password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }        

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId});

      if(signUp){

        const { data, error } = await supabase
        .from('users')
        .insert([
          { name: signUp?.username, 
            email: signUp?.emailAddress},
        ])
        .select()
        
    
        if(data)
          {
            console.log(data);
          }  
      }

    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
    
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
         /*  router.back(); */
         if(signUp){

          const { data, error } = await supabase
          .from('users')
          .insert([
            { name: signUp?.username, 
              email: signUp?.emailAddress},
          ])
          .select()
          
      
          if(data)
            {
              console.log(data);
            }  
        }
        }
      } catch (err) {
        console.error('OAuth error', err);
      }
    };
  
    return (
      <View style={styles.container}>

    <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
    <Spinner visible={loading} />

        
      <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Let's get started!</Text>
      <Text style={defaultStyles.descriptionText}>
      Enter your e-mail. We will send you a confirmation code there
      </Text>
      </View>
      {!pendingVerification && (
        <>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          value={emailAddress} 
          onChangeText={setEmailAddress} 
          style={[defaultStyles.inputField, { marginBottom: 20 }]}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="password"
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry
          style={[defaultStyles.inputField, { marginBottom: 20 }]}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword} 
          onChangeText={setconfirmPassword} 
          style={[defaultStyles.inputField, { marginBottom: 20 }]}
        />
  
        <TouchableOpacity style={defaultStyles.btn} onPress={onSignUpPress}>
          <Text style={defaultStyles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        </>
      )}

{pendingVerification && (
        <>
          <View>
            <TextInput value={code} placeholder="Code..." style={defaultStyles.btn} onChangeText={setCode} />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
          <Text style={{color:'black'}}>Verify Email</Text></TouchableOpacity>
        </>
      )}
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
  
         
        </View>
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