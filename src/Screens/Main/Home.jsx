import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLOR } from '../../Constants/Colors';

const services = ['Car Wash', 'Engine Check', 'Battery Service', 'Oil Change'];
const windowWidth = Dimensions.get('window').width;

const Home = () => {
  const [activeTab, setActiveTab] = useState(true);

  return (
    <View style={styles.container}>
      {/* Service Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.serviceScroll}
      >
        {services.map((service, index) => (
          <TouchableOpacity key={index} style={styles.serviceChip}>
            <Text style={styles.serviceText}>{service}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Active / Previous Orders Toggle */}
      <View style={styles.locationBox}>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, activeTab && styles.toggleActive]}
            onPress={() => setActiveTab(true)}
          >
            <Text
              style={[styles.toggleText, activeTab && styles.toggleTextActive]}
            >
              Active Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, !activeTab && styles.toggleActive]}
            onPress={() => setActiveTab(false)}
          >
            <Text
              style={[styles.toggleText, !activeTab && styles.toggleTextActive]}
            >
              Previous Orders
            </Text>
          </TouchableOpacity>
        </View>

        {/* Pickup & Drop */}
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Pick-Up</Text>
            <Text style={styles.value}>Evanston</Text>
          </View>
          <View>
            <Text style={styles.label}>Drop-Off</Text>
            <Text style={styles.value}>Bucktown</Text>
          </View>
        </View>

        {/* Dates */}
        <View style={[styles.rowBetween, { marginTop: 20 }]}>
          <View>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>May 18</Text>
          </View>
          <View>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>May 20</Text>
          </View>
        </View>

        {/* View Details Button */}
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchText}>View Details</Text>
        </TouchableOpacity>
      </View>

      {/* Add Car Card */}
      <View style={styles.addCarCard}>
        <View style={styles.carContent}>
          <Text style={styles.carTitle}>Add New Car</Text>
          <Text style={styles.carSubtitle}>
            Easily manage your car services
          </Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Car</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1115',
    padding: 20,
  },
  serviceScroll: {
    flexGrow: 0,
    marginBottom: 20,
  },
  serviceChip: {
    backgroundColor: '#1D1F23',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2F3137',
  },
  serviceText: {
    color: '#fff',
    fontSize: 13,
  },
  locationBox: {
    backgroundColor: '#1A1C21',
    borderRadius: 20,
    padding: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#111214',
    borderRadius: 12,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#272A30',
    borderRadius: 12,
  },
  toggleText: {
    color: '#999',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#fff',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#888',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 2,
  },
  searchButton: {
    marginTop: 25,
    backgroundColor: '#D0FA58',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  searchText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  addCarCard: {
    backgroundColor: '#1A1C21',
    borderRadius: 20,
    marginTop: 30,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: 160,
  },
  carContent: {
    padding: 15,
  },
  carTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  carSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginVertical: 8,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#D0FA58',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
