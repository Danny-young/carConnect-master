import { Image, StyleSheet, Platform, View, SafeAreaView, Text } from 'react-native';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import { useMemo, useState } from 'react';
//import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import listingsData from '@/assets/data/airbnb-listings.json';
import ListingsMaps from '@/components/ListingsMaps';
import Listings from '@/components/Listings';


export default function CarOwnerHome() {
  const [category, setCategory] = useState<string>('Tiny homes');
 
 const items = useMemo(() => listingsData as any, []);
  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <View style={{flex:1, marginTop:40}}>
    <ExploreHeader onCategoryChanged={onDataChanged}/>
    <Listings listings={items} category={category} />
{/* 
    <ListingsMaps listings={listingsDataGeo}/> */}
    </View>
   
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

 
