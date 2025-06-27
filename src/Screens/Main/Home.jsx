import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { COLOR } from '../../Constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { windowWidth } from '../../Constants/Dimensions';

const { width } = Dimensions.get('window');

const categories = ['Wash', 'Repair', 'Service', 'Tyres', 'AC Check'];

const banners = [
  'https://img.freepik.com/free-photo/car-mechanic-checking-car-engine-oil_1170-1519.jpg',
  'https://www.spinny.com/blog/wp-content/uploads/2024/09/videoframe_0-1160x653.webp',
  'https://img.freepik.com/free-photo/close-up-man-working-car-engine_23-2149370923.jpg',
];

const services = [
  {
    id: '1',
    title: 'Engine Check',
    image:
      'https://media.istockphoto.com/id/1181204772/photo/engine-check-light-on-car-dashboard.jpg?s=612x612&w=0&k=20&c=HJUYTYw_ppVImk1XjqZtkPp0lsRMfG6JR2T33b-egbY=',
  },
  {
    id: '2',
    title: 'Dent Repair',
    image:
      'https://media.istockphoto.com/id/872507248/photo/repairing-dents-in-a-car.jpg?s=612x612&w=0&k=20&c=hi4g-pmBLMKeSyR3NhuQa6-Ehui-6GLhRaJKAwfbbxs=',
  },
  {
    id: '3',
    title: 'Car Wash',
    image:
      'https://wallpapers.com/images/featured/car-wash-0d91u3sqo0qw441a.jpg',
  },
  {
    id: '4',
    title: 'Battery Check',
    image:
      'https://media.istockphoto.com/id/835036172/photo/battery.jpg?s=612x612&w=0&k=20&c=YliROYVt5lIJY5C_lYT19Xx764IHqaw__DWahtWmMNI=',
  },
];
const orders = [
  {
    id: '1',
    title: 'AC Service',
    date: '20 June 2025',
    amount: '₹999',
    image:
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg',
  },
  {
    id: '2',
    title: 'Oil Change',
    date: '18 June 2025',
    amount: '₹1,499',
    image:
      'https://play-lh.googleusercontent.com/4V6OyD55nW9YOgwF7xfjxf-0k1BuYtuP2oMW-CDUC9LbRGbTk4R-0BkbpL2qAsxFxAU=w526-h296-rw',
  },
  {
    id: '3',
    title: 'Tyre Replacement',
    date: '15 June 2025',
    amount: '₹2,800',
    image:
      'https://www.ford.com/is/image/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang/2025/collections/dm/24_FRD_MST_60983_2.tif?croppathe=1_3x2&wid=900',
  },
];

const searchIconUrl = 'https://cdn-icons-png.flaticon.com/512/622/622669.png';

const Home = () => {
  const bannerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  let bannerIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      bannerIndex = (bannerIndex + 1) % banners.length;
      bannerRef.current?.scrollToIndex({ index: bannerIndex, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[
          '#0F172A',
          '#1E293B',
          '#0F172A',
          '#334155',
          '#0F172A',
          '#CBD5E1',
        ]} // Slate to soft gray
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Welcome Amit!</Text>
        {/* <Text style={styles.headerSubtitle}>Explore car services near you</Text> */}

        {/* Search Bar inside header */}
        <View style={styles.searchBar}>
          <Image source={{ uri: searchIconUrl }} style={styles.searchIcon} />
          <TextInput
            placeholder="Search for services, e.g. car wash"
            placeholderTextColor="#ccc"
            style={styles.searchInput}
          />
        </View>
      </LinearGradient>

      <ScrollView>
        {/* Banners */}

        <FlatList
          contentContainerStyle={{ marginHorizontal: 20 }}
          ref={bannerRef}
          data={banners}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          )}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
        </View>

        <View style={styles.servicesGrid}>
          {services.map(service => (
            <View key={service.id} style={styles.serviceCard}>
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceTitle}>{service.title}</Text>
            </View>
          ))}
        </View>
        {/* Orders Section */}
        <View style={styles.orderHeader}>
          <Text style={styles.orderTitle}>Your Orders</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {orders.map(order => (
          <View key={order.id} style={styles.orderItem}>
            <Image
              source={{ uri: order.image }}
              style={styles.orderImage}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.orderName}>{order.title}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <Text style={styles.orderAmount}>{order.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: COLOR.royalBlue,
    paddingTop: 35,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: COLOR.white,
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: COLOR.white,
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#999',
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
  },
  categoryContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  categoryItem: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCategoryItem: {
    backgroundColor: COLOR.royalBlue,
    borderColor: COLOR.royalBlue,
    elevation: 4,
  },
  categoryText: {
    color: COLOR.royalBlue,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '600',
  },
  bannerImage: {
    width: windowWidth / 1.222,
    height: 150,
    resizeMode: 'cover',
    marginTop: 15,
    marginHorizontal: 10, // Add horizontal space between images
    borderRadius: 10, // Optional: for rounded corners
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginHorizontal: 15,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.royalBlue,
  },
  viewAll: {
    fontSize: 14,
    color: COLOR.royalBlue,
    fontWeight: '600',
  },
  orderItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    elevation: 1,
  },
  orderImage: {
    width: 50,
    height: 45,
    marginRight: 15,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  orderName: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  orderDate: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  orderAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#999',
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  sectionHeader: {
    marginTop: 25,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.royalBlue,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  serviceCard: {
    backgroundColor: '#fff',
    width: (windowWidth - 50) / 2,
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  serviceImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.royalBlue,
    padding: 10,
    textAlign: 'center',
  },
});
