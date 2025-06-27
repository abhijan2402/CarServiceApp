import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { COLOR } from '../Constants/Colors';
import { windowWidth } from '../Constants/Dimensions';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = ({ title, onPress, style, textStyle, loading }) => {
    return (
        <TouchableOpacity
            style={{ borderRadius: 15 }}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={['#2d2d2d', '#1e1e1e', '#000000']} // Dark gradient colors
                style={[styles.button, style]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                {loading ? (
                    <ActivityIndicator size="small" color={COLOR.white} />
                ) : (
                    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth / 1.2,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    buttonText: {
        color: '#FFFFFF', // Always light for dark mode
        fontSize: 16,
        fontWeight: '600',
    },
});
