import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../../../../components/homeHeader';
import {Size, hp, wp} from '../../../../assets/dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../../../../assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import {Images} from '../../../../assets/images';
import {Strings} from '../../../../assets/Strings';
import CustomTextInput from '../../../../components/CustomTextInput';
import CustomButton from '../../../../components/CustomButton';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default function ProfileSetting() {
  const navigation = useNavigation();
  const route = useRoute();

  const [check1, setCheck1] = useState(false);
  const [loading, setloading] = useState(false);

  const [userId, setUserId] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const userData = route.params.userData;

  useEffect(() => {
    setUserId(userData.id);
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setPhoneNo(userData.phone_no);
  }, []);

  const onPress = async () => {
    const updatedData = new FormData();
    updatedData.append('first_name', firstName);
    updatedData.append('last_name', lastName);
    updatedData.append('phone_no', phoneNo);

    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      try {
        const response = await axios.post(
          `http://api.footballstatspro.com/api/update-user/${userId}`,
          updatedData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${bearerToken}`,
            },
          },
        );
        navigation.navigate('Profile');
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <AnimatedLinearGradient
        customColors={Colors.primaryGradient}
        speed={6000}
      />
      {userData && (
        <HomeHeader
          title={`${userData.firstName} ${userData.lastName}`}
          onBellPress={() => navigation.navigate('Notifications')}
        />
      )}
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
          overflow: 'hidden',
          flex: 1,
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: wp(5),
              paddingHorizontal: wp(5),
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                alignItems: 'center',
                padding: wp(1),
                borderRadius: wp(100),
                backgroundColor: Colors.extralightgray,
              }}>
              <Ionicons
                color={Colors.grey}
                name="chevron-back"
                size={Size(3)}
              />
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Profile Setting</Text>
            <Ionicons color={Colors.grey} name="pencil" size={Size(3)} />
          </View>
          <CustomTextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder={'First Name'}
          />
          <CustomTextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder={'Last Name'}
          />
          <CustomTextInput
            value={phoneNo}
            onChangeText={setPhoneNo}
            placeholder={'Phone Number'}
          />
          {/* <CustomTextInput
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
          /> */}

          {/* <CustomTextInput
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
          /> */}

          <View style={{height: hp(5)}} />

          <CustomButton
            onPress={onPress}
            gradient
            text={'Update'}
            size="medium"
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    alignSelf: 'center',
    width: wp(100),
    height: hp(45),
  },
  welcomeText: {
    fontSize: Size(2.4),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
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
});
