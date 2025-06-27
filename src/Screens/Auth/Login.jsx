import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
} from 'react-native';
import { Animated, Easing } from 'react-native';

import { COLOR } from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import LottieView from 'lottie-react-native';
import Input from '../../Components/Input';
import { AuthContext } from '../../Backend/AuthContent';
import { useApi } from '../../Backend/Api';
import { windowHeight, windowWidth } from '../../Constants/Dimensions';

const { height, width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const { postRequest } = useApi();
  const floatAnim = useRef(new Animated.Value(0)).current;

  const animationRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const { setUser, setToken } = useContext(AuthContext);

  useEffect(() => {
    animationRef.current?.play();
    animationRef.current?.play(30, 120);
  }, []);

  const loginUser = async (email, password) => {
    if (!email) {
      Alert.alert('Validation Error', 'Email is required');
      return;
    }
    setLoading(true);
    const response = await postRequest('/auth/login', {
      email,
      password,
    });
    if (response?.success) {
      const data = response?.data;
      setToken(data?.token);
      setUser(data?.users);
    } else {
      Alert.alert('Error', response.error || 'Login failed');
    }
    setLoading(false);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* <LottieView
            ref={animationRef}
            source={require('../../assets/Lottie/Login.json')}
            style={styles.image}
          /> */}
          <View>
            <Animated.Image
              source={{
                uri: 'https://thumbs.dreamstime.com/b/car-wash-scene-colorful-soap-water-splashing-creating-vibrant-dynamic-atmosphere-filled-bubbles-foam-340257078.jpg',
              }}
              style={[
                {
                  width: windowWidth,
                  height: windowHeight / 2.7,
                  borderBottomLeftRadius: 4500,
                  borderBottomRightRadius: 1500,
                  transform: [{ translateY: floatAnim }],
                },
              ]}
            />
            <View style={styles.imageOverlay} />
          </View>

          <View style={styles.formWrapper}>
            <Text style={styles.title}>Sign In</Text>

            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
            />

            <CustomButton
              loading={loading}
              title="Login"
              onPress={() => {
                setToken('123');
                setUser('123');
                // loginUser(email, password);
              }}
              style={{ marginTop: 15 }}
            />

            <Text style={styles.footerText}>
              Not having account?{' '}
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate('SignUp')}
              >
                Create One
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLOR.white,
    paddingBottom: 30,
  },
  image: {
    width: width,
    height: height * 0.5,
  },
  formWrapper: {
    marginTop: windowHeight * 0.05,
    // paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: COLOR.royalBlue,
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 20,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    alignSelf: 'center',
  },
  linkText: {
    color: COLOR.royalBlue,
    fontWeight: 'bold',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
    borderBottomLeftRadius: 4500,
    borderBottomRightRadius: 1500,
  },
});
