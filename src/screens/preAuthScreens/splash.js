import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../assets/images';
import {Size, hp, wp} from '../../assets/dimensions';
import {Colors} from '../../assets/color';
import {Strings} from '../../assets/Strings';
import {useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/CustomButton';
import Login from '../authScreens/Login';
import Register from '../authScreens/register';
import OTP from '../authScreens/otp';
import AsyncStorage from '@react-native-community/async-storage';
import ForgotPassword from '../authScreens/forgotPassword';
import NewPassword from '../authScreens/newPassword';
// import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'

export default function Splash() {
  const navigation = useNavigation();
  const [loginSheet, setLoginSheet] = useState(false);
  const [registerSheet, setRegisterSheet] = useState(false);
  const [otpSheet, setOtpSheet] = useState(false);
  const [forgotPasswordSheet, setForgotPasswordSheet] = useState(false);
  const [newPasswordSheet, setNewPasswordSheet] = useState(false);
  const [emailFromRegister, setEmailFromRegister] = useState('');
  const [isForgetPassOTP, setIsForgetPassOTP] = useState(false);
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      navigation.navigate('UserStack');
    } else {
      setLoginSheet(false);
      setRegisterSheet(false);
      setOtpSheet(false);
    }
  };

  const DottedElement = props => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Octicons
          style={{marginRight: wp(2)}}
          color={Colors.white}
          name="dot-fill"
          size={Size(2.5)}
        />
        <Text
          style={{
            color: Colors.white,
            textAlign: 'center',
            alignItems: 'center',
          }}>
          {props?.title}
        </Text>
      </View>
    );
  };

  const onBackdropPress = navScreen => {
    if (navScreen === 'navLoggedin') {
      setLoginSheet(false);
      setRegisterSheet(false);
      setOtpSheet(false);
      setForgotPasswordSheet(false);
      setNewPasswordSheet(false);
    } else if (navScreen === 'navRegistered') {
      setLoginSheet(false);
      setRegisterSheet(false);
      setOtpSheet(true);
      setForgotPasswordSheet(false);
      setNewPasswordSheet(false);
    } else if (navScreen === 'navOTP') {
      setOtpSheet(false);
      setLoginSheet(false);
      setRegisterSheet(false);
      setForgotPasswordSheet(false);
      setNewPasswordSheet(false);
    } else if (navScreen === 'navRedirectToRegister') {
      setRegisterSheet(true);
      setLoginSheet(false);
      setOtpSheet(false);
      setForgotPasswordSheet(false);
      setNewPasswordSheet(false);
    } else if (navScreen === 'navRedirectToLogin') {
      setLoginSheet(true);
      setRegisterSheet(false);
      setOtpSheet(false);
      setForgotPasswordSheet(false);
      setNewPasswordSheet(false);
    } else if (navScreen === 'navRedirectToForgetPassword') {
      setLoginSheet(false);
      setRegisterSheet(false);
      setOtpSheet(false);
      setForgotPasswordSheet(true);
      setNewPasswordSheet(false);
    } else if (navScreen === 'navRedirectToNewPassword') {
      setLoginSheet(false);
      setRegisterSheet(false);
      setOtpSheet(false);
      setForgotPasswordSheet(true);
      setNewPasswordSheet(true);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        source={Images.splashLogo}
        resizeMode="stretch"
        style={styles.splashLogo}>
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 1)',
          ]}
          style={{flex: 1, alignItems: 'baseline', justifyContent: 'flex-end'}}>
          <Image
            source={Images.splashLogos}
            resizeMode="contain"
            style={{height: hp(20), alignSelf: 'center', marginVertical: hp(3)}}
          />
          <View
            style={{
              marginHorizontal: wp(5),
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: wp(90),
            }}>
            <DottedElement title="Live Scores" />
            <DottedElement title="Detailed Stats" />
          </View>
          <View
            style={{
              marginHorizontal: wp(5),
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: wp(90),
              marginVertical: wp(2),
            }}>
            <DottedElement title="List Builder" />
            <DottedElement title="In Play Alerts " />
          </View>

          <CustomButton
            gradient
            text={Strings.signin}
            size="medium"
            onPress={() => setLoginSheet(true)}
          />

          <CustomButton
            buttonTextStyle={{color: Colors.grey}}
            onPress={() => setRegisterSheet(true)}
            overrideStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0)',
              paddingVertical: hp(0),
            }}
            text={Strings.signup}
            size="medium"
          />
          <Login loginSheet={loginSheet} onBackdropPress={onBackdropPress} />
          <Register
            registerSheet={registerSheet}
            onBackdropPress={onBackdropPress}
            onRegisterSuccess={email => {
              setEmailFromRegister(email);
              setOtpSheet(true);
            }}
          />
          <OTP
            otpSheet={otpSheet}
            email={emailFromRegister}
            onBackdropPress={onBackdropPress}
            isForgetPassOTP={isForgetPassOTP}
          />
          <ForgotPassword
            forgotPasswordSheet={forgotPasswordSheet}
            onBackdropPress={onBackdropPress}
            onRegisterSuccess={email => {
              setEmailFromRegister(email);
              setOtpSheet(true);
              setIsForgetPassOTP(true);
            }}
          />
          <NewPassword
            newPasswordSheet={newPasswordSheet}
            email={emailFromRegister}
            onBackdropPress={onBackdropPress}
          />
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
  },
  splashLogo: {
    height: '100%',
    width: '100%',
  },
  titleText: {
    fontSize: Size(3.2),
    color: Colors.white,
    fontWeight: 'bold',
    width: wp(55),
    textAlign: 'left',
    marginLeft: wp(4),

    // alignSelf:'center'
  },
  sloganText: {
    fontSize: Size(2),
    color: Colors.grey,
    // fontWeight:'bold',
    // alignSelf:'center',
    width: wp(45),
    textAlign: 'left',
    marginLeft: wp(4),
    marginVertical: wp(5),
  },

  registerText: {
    alignSelf: 'center',
    fontSize: Size(2),
    color: Colors.lightBlack,
  },
});
