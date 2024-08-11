import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { supabase } from '@/lib/supabase';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';

export default function addItems() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    category();
  },[])

  const category = async () => {  
    try {
      const { data: service_categories, error } = await supabase
        .from('service_categories')
        .select('Name');
    
      if (error) {
        throw error;
      }
  
      console.log(service_categories); // Handle the data as needed
      setCategoryList(categoryList => ([...categoryList])); // Update the state with the fetched data

      return service_categories; // Return the data if needed elsewhere
    } catch (error) {
      console.log(error);
    }
  };





  return (
    <View style={{padding:50}}>
      <Text style={{fontSize:27, fontStyle:'italic', fontWeight:'600'}}>Add New Service</Text>
      <Text>Create new services for client</Text>
    <Formik 
    initialValues={{name:'',description:'',qty:'',price:'',category:''}}
    onSubmit={value=>console.log(value)}>
      {({handleChange,handleBlur,handleSubmit,values,setFieldValue})=> (
        <View> 
          <TextInput style={styles.input}
          placeholder='Name'
          value={values?.name}
          onChangeText={handleChange('name')}/>
          
          <TextInput style={styles.input}
          placeholder='Description'
          value={values?.description}
          numberOfLines={5}
          textAlignVertical='top'
          onChangeText={handleChange('description')}/>

          <TextInput style={styles.input}
          placeholder='Quantity'
          value={values?.qty}
          keyboardType='numeric'
          onChangeText={handleChange('qty')}/>

          <TextInput style={styles.input}
          placeholder='Price'
          keyboardType='numeric'
          value={values?.price}
          onChangeText={handleChange('price')}/>

          
         
      {/* Category List Dropdown */}

      <Picker>
        <Picker.Item label="Select Category" value="" />
        {categoryList.map((item,index)=>
          <Picker.Item key={index} label={item.name} value={item.name} />
        )}
   
      </Picker>

     

    <TouchableOpacity style={[defaultStyles.pillButton, {backgroundColor:'blue'}]} onPress={handleSubmit}>
      <Text style={{color:'white', fontSize:14}}>Save</Text>
    </TouchableOpacity>
   
        </View>
      )}

    </Formik>
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    borderWidth:1,
    borderRadius:10,
    padding:10,
    paddingHorizontal:10,
    fontSize:15,
     marginTop:10, marginBottom:5
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
