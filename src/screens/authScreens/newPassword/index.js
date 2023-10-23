import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../../components/CustomTextInput';
import {Colors} from '../../../assets/color';
import {Strings} from '../../../assets/Strings';
import {Size, wp, hp} from '../../../assets/dimensions';
import {Images} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {BottomSheet} from '@rneui/themed';
import axios from 'axios';
import Loader from '../../../components/loader';

export default function NewPassword(props) {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setloading] = useState(false);

  const isPasswordValid = password => {
    return password.length >= 8;
  };

  const handleButtonPress = async () => {
    setPasswordError('');

    let hasError = false;

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
    reqData.append('email', props.email);
    reqData.append('new_password', password);

    try {
      const response = await axios.post(
        'https://api.footballstatspro.com/api/reset-password',
        reqData,
      );

      if (response.status === 201 || response.status === 200) {
        props.onBackdropPress('navOTP');
        navigation.navigate('UserStack');
      }
    } catch (error) {
      setloading(false);
      Alert.alert('Something went Wrong', 'Please Try Again.');
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
        isVisible={props.newPasswordSheet}>
        <Image
          source={Images.logo}
          resizeMode="contain"
          style={{height: hp(20), alignSelf: 'center', marginVertical: hp(3)}}
        />

        <Text style={styles.welcomeText}>New Password</Text>
        {loading ? (
          <Loader />
        ) : (
          <View>
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

            <CustomButton
              gradient
              text="Set New Password"
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
