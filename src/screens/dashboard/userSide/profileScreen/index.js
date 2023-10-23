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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Images} from '../../../../assets/images';
import {Size, hp, wp} from '../../../../assets/dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../../../../assets/color';
import {useNavigation} from '@react-navigation/native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import CustomButton from '../../../../components/CustomButton';
import {Strings} from '../../../../assets/Strings';
import AsyncStorage from '@react-native-community/async-storage';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    // Retrieve user email from AsyncStorage
    AsyncStorage.getItem('userInfo')
      .then(userDataFromStorage => {
        if (userDataFromStorage) {
          const storedUserEmail = JSON.parse(userDataFromStorage).email;
          fetch('https://api.footballstatspro.com/api/users')
            .then(response => response.json())
            .then(data => {
              const matchingUser = data.users.filter(
                user => user.email === storedUserEmail,
              );
              if (matchingUser) {
                setUserData(matchingUser[0]);
              }
            })
            .catch(error => {
              console.log('Error fetching user data from API:', error);
            });
        }
      })
      .catch(error => {
        console.log('Error fetching user email from storage:', error);
      });
  };

  const onPress = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Splash');
    } catch (error) {
      console.log('Error clearing user data:', error);
    }
  };

  function RenderButton(props) {
    return (
      <TouchableOpacity onPress={props?.onPress} style={styles.button}>
        <View style={{flexDirection: 'row'}}>
          {props?.leftIcon}
          <Text style={{...styles.buttonText, ...props?.titleStyle}}>
            {props?.title}
          </Text>
        </View>
        <Ionicons color={Colors.grey} name="chevron-forward" size={Size(2)} />
      </TouchableOpacity>
    );
  }
  const handleGoToProfileSetting = () => {
    navigation.navigate('ProfileSetting', {userData});
  };
  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <AnimatedLinearGradient
        customColors={Colors.primaryGradient}
        speed={6000}
      />
      <HomeHeader
        title="Hi John Doe!"
        onBellPress={() => navigation.navigate('Notifications')}
      />
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
          overflow: 'hidden',
          flex: 1,
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <Text style={styles.welcomeText}>Profile</Text>
          <View style={styles.profileContainer}>
            <Image
              source={Images.user} // Replace with actual profile picture source
              style={styles.profilePicture}
            />
            {userData && (
              <View>
                <Text style={{...styles.infoText, ...styles.userName}}>
                  {`${userData.first_name} ${userData.last_name}`}
                </Text>
                <Text style={styles.infoText}>{userData.email}</Text>
              </View>
            )}
          </View>

          <RenderButton
            onPress={handleGoToProfileSetting}
            title="Profile Settings"
          />
          <RenderButton
            onPress={() => navigation.navigate('TermsAndConditions')}
            title="Terms and Conditions"
          />
          <RenderButton
            onPress={() => navigation.navigate('Subscription')}
            title="Subscription"
          />
          <RenderButton title="Help" />

          <View style={{marginTop: wp(5)}}>
            <CustomButton
              gradient
              text={Strings.logout}
              onPress={onPress}
              size="medium"
            />
          </View>
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
    marginTop: wp(5),
  },
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: wp(2),
    padding: wp(5),
  },
  profilePicture: {
    width: wp(20),
    height: wp(20),
    borderWidth: 0.2,
    borderRadius: 100,
    marginRight: wp(5),
    backgroundColor: 'white',
  },
  infoText: {
    fontSize: Size(1.6),
    marginBottom: 5,
    color: Colors.lightGrey,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: Size(2),
    color: Colors.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: wp(3),
    marginBottom: wp(2),
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    flexDirection: 'row',
    borderBottomWidth: wp(0.2),
    borderColor: Colors.grey,
  },
  buttonText: {
    fontSize: Size(1.6),
    textAlign: 'center',
    // marginLeft: wp(2),
    color: Colors.grey,
  },
  buttonContainer: {
    marginHorizontal: wp(5),
    flex: 1,
  },
});
