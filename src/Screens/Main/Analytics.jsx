import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import { COLOR } from '../../Constants/Colors';

const CarList = ({ navigation }) => {
  const [cars, setCars] = useState([
    {
      id: '1',
      image:
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg',
      model: 'Toyota Camry',
      number: 'RJ 14 CD 2345',
      modelYear: '2020',
      purchasedDate: '2021-03-15',
      owner: 'John Doe',
      condition: 'Excellent',
      gallery: [
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg',
        'https://cars.tatamotors.com/content/dam/tml/pv/products/tiago/year-2025/ice/promoting-vc/lifestyle/lifestyle-02.jpg',
        'https://hips.hearstapps.com/hmg-prod/images/alfa-romeo-stelvio-copy-6809446b927a6.jpg?crop=1.00xw:0.838xh;0,0.0626xh&resize=980:*',
      ],
    },
    {
      id: '2',
      image:
        'https://hips.hearstapps.com/hmg-prod/images/alfa-romeo-stelvio-copy-6809446b927a6.jpg?crop=1.00xw:0.838xh;0,0.0626xh&resize=980:*',
      model: 'Hyundai Venue',
      number: 'DL 01 AB 9988',
      modelYear: '2019',
      purchasedDate: '2020-06-10',
      owner: 'Priya Sharma',
      condition: 'Very Good',
      gallery: [
        'https://hips.hearstapps.com/hmg-prod/images/alfa-romeo-stelvio-copy-6809446b927a6.jpg?crop=1.00xw:0.838xh;0,0.0626xh&resize=980:*',
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg',
        'https://cars.tatamotors.com/content/dam/tml/pv/products/tiago/year-2025/ice/promoting-vc/lifestyle/lifestyle-02.jpg',
      ],
    },
  ]);

  const [expandedCarId, setExpandedCarId] = useState(null);

  const renderCar = ({ item }) => {
    const isExpanded = expandedCarId === item.id;

    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardShadow}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setExpandedCarId(isExpanded ? null : item.id)}
            style={styles.card}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.model}>{item.model}</Text>
              <Text style={styles.detail}>🚗 Number: {item.number}</Text>
              <Text style={styles.detail}>📅 Model Year: {item.modelYear}</Text>
              <Text style={styles.detail}>
                🛒 Purchased: {item.purchasedDate}
              </Text>
              <Text style={styles.detail}>👤 Owner: {item.owner}</Text>
              <Text style={styles.detail}>🔧 Condition: {item.condition}</Text>
            </View>
            <Text style={styles.arrowIcon}>{isExpanded ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {isExpanded && (
            <ScrollView
              horizontal
              style={styles.galleryContainer}
              showsHorizontalScrollIndicator={false}
            >
              {item.gallery.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={styles.galleryImage}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Cars" />
      <FlatList
        data={cars}
        keyExtractor={item => item.id}
        renderItem={renderCar}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddCar');
        }}
      >
        <Text style={styles.addButtonText}>+ Add Car</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CarList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 100,
    paddingHorizontal: 15,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  cardShadow: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
    padding: 14,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 14,
    backgroundColor: '#eee',
  },
  details: {
    flex: 1,
    justifyContent: 'space-around',
  },
  model: {
    fontSize: 17,
    fontWeight: '700',
    color: COLOR.royalBlue,
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: '#444',
    marginBottom: 2,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#999',
    marginLeft: 8,
  },
  galleryContainer: {
    paddingHorizontal: 14,
    paddingBottom: 10,
    paddingTop: 6,
  },
  galleryImage: {
    width: 100,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: COLOR.royalBlue,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
