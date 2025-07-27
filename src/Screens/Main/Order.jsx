import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import { COLOR } from '../../Constants/Colors';

const sampleOrders = {
  upcoming: [
    {
      id: '1',
      carImage:
        'https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg',
      carNumber: 'RJ14 CD 1234',
      licenseInfo: 'License No: DL-04-5678',
      price: '₹2500',
      paymentMode: 'UPI',
      dateTime: '25 June 2025, 10:30 AM',
      provider: {
        id: 'SP1001',
        name: 'Amit Sharma',
        image:
          'https://img.freepik.com/free-photo/bearded-expert-mechanic-dressed-uniform-standing-with-crossed-arms-against-car-lift-garage_613910-18011.jpg?semt=ais_hybrid&w=740',
      },
    },
    {
      id: '2',
      carImage:
        'https://robbreport.com/wp-content/uploads/2024/08/temerario01.jpg?w=800',
      carNumber: 'RJ14 CD 1234',
      licenseInfo: 'License No: DL-04-5678',
      price: '₹2500',
      paymentMode: 'UPI',
      dateTime: '25 June 2025, 10:30 AM',
      provider: {
        id: 'SP1001',
        name: 'Amit Sharma',
        image:
          'https://img.freepik.com/free-photo/bearded-expert-mechanic-dressed-uniform-standing-with-crossed-arms-against-car-lift-garage_613910-18011.jpg?semt=ais_hybrid&w=740',
      },
    },
  ],
  past: [
    {
      id: '2',
      carImage:
        'https://cdn.pixabay.com/photo/2013/07/12/15/55/car-150334_1280.png',
      carNumber: 'MH12 AB 9876',
      licenseInfo: 'License No: DL-01-3344',
      price: '₹1800',
      paymentMode: 'Cash',
      dateTime: '12 May 2025, 2:00 PM',
      provider: {
        id: 'SP1020',
        name: 'Neha Verma',
        image: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
      },
    },
  ],
};

const Tabs = ({ activeTab, setActiveTab }) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
      onPress={() => setActiveTab('upcoming')}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === 'upcoming' && styles.activeTabText,
        ]}
      >
        Upcoming Orders
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'past' && styles.activeTab]}
      onPress={() => setActiveTab('past')}
    >
      <Text
        style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}
      >
        Past Orders
      </Text>
    </TouchableOpacity>
  </View>
);

const Order = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const renderOrderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowSpace}>
        <Text style={styles.orderId}>Order ID: {item.id}</Text>
        <Text style={styles.orderDate}>{item.dateTime}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Image source={{ uri: item.carImage }} style={styles.carImage} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.carNumber}>{item.carNumber}</Text>
          <Text style={styles.licenseInfo}>{item.licenseInfo}</Text>
          <Text style={styles.labelValue}>
            Payment: <Text style={styles.value}>{item.paymentMode}</Text>
          </Text>
          <Text style={styles.labelValue}>
            Price: <Text style={styles.value}>{item.price}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.providerRow}>
        <Image
          source={{ uri: item.provider.image }}
          style={styles.providerImage}
        />
        <View>
          <Text style={styles.providerName}>{item.provider.name}</Text>
          <Text style={styles.providerId}>Provider ID: {item.provider.id}</Text>
        </View>
      </View>

      {/* <TouchableOpacity style={styles.viewButton} onPress={() => {}}>
        <Text style={styles.viewButtonText}>View Details</Text>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Header title="Orders" /> */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <FlatList
        data={
          activeTab === 'upcoming' ? sampleOrders.upcoming : sampleOrders.past
        }
        keyExtractor={item => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found.</Text>
        }
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLOR.royalBlue,
  },
  tabText: {
    fontSize: 13,
    color: 'gray',
  },
  activeTabText: {
    fontSize: 13,
    color: COLOR.royalBlue,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  orderDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  carImage: {
    width: 90,
    height: 60,
    borderRadius: 8,
  },
  carNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLOR.royalBlue,
    marginBottom: 4,
  },
  licenseInfo: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },
  labelValue: {
    fontSize: 13,
    color: '#374151',
  },
  value: {
    fontWeight: '600',
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  providerImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  providerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  providerId: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    backgroundColor: COLOR.royalBlue,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
});
