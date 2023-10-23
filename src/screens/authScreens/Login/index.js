import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../../components/CustomTextInput';
import {Colors} from '../../../assets/color';
import {Strings} from '../../../assets/Strings';
import {Size, wp, hp} from '../../../assets/dimensions';
import {Images} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../../../redux/actions/auth';
import {useDispatch} from 'react-redux';
import {BottomSheet, CheckBox} from '@rneui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../components/loader';

export default function Login(props) {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [check1, setCheck1] = useState(false);
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isEmailValid = email => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = password => {
    return password.length >= 8;
  };

  const handleButtonPress = async () => {
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    if (!email) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    } else if (!isPasswordValid(password)) {
      setPasswordError('Password must be at least 8 characters long.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setloading(true);

    let reqData = new FormData();
    reqData.append('email', email);
    reqData.append('password', password);

    try {
      const response = await axios.post(
        'https://api.footballstatspro.com/api/login',
        reqData,
      );

      if (response.status === 201 || response.status === 200) {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem(
          'userInfo',
          JSON.stringify(response.data.user),
        );

        props.onBackdropPress('navLoggedin');
        navigation.navigate('UserStack');
        setEmail('');
        setPassword('');
        setloading(false);
        dispatch(loginUser(response.data.user));
      } else {
        cbFailure(response?.data?.message);
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      Alert.alert(
        'User is not Found',
        'Please Enter Correct Email and Password.',
      );
    } finally {
      setloading(false);
    }
  };

  const handleInputFocus = errorSetter => {
    errorSetter('');
  };

  return (
    <View>
      <BottomSheet
        onBackdropPress={props.onBackdropPress}
        containerStyle={{
          backgroundColor: Colors.white,
          marginTop: hp(18),
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          alignItems: 'center',
        }}
        isVisible={props.loginSheet}>
        <Image
          source={Images.logo}
          resizeMode="contain"
          style={{height: hp(20), alignSelf: 'center', marginVertical: hp(3)}}
        />

        <Text style={styles.welcomeText}>Welcome</Text>
        {loading ? (
          <Loader />
        ) : (
          <View>
            <CustomTextInput
              value={email}
              onChangeText={setEmail}
              placeholder={Strings.enterEmail}
              leftIcon={
                <Image
                  source={Images.emailIcon}
                  resizeMode="contain"
                  style={{height: Size(3.2)}}
                />
              }
              error={emailError}
              onFocus={() => handleInputFocus(setEmailError)}
            />

            <CustomTextInput
              isSecure={true}
              value={password}
              onChangeText={setPassword}
              placeholder={Strings.password}
              leftIcon={
                <Image
                  source={Images.passwordIcon}
                  resizeMode="contain"
                  style={{height: Size(3.2)}}
                />
              }
              error={passwordError}
              onFocus={() => handleInputFocus(setPasswordError)}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: hp(8),
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <CheckBox
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                checked={check1}
                textStyle={styles.forgotPassword}
                onPress={() => setCheck1(!check1)}
                title="Remember me"
                size={Size(3)}
              />
              <Text
                onPress={() =>
                  props.onBackdropPress('navRedirectToForgetPassword')
                }
                style={styles.forgotPassword}>
                {Strings.forgotPassword}
              </Text>
            </View>
            <CustomButton
              gradient
              text={Strings.signin}
              size="medium"
              onPress={() => {
                handleButtonPress();
              }}
            />
            <Text style={styles.registerText}>
              {Strings.dontHaveAcc}{' '}
              <Text
                onPress={() => {
                  props.onBackdropPress('navRedirectToRegister');
                }}
                style={{...styles.registerText, color: Colors.textBlue}}>
                {Strings.signup}
              </Text>
            </Text>
          </View>
        )}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    alignSelf: 'center',
    marginRight: wp(5),
    fontSize: Size(1.6),
    color: Colors.black,
    fontWeight: 'normal',
    // marginBottom:wp(2)
  },
  registerText: {
    alignSelf: 'center',
    fontSize: Size(1.6),
    color: Colors.lightBlack,
  },
  cardImage: {alignSelf: 'center', width: wp(88), height: hp(30)},
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
  },
});
