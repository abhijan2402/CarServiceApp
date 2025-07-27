import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation'; // Your existing bottom tab setup
import { COLOR } from './Constants/Colors';

const { width } = Dimensions.get('window');
const drawerWidth = width * 0.75;

const DrawerContent = ({ onClose, navigate }) => {
  return (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Menu</Text>

      <TouchableOpacity onPress={() => navigate('Home')}>
        <Text style={styles.drawerItem}>🏠 Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('Orders')}>
        <Text style={styles.drawerItem}>📦 Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('MyBids')}>
        <Text style={styles.drawerItem}>🛒 My Bids</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('Cars')}>
        <Text style={styles.drawerItem}>🚘 Cars</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('Profile')}>
        <Text style={styles.drawerItem}>👤 Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text style={[styles.drawerItem, { color: 'red' }]}>❌ Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const animation = useRef(new Animated.Value(-drawerWidth)).current;
  const navRef = useRef();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isDrawerOpen ? 0 : -drawerWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isDrawerOpen]);

  const handleNavigate = screenName => {
    setDrawerOpen(false);
    setTimeout(() => {
      navRef.current?.navigate(screenName);
    }, 300);
  };

  return (
    <NavigationContainer
      ref={nav => {
        if (nav) {
          navRef.current = nav.getCurrentNavigation
            ? nav.getCurrentNavigation()
            : nav;
        }
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Custom Header with menu icon */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setDrawerOpen(true)}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My App</Text>
        </View>

        <BottomNavigation />

        {/* Overlay */}
        {isDrawerOpen && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setDrawerOpen(false)}
          />
        )}

        {/* Drawer */}
        <Animated.View style={[styles.drawer, { left: animation }]}>
          <DrawerContent
            onClose={() => setDrawerOpen(false)}
            navigate={handleNavigate}
          />
        </Animated.View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: COLOR.royalBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  menuIcon: {
    fontSize: 26,
    color: 'white',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: drawerWidth,
    backgroundColor: '#fff',
    zIndex: 20,
    elevation: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  drawerItem: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default App;
