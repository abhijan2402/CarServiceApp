import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    ScrollView,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import AddFeed from '../Screens/Main/AddFeed';
import AddEvent from '../Screens/Main/AddEvent';
import Profile from '../Screens/Main/Profile';
import MyPost from '../Screens/Main/MyPost';
import Cms from '../Screens/Main/Cms';
import Order from '../Screens/Main/Order';
import AccountDetails from '../Screens/Main/AccountDetails';
import Ticket from '../Screens/Main/Ticket';
import Ads from '../Screens/Main/Ads';
import Bids from '../Screens/Main/Bids';
import AddCar from '../Screens/Main/AddCar';
import { COLOR } from '../Constants/Colors';
import Home from '../Screens/Main/Home';
import { useNavigation } from '@react-navigation/native';
import AccountPage from '../Screens/Main/Account';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import { windowWidth } from '../Constants/Dimensions';

const Stack = createNativeStackNavigator();
const { width } = Dimensions.get('window');
const drawerWidth = width * 0.75;

const DrawerContent = ({ navigate, closeDrawer }) => (
    <View style={styles.container}>
        <Text style={styles.title}>👋 Hello, Anirudh!</Text>

        <ScrollView contentContainerStyle={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigate('Home')}>
                <Text style={styles.menuText}>🏠 Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigate('Order')}>
                <Text style={styles.menuText}>📦 Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigate('Bids')}>
                <Text style={styles.menuText}>🛒 My Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigate('AccountPage')}>
                <Text style={styles.menuText}>👤 Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
                <Text style={[styles.menuText, { color: COLOR.red }]}>❌ Close Drawer</Text>
            </TouchableOpacity>
        </ScrollView>

        <View style={styles.logoutSection}>
            <CustomButton style={{ width: 220, bottom: 50 }} title="Logout" onPress={() => {
                // Call logout logic here
                closeDrawer();
            }} />
        </View>
    </View>
);

const RootNavigation = () => {
    const drawerAnim = useRef(new Animated.Value(-drawerWidth)).current;
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const stackNavRef = useRef();
    const navigation = useNavigation()
    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const navigateTo = (screen) => {
        closeDrawer();
        console.log(screen, "SCREENN");

        setTimeout(() => {
            // stackNavRef.current?.navigate(screen);
            navigation.navigate(screen)
        }, 300);
    };

    useEffect(() => {
        Animated.timing(drawerAnim, {
            toValue: isDrawerOpen ? 0 : -drawerWidth,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isDrawerOpen]);

    return (
        <View style={{ flex: 1 }}>
            {/* Custom Header */}
            <LinearGradient
                colors={['#0F1115', '#0F1115', '#0F1115', '#0F1115']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
                <TouchableOpacity onPress={openDrawer}>
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity>

                <View style={styles.header1}>
                    {/* <Text style={styles.locationLabel}>Your Location</Text> */}
                    <Text style={styles.location}>📍 Chicago, USA</Text>

                </View>


                <TouchableOpacity style={styles.searchIcon}>
                    <Image
                        source={{
                            uri: 'https://randomuser.me/api/portraits/men/32.jpg',
                        }}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>
            </LinearGradient>
            {/* Stack Navigation */}
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
                ref={stackNavRef}
            >
                <Stack.Screen name="Home" component={Home} />

                {/* <Stack.Screen name="BottomNavigation" component={BottomNavigation} /> */}
                <Stack.Screen name="AddFeed" component={AddFeed} />
                <Stack.Screen name="AddEvent" component={AddEvent} />
                <Stack.Screen name="EditProfile" component={Profile} />
                <Stack.Screen name="AccountPage" component={AccountPage} />

                <Stack.Screen name="MyPost" component={MyPost} />
                <Stack.Screen name="Cms" component={Cms} />
                <Stack.Screen name="Order" component={Order} />
                <Stack.Screen name="AccountDetails" component={AccountDetails} />
                <Stack.Screen name="Ticket" component={Ticket} />
                <Stack.Screen name="Ads" component={Ads} />
                <Stack.Screen name="Bids" component={Bids} />
                <Stack.Screen name="AddCar" component={AddCar} />
            </Stack.Navigator>

            {/* Drawer Overlay */}
            {isDrawerOpen && (
                <TouchableWithoutFeedback onPress={closeDrawer}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            {/* Drawer */}
            <Animated.View style={[styles.drawer, { left: drawerAnim }]}>
                <DrawerContent navigate={navigateTo} closeDrawer={closeDrawer} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: COLOR.bg,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        zIndex: 5,
        paddingTop: 25
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
    header: {
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        // justifyContent: 'space-between',
        elevation: 5,
        paddingTop: 25
    },

    menuIcon: {
        fontSize: 24,
        color: '#ffffff',
    },

    headerTitle: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
        flex: 1,
        marginLeft: 16,
    },

    searchIcon: {
        padding: 8,
    },
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#1E3A8A',
    },
    menuContainer: {
        paddingBottom: 20,
    },
    menuItem: {
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: '#f1f1f1',
    },
    menuText: {
        fontSize: 16,
        color: '#333333',
    },
    logoutSection: {
        paddingVertical: 20,
        // borderTopWidth: 1,
        // borderTopColor: '#ddd',
    },
    header1: {
        width: windowWidth / 1.4
    },
    locationLabel: {
        color: '#bbb',
        fontSize: 13,
    },
    location: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
        marginTop: 3,
    },
    profilePic: {
        // position: 'absolute',
        // right: 0,
        // top: 0,
        width: 35,
        height: 35,
        borderRadius: 20,
    },
});

export default RootNavigation;
