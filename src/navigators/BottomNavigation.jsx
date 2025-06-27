import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Home from '../Screens/Main/Home';
import Profile from '../Screens/Main/Account';
import Order from '../Screens/Main/Order';
import Bids from '../Screens/Main/Bids';
import Analytics from '../Screens/Main/Analytics';
import { COLOR } from '../Constants/Colors';

const Tab = createBottomTabNavigator();

const icons = {
  Home: 'https://cdn-icons-png.flaticon.com/128/1946/1946488.png',
  Orders: 'https://cdn-icons-png.flaticon.com/128/1250/1250680.png',
  MyBids: 'https://cdn-icons-png.flaticon.com/128/833/833314.png',
  Cars: 'https://cdn-icons-png.flaticon.com/128/2962/2962303.png',
  Profile: 'https://cdn-icons-png.flaticon.com/128/456/456283.png',
};

const BottomNavigation = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLOR.royalBlue,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
        tabBarStyle: {
          paddingVertical: 8,
          height: 70 + insets.bottom, // Add safe area bottom inset for Android/iOS
          paddingBottom: 0 + insets.bottom, // Padding to prevent overlap with nav buttons
        },
        tabBarIcon: ({ focused }) => {
          const iconUri = icons[route.name];

          return (
            <Image
              source={{ uri: iconUri }}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLOR.royalBlue : 'gray',
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarLabel: ({ color }) => {
          let label = route.name;
          if (route.name === 'MyBids') label = 'Cart'; // Fix label spacing

          return (
            <Text
              style={{ color, fontSize: 12, marginTop: 4, textAlign: 'center' }}
            >
              {label}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Orders" component={Order} />
      <Tab.Screen name="MyBids" component={Bids} />
      <Tab.Screen name="Cars" component={Analytics} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
