import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserType from '@/app/(auth)/'
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Settings from '@/components/userSettings';
import { supabase } from '@/lib/supabase';
import { Redirect } from 'expo-router';
 
export default  function profile() {
  const { top } = useSafeAreaInsets();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      // Optionally, navigate the user to a login or welcome screen
      <Redirect href='/(auth)/'/>
    }
  };

  // const [userType, setUserType] = useState(null);
  // useEffect(() => {
  //   const fetchUserType = async () => {
  //     try {
  //       const userTypeValue = await AsyncStorage.getItem('userType');
  //       if (userTypeValue !== null) {
  //         setUserType(userTypeValue); // Set the state if the value is not null
  //       } else {
  //         setUserType('Guest'); // Or set a default value like 'Guest'
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user type:', error);
  //     }
  //   };

  //   fetchUserType();
  // }, []);

  // if (userType === null) {
  //   // Optionally render a loading state while waiting for the value
  //   return <Text>Loading...</Text>;
  // }

  // color: string;
  //   iconName: string;
  //   vectorName: 'FontAwesome5' | 'Ionicons';
  //   size: number;

  return (
    <View style={{padding:top}}>
        <Text style={{textAlign:'center', fontSize:22}}>Profile</Text>

        {/* <UserType/> */}
       <Settings name='Edit' color='black' iconName='user' size={22} vectorName='FontAwesome5'/>
       <Settings name='Favorite' color='black' iconName='favorite' size={22} vectorName='MaterialIcons'/>
       <Settings name='My car' color='black' iconName='car' size={22} vectorName='FontAwesome5'/>
       <Settings name='Language' color='black' iconName='language' size={22} vectorName='FontAwesome5'/>
       <Settings name='Terms and Condition' color='black' iconName='book' size={22} vectorName='FontAwesome5'/>
       <Settings name='Privacy policy' color='black' iconName='policy' size={22} vectorName='MaterialIcons'/>
       <Settings name='Help and support' color='black' iconName='help-circle-sharp' size={26} vectorName='Ionicons'/>
       <Settings name='Logout' color='red' iconName='logout' size={28} vectorName='MaterialIcons'/>
   
   <TouchableOpacity onPress={handleLogout}>
    <Text>Outtttt</Text>
    </TouchableOpacity>
    </View>
  )
}