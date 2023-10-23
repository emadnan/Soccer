import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import {Size, wp} from '../../assets/dimensions';
import {Colors} from '../../assets/color';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import {color} from '@rneui/base';

const CustomButton = ({
  text,
  onPress,
  size,
  disabled,
  buttonTextStyle,
  overrideStyle,
  gradient,
}) => {
  const getSizeStyle = () => {
    switch (size) {
      case 'customSmall':
        return styles.customSmall;
      case 'extraSmall':
        return styles.extraSmall;
      case 'small':
        return styles.smallButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getSizeStyle(),
        disabled && styles.disabledButton,
        overrideStyle,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {gradient && (
        <AnimatedLinearGradient
          customColors={Colors.primaryGradient}
          speed={6000}
        />
      )}

      <Text style={{...styles.buttonText, ...buttonTextStyle}}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: wp(2),
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.11,
        shadowRadius: 13,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  smallButton: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    width: wp(40),
    alignSelf: 'center',
  },
  customSmall: {
    paddingVertical: wp(2),
    paddingHorizontal: 12,
    // width:wp(30),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    borderWidth: 0.5,
  },
  extraSmall: {
    paddingVertical: wp(1),
    paddingHorizontal: 12,
    marginHorizontal: wp(1),
    // width:wp(30),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    borderWidth: 0.5,
  },
  mediumButton: {
    paddingVertical: wp(3),
    // paddingHorizontal: wp(20),
    width: wp(80),
    minWidth: 100,
    alignSelf: 'center',
    borderColor: Colors.darkGrey30,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    minWidth: 120,
    alignSelf: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Size(2.2),
    fontWeight: 'bold',
  },
});

export default CustomButton;
