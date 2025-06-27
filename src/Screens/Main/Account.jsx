import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { COLOR } from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../Backend/AuthContent';

const AccountPage = ({ navigation }) => {
  const { setUser, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Implement logout logic here
            setUser(null);
            setToken(null);
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />
      <Header title="Account" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Info with Gradient */}
        <View
          colors={['#f74728', '#ff8b1f', '#f2741f']}
          style={styles.profileContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john@gmail.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')}
            iconUri="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
          />

          <MenuItem
            title="Add Car"
            onPress={() => navigation.navigate('AccountDetails')}
            iconUri="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
          />
          <MenuItem
            title="Terms & Conditions"
            onPress={() =>
              navigation.navigate('Cms', { title: 'Terms & Conditions' })
            }
            iconUri="https://cdn-icons-png.flaticon.com/128/2913/2913469.png"
          />
          <MenuItem
            title="Privacy Policy"
            onPress={() =>
              navigation.navigate('Cms', { title: 'Privacy Policy' })
            }
            iconUri="https://cdn-icons-png.flaticon.com/128/833/833524.png"
          />
          <MenuItem
            title="Log Out"
            onPress={handleLogout}
            iconUri="https://cdn-icons-png.flaticon.com/128/1828/1828479.png"
            isLogout
          />
        </View>
      </ScrollView>
    </>
  );
};

const MenuItem = ({ title, onPress, iconUri, isLogout }) => {
  const menuContent = (
    <TouchableOpacity
      style={[styles.menuItem, isLogout && styles.logoutItem]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <Image
          source={{ uri: iconUri }}
          style={[styles.menuIcon, isLogout && { tintColor: '#d9534f' }]}
        />
        <Text style={[styles.menuText, isLogout && { color: '#d9534f' }]}>
          {title}
        </Text>
      </View>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/2985/2985179.png',
        }}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return isLogout ? (
    menuContent
  ) : (
    <View
      colors={['#f74728', '#ff8b1f', '#f2741f']}
      style={styles.menuGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {menuContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLOR.white,
    paddingBottom: 30,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLOR.royalBlue,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '400',
    color: COLOR.grey,
    marginTop: 4,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuGradient: {
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 15,
    backgroundColor: COLOR.white,
    elevation: 3,
    borderColor: COLOR.royalBlue,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutItem: {
    backgroundColor: '#fff0f0',
    borderColor: '#d9534f',
    borderWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: COLOR.black,
  },
  menuText: {
    fontSize: 18,
    color: COLOR.black,
  },
  arrowIcon: {
    width: 18,
    height: 18,
    tintColor: COLOR.black,
  },
});

export default AccountPage;
