import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import { COLOR } from '../../Constants/Colors';

const Bids = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      carImage:
        'https://robbreport.com/wp-content/uploads/2024/08/temerario01.jpg?w=800',
      carName: 'Honda City 2022',
      serviceName: 'Full Body Wash',
      timeSlot: '10:30 AM - 11:00 AM',
      price: 599,
    },
    {
      id: '2',
      carImage:
        'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg',
      carName: 'Hyundai i20 2021',
      serviceName: 'Interior Cleaning',
      timeSlot: '11:00 AM - 11:30 AM',
      price: 399,
    },
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.carImage }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.carName}</Text>
        <Text style={styles.detail}>🛠 Service: {item.serviceName}</Text>
        <Text style={styles.detail}>⏰ Time Slot: {item.timeSlot}</Text>
        <Text style={[styles.detail, styles.price]}>₹{item.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title={'My Cart'} /> */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Bids;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafc',
  },
  listContent: {
    paddingBottom: 80,
    marginHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 14,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    shadowColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: COLOR.black,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  payButton: {
    backgroundColor: COLOR.royalBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
