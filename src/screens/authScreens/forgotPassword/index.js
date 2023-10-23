import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/header';
import CustomTextInput from '../../../components/CustomTextInput';
import {Colors} from '../../../assets/color';
import {Strings} from '../../../assets/Strings';
import {Size, wp, hp} from '../../../assets/dimensions';
import {Images} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import IconButton from '../../../components/iconButton';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../../../redux/actions/auth';
import {useDispatch} from 'react-redux';
import {BottomSheet, CheckBox} from '@rneui/themed';
import {setAccessToken} from '../../../redux/actions/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../components/loader';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ForgotPassword(props) {
  const navigation = useNavigation();

  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState('');

  const [emailError, setEmailError] = useState('');

  const isEmailValid = email => {
    // Basic email validation using a regular expression
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleButtonPress = async () => {
    setEmailError('');

    let hasError = false;

    if (!email) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setloading(true);

    let reqData = new FormData();
    reqData.append('email', email);

    try {
      const response = await axios.post(
        'https://api.footballstatspro.com/api/forget-password',
        reqData,
      );

      if (response.status === 201 || response.status === 200) {
        props.onBackdropPress('navOTP');
        props.onRegisterSuccess(email);
      }
    } catch (error) {
      setloading(false);
      Alert.alert('User is not Found', 'Please Enter Correct Email.');
    } finally {
      setEmail('');
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
        isVisible={props.forgotPasswordSheet}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{flexBasis: 50, flexGrow: 0, flexShrink: 1}}>
              <TouchableOpacity
                onPress={() => props.onBackdropPress('navRedirectToLogin')}
                style={{
                  alignItems: 'center',
                  padding: wp(1),
                  borderRadius: wp(100),
                  backgroundColor: Colors.extralightgray,
                  marginVertical: hp(3),
                }}>
                <Ionicons
                  color={Colors.grey}
                  name="chevron-back"
                  size={Size(3)}
                />
              </TouchableOpacity>
            </View>
            <Image
              source={Images.logo}
              resizeMode="contain"
              style={{
                height: hp(20),
                alignSelf: 'center',
                marginVertical: hp(3),
              }}
            />
          </View>

          <Text style={styles.welcomeText}>Forgot Password</Text>
        </View>
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

            <CustomButton
              gradient
              text={Strings.continue}
              size="medium"
              onPress={() => {
                handleButtonPress();
              }}
            />
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
