import { 
  StyleSheet, 
  Image, 
  Text, 
  View, 
  ActivityIndicator, 
  FlatList, 
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useEffect, useRef, useState } from 'react';
import { useCategories } from '@/api/service_providers';
import Header from '@/components/servicepage/Header';

interface CarouselItem {
  image: any; // Replace 'any' with the actual type of your image source
  title: string;
}

export default function Home() { 

const defaultimage = "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const [entries] = useState<CarouselItem[]>([
    { title: 'Emergency', image: require('@/assets/images/cars/emergency.jpeg') },
    { title: 'Spare parts', image: require('@/assets/images/cars/spareparts.jpeg') },
    { title: 'Inspection', image: require('@/assets/images/cars/mechanic.jpeg') },
    { title: 'Rental', image: require('@/assets/images/cars/rental.jpeg') },
    { title: 'Car Service', image: require('@/assets/images/cars/car-service.jpg') },
]);

const carouselRef = useRef<Carousel<CarouselItem> | null>(null);
const { data: service_categories, error, isLoading } = useCategories();
const { width: screenWidth } = Dimensions.get('window');

if (isLoading) {
    return <ActivityIndicator />;
}

if (error) { 
    return <Text>Failed to fetch services</Text>;
}

const _renderItem = ({ item, index }: { item: CarouselItem; index: number }) => (
    <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
    </View>
);

return (
  <FlatList
    data={service_categories}
    keyExtractor={(item) => item.id.toString()}  // Assuming 'id' is unique and exists
    renderItem={({ item }) => (
      <TouchableOpacity style={styles.flatimage}>
        <Image 
          source={{ uri: item?.image_url || defaultimage }} 
          style={{ borderRadius: 5, height: 100, width: 160 }} 
        />
        <Text style={{ color: '#000',fontWeight:'500'}}>{item.Name?.slice(0, 20)}</Text>
      </TouchableOpacity>
    )}
    numColumns={2}
    contentContainerStyle={{ gap: 10, padding: 10 }}
    columnWrapperStyle={{ gap: 10 }}
    ListHeaderComponent={() => (
      <>
        <Header />
        <Carousel
          ref={carouselRef}
          data={entries}
          renderItem={_renderItem}
          sliderWidth={screenWidth}  // Full screen width
          itemWidth={screenWidth * 0.95}  // 75% of screen width for each item
          autoplay={true}  // Enables autoplay
          autoplayDelay={500}  // Delay before autoplay starts (in milliseconds)
          autoplayInterval={3000}  // Interval between each slide (in milliseconds)
          loop={true}
        />
      </>
    )}
  />
);
}

const styles = StyleSheet.create({
slide: {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
},
image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
},
title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
},
flatimage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 8,
    borderColor: 'gray',
    backgroundColor: 'seablue',
   
}
});
