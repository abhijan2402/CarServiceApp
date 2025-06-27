import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLOR } from '../../Constants/Colors';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Car wash service',
    description: 'Simple to standard car service that your car deserves.',
    image:
      'https://www.shutterstock.com/image-photo/advertising-style-photo-professional-car-600nw-2287564719.jpg', // Replace with your custom illustration URL
  },
  {
    key: '2',
    title: 'Book Services Anytime',
    description:
      'Easily schedule car servicing, oil changes, and inspections—anytime, anywhere.',
    image:
      'https://wallpaperbat.com/img/618463-nice-car-wallpaper-top-free-nice-car-background.jpg',
  },
  {
    key: '3',
    title: 'Track Service History',
    description:
      'Keep a digital log of your car’s service history and receive timely reminders.',
    image:
      'https://media.istockphoto.com/id/1373210791/photo/rearview-of-parked-cars.jpg?s=612x612&w=0&k=20&c=RtaYQ7REicSGjsT9Wxg_wEwZQD1yQu6OJ-5HznqBskU=',
  },
];

const OnBoarding = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Login');
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.slide]}>
      <Image
        source={{ uri: item.image }}
        style={[styles.image, { height: height * 0.5 }]}
        resizeMode="cover"
      />
      <Text style={[styles.title, { color: '#FFFFFF' }]}>{item.title}</Text>
      <Text style={[styles.description, { color: '#D1D5DB' }]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <TouchableOpacity
        style={{ width: width, alignItems: 'center', marginBottom: 50 }}
        onPress={handleNext}
      >
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/7915/7915208.png',
          }}
          style={{
            width: 80,
            height: 80,
            marginBottom: 50,
            tintColor: COLOR.white,

            transform: [{ rotate: '180deg' }],
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  slide: {
    width: width,
    alignItems: 'center',
    // paddingTop: 50,
  },
  image: {
    height: height * 0.5,
    width: width,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLOR.royalBlue,
    textAlign: 'center',
    marginTop: 40,
  },
  description: {
    fontSize: 15,
    color: COLOR.black,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLOR.royalBlue,
    width: 20,
  },
  skipBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  skipText: {
    color: '#FFF',
    fontSize: 16,
  },
});
