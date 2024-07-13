import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function usertype() {
  return (
    <View style={{flex:1 ,backgroundColor:'yellow', alignItems: 'center',justifyContent:'center', gap:45}}>
                
                
                <TouchableOpacity>
                <View style={{display: 'flex', alignItems:'center'}}>
                <Image source={require('@/assets/new/man.png')} style={{width: 150, height: 150,  tintColor: '#000000',}}/>
                <Text> Car Owner</Text>
                </View></TouchableOpacity>


                <TouchableOpacity>
                <View style={{display: 'flex', alignItems:'center'}}>
                <Image source={require('@/assets/new/technical-service.png')} style={{width: 150, height: 150,  tintColor: '#000000',}}/>
                <Text> Service Provider</Text>
                </View></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})