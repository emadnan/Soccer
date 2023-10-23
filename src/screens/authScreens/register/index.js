import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../../components/CustomTextInput';
import {Colors} from '../../../assets/color';
import {Strings} from '../../../assets/Strings';
import {Size, wp, hp} from '../../../assets/dimensions';
import {Images} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {BottomSheet} from '@rneui/themed';
import axios from 'axios';
import {Alert} from 'react-native';
import Loader from '../../../components/loader';

export default function Register(props) {
  const navigation = useNavigation();

  const [check1, setCheck1] = useState(false);
  const [loading, setloading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const isEmailValid = email => {
    // Basic email validation using a regular expression
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = password => {
    // Check if the password has at least 8 characters
    return password.length >= 8;
  };

  const handleButtonPress = async () => {
    // Reset previous error messages
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

    if (!phone) {
      setPhoneError('Phone No. is required.');
      hasError = true;
    }

    if (!firstName) {
      setFirstNameError('First Name is required.');
      hasError = true;
    }

    if (!lastName) {
      setLastNameError('Last Name is required.');
      hasError = true;
    }

    if (hasError) {
      // Do not proceed if there are errors
      return;
    }

    let reqData = new FormData();
    reqData.append('first_name', firstName);
    reqData.append('last_name', lastName);
    reqData.append('email', email);
    reqData.append('phone_no', phone);
    reqData.append('password', password);

    setloading(true);
    try {
      const response = await axios.post(
        'https://api.footballstatspro.com/api/register',
        reqData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        props.onBackdropPress('navRegistered');
        props.onRegisterSuccess(email);
        setEmail('');
        setPassword('');
        // Call loginSuccess and pass the user data and accessToken
        // dispatch(loginSuccess(response?.data?.user, response?.data?.token));
      } else {
        cbFailure(response?.data?.message);
      }
    } catch (error) {
      Alert.alert(
        'User Aleady Exist with this Email',
        'Try new email for being Registered',
      );
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  const handleInputFocus = errorSetter => {
    errorSetter('');
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
      isVisible={props.registerSheet}>
      <Text style={styles.welcomeText}>Register</Text>

      {loading ? (
        <Loader />
      ) : (
        <View>
          <CustomTextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder={'First Name'}
            error={firstNameError}
            onFocus={() => handleInputFocus(setFirstNameError)}
          />
          <CustomTextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder={'Last Name'}
            error={lastNameError}
            onFocus={() => handleInputFocus(setLastNameError)}
          />
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

          <CustomTextInput
            value={phone}
            onChangeText={setPhone}
            placeholder={Strings.enterPhone}
            keyboardType="numeric"
            leftIcon={
              <Image
                source={Images.phoneIcon}
                resizeMode="contain"
                style={{height: Size(3.2)}}
              />
            }
            error={phoneError}
            onFocus={() => handleInputFocus(setPhoneError)}
          />
          <View style={{height: hp(2)}} />

          <CustomButton
            gradient
            text={Strings.signup}
            size="medium"
            onPress={handleButtonPress}
          />
          <Text
            style={styles.registerText}
            onPress={() => {
              props.onBackdropPress('navRedirectToLogin');
            }}>
            {Strings.haveAcc}{' '}
            <Text style={{...styles.registerText, color: Colors.textBlue}}>
              {Strings.signin}
            </Text>
          </Text>
        </View>
      )}
    </BottomSheet>
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
    // marginVertical: wp(2),
  },

  welcomeText: {
    fontSize: Size(2.4),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: wp(3),
  },
});
