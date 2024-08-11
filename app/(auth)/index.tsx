import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '@/lib/supabase';
import { Button, Input } from '@rneui/themed';

export default function Auth() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if(!session) {
	
      return JSON.stringify(session)
    
     } else {
      const user = await supabase
      .from('users')
      .insert({ id: session.user?.id, email:email}).select();
      
      Alert.alert('User created successfully');
     }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
        // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
        />

       
      </View>
      <View style={styles.verticallySpaced}>

      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
        />
              
        
     
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
         disabled={loading} 
         onPress={signInWithEmail}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
       
      </View>
      <View style={styles.verticallySpaced}>
      <TouchableOpacity
         disabled={loading} 
         onPress={signUpWithEmail}
        >
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
