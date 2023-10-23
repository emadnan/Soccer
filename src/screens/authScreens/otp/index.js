import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header';
import CustomTextInput from '../../../components/CustomTextInput';
import {Colors} from '../../../assets/color';
import {Strings} from '../../../assets/Strings';
import {Size, wp, hp} from '../../../assets/dimensions';
import {Images} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import OTPInput from '../../../components/otpInput';
import {BottomSheet, CheckBox} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Loader from '../../../components/loader';

export default function OTP(props) {
  const navigation = useNavigation();
  const [otp, setOTP] = useState('');
  const [loading, setloading] = useState(false);

  const [OTPError, setOTPError] = useState('');

  const handleOtpChange = otpValue => {
    setOTP(otpValue);
  };

  const handleButtonPress = async () => {
    let hasError = false;
    if (!otp) {
      setOTPError('Please Enter Your OTP.');
      hasError = true;
    }
    console.log('props.email , otp: ', props.email, otp);

    if (props.email && otp) {
      setloading(true);
      try {
        const response = await axios.post(
          'https://api.footballstatspro.com/api/verify-otp',
          {
            email: props.email,
            otp: otp,
          },
        );

        console.log('props.isForgetPassOTP: ', props.isForgetPassOTP);
        console.log('response.data: ', response.data);
        console.log('response.status: ', response.status);
        if (response.status === 200 || response.status === 201) {
          if (props.isForgetPassOTP) {
            props.onBackdropPress('navRedirectToNewPassword');
          } else {
            props.onBackdropPress('navOTP');
            navigation.navigate('Splash');
          }
        }
      } catch (error) {
        console.log('Error during OTP verification:', error);
      } finally {
        setloading(false);
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await axios.post(
        'https://api.footballstatspro.com/api/resend-verification',
        {
          email: email,
        },
      );
    } catch (error) {
      console.log('Error during resend verification:', error);
      // You can show an error message to the user if needed
    }
  };

  return (
    <BottomSheet
      onBackdropPress={props.onBackdropPress}
      containerStyle={{
        backgroundColor: Colors.white,
        marginTop: hp(18),
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignItems: 'center',
      }}
      isVisible={props.otpSheet}>
      <Text style={styles.welcomeText}>OTP Verification</Text>

      <Text style={{...styles.introText, fontSize: Size(1.8)}}>
        Please Verify!
      </Text>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Text
            style={{
              ...styles.introText,
              fontSize: Size(1.6),
              fontWeight: 'normal',
            }}>
            Insert OTP Code sent to your email to continue
          </Text>

          <OTPInput onOtpChange={handleOtpChange} OTPError={OTPError} />

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: wp(5),
              marginBottom: wp(5),
            }}>
            <Text style={styles.textStyle}>{Strings.noOtp}</Text>
            <Text
              style={{
                ...styles.textStyle,
                color: Colors.textBlue,
                fontWeight: 'bold',
              }}
              onPress={handleResendVerification}>
              {Strings.resend}
            </Text>
          </View>

          <CustomButton
            gradient
            text={Strings.continue}
            size="medium"
            onPress={handleButtonPress}
          />
        </View>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'flex-end',
    // marginRight:wp(5),
    fontSize: Size(1.6),
    color: Colors.black,
    marginBottom: wp(2),
  },
  registerText: {
    alignSelf: 'center',
    fontSize: Size(2),
    color: Colors.lightBlack,
    marginVertical: wp(2),
  },
  cardImage: {alignSelf: 'center', height: hp(30), width: hp(60)},
  iconsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: wp(2),
  },
  welcomeText: {
    fontSize: Size(2.4),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: wp(10),
  },
  introText: {
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'auto',
    marginLeft: wp(5),
    marginTop: wp(2),
  },
});
