import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { supabase } from '@/lib/supabase';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-expo";
import { defaultStyles } from '@/constants/Styles';
import Header from '@/components/Header';
import { useQuery } from '@tanstack/react-query'
import * as Location from 'expo-location';
import Entypo from '@expo/vector-icons/Entypo';
import { useInsertCompany } from '@/api/service_providers';


export default function Home() {
  
   
  
  
return(
  <View style={{marginTop:20, padding:35}} >
    <Header/>
    <Text style={defaultStyles.header}>Vehicle Information</Text>
    <Text>Add your cars </Text>
<TouchableOpacity >
  <Text>Store Images here Information</Text>
</TouchableOpacity>
<View> 
          <TextInput style={defaultStyles.inputField}
          placeholder='Car Name'
          // value={businessname} 
          // onChangeText={setBusinessname}
          />
          
          <TextInput style={defaultStyles.inputField}
          placeholder='model'
          // value={telephone} 
          
          // onChangeText={setTelephone}
          />
          <TextInput style={defaultStyles.inputField}
          placeholder='year'
          keyboardType='number-pad'
          // value={address} 
          // onChangeText={setAddress}
          />

          <TextInput style={defaultStyles.inputField}
          placeholder='Color'
          // value={email} 
          // onChangeText={setEmail}
          />
         
         
          
         <TextInput style={defaultStyles.inputField}
          placeholder='Plate Number'
          // value={}
          // onChangeText={}/
       />

                  
 <TouchableOpacity style={defaultStyles.btn} >
      <Text style={{color:'white', fontSize:14}}>Save</Text>
    </TouchableOpacity>
  
     </View>
       
  </View> 
)

}