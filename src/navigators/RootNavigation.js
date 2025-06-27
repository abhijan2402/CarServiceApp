import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../Screens/Auth/OnBoarding';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
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
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="BottomNavigation"
            screenOptions={{
                headerShown: false,
            }}>

            <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
            <Stack.Screen name="AddFeed" component={AddFeed} />
            <Stack.Screen name="AddEvent" component={AddEvent} />
            <Stack.Screen name="EditProfile" component={Profile} />
            <Stack.Screen name="MyPost" component={MyPost} />
            <Stack.Screen name="Cms" component={Cms} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="AccountDetails" component={AccountDetails} />
            <Stack.Screen name="Ticket" component={Ticket} />
            <Stack.Screen name="Ads" component={Ads} />

            <Stack.Screen name="Bids" component={Bids} />
            <Stack.Screen name="AddCar" component={AddCar} />



        </Stack.Navigator>
    );
};

export default RootNavigation;
