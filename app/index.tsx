import Colors  from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { supabase } from '@/lib/supabase';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Session } from '@supabase/supabase-js';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { Link, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const Page = () => {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);

  const { user } = useUser();

 
  return <Redirect href='/(auth)/'/>
   
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
});
export default Page;