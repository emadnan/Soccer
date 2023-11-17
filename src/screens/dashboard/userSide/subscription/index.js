import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,Alert
} from 'react-native';
import React, {useState}from 'react';
import HomeHeader from '../../../../components/homeHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Images} from '../../../../assets/images';
import {Size, hp, wp} from '../../../../assets/dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../../../../assets/color';
import {useNavigation ,useRoute} from '@react-navigation/native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import CustomButton from '../../../../components/CustomButton';
import {Strings} from '../../../../assets/Strings';
import { PlatformPayButton, usePlatformPay, PlatformPay } from '@stripe/stripe-react-native';
import axios from '../../../../redux/helper/axios';
export default function Subscription() { 
  const paymentTitle ='£7.50';
  const navigation = useNavigation();
  const [isHidden, setIsHidden] = useState(false);
  const { isPlatformPaySupported,confirmPlatformPayPayment,} = usePlatformPay();
  const route = useRoute();
  const userData = route.params;
console.log('subscription',userData.name);
  const toggleButton = () => {
    setIsHidden(true);
  };
  React.useEffect(() => {
    (async function () {
      if (!(await isPlatformPaySupported({ googlePay: {testEnv: true} }))) {
        Alert.alert('Google Pay is not supported.');
        return;
      }
    })();
  }, []);
  const fetchPaymentIntentClientSecret = async () => {
    try {
      // Fetch payment intent created on the server, see abov
      
      const response = await axios.post('https://api.footballstatspro.com/api/create-payment-intent', {
        currency: 'eur',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const { clientSecret } = response.data;
  
      return clientSecret;
    } catch (error) {
      // Handle error
      console.error('Error fetching payment intent:', error.message);
      throw error;
    }
  };
  const pay = async () => {
    const clientSecret =  await fetchPaymentIntentClientSecret();

    const { error } = await confirmPlatformPayPayment(
      clientSecret,
      {
        googlePay: {
          testEnv: true,
          merchantName: 'Soccer Subscription',
          merchantCountryCode: 'DE', // 'DE' is the ISO country code for Germany
          currencyCode: 'EUR', // 'EUR' is the ISO currency code for euros
          billingAddressConfig: {
            format: PlatformPay.BillingAddressFormat.Full,
            isPhoneNumberRequired: true,
            isRequired: true,
          },
        },
      }
    );

    if (error) {
      Alert.alert(error.code, error.message);
      // Update UI to prompt user to retry payment (and possibly another payment method)
      return;
    }
    Alert.alert('Success', 'The payment was confirmed successfully.');
  }



  // const handlePayment = () => {
  //     if (Platform.OS === 'android') {
  //       pay();
  
  //   }
  
  
  //     else if (Platform.OS === 'ios') {
  //       pay();
  //     }
  //   };
  


  function RenderButton(props) {
    return (
      <TouchableOpacity onPress={props?.onPress} style={styles.button}>
        <View>
          <Text style={{...styles.buttonText, ...props?.titleStyle}}>
            {/* {props?.title}{' '} */}
            {paymentTitle}
            <Text style={{...styles.buttonText, ...styles.titleStyle}}>
              /month
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(5),
            marginVertical: wp(2),
          }}>
          <Ionicons color={Colors.grey} name="star" size={Size(2)} />
          <Text style={{marginLeft: wp(2), color: Colors.black}}>
            In Play Alerts
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(5),
            marginVertical: wp(2),
          }}>
          <Ionicons color={Colors.grey} name="star" size={Size(2)} />
          <Text style={{marginLeft: wp(2), color: Colors.black}}>
            List Builder
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(5),
            marginVertical: wp(2),
          }}>
          <Ionicons color={Colors.grey} name="star" size={Size(2)} />
          <Text style={{marginLeft: wp(2), color: Colors.black}}>
            Detailed Match Statistics
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: wp(5),
            marginVertical: wp(2),
          }}>
          <Ionicons color={Colors.grey} name="star" size={Size(2)} />
          <Text style={{marginLeft: wp(2), color: Colors.black}}>Streaks</Text>
        </View>
        <View style={{marginTop: wp(5), marginHorizontal: wp(2)}}>
        <CustomButton
            buttonTextStyle={{ fontSize: Size(1.8) }}
            gradient
            text={'Subscribe Now!'}
            size="medium"
            onPress={toggleButton}
          />

          {isHidden ? <>
            <PlatformPayButton
              // type={PlatformPayButton.ButtonType.Pay} f
              onPress={pay}
              style={{
                width: '100%',
                height: 50,
              }}
            />
          </> : null
          }
        </View>
      </TouchableOpacity>
    );
  }

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
            <Text style={styles.welcomeText}>Subscription</Text>
            <Ionicons color={Colors.white} name="pencil" size={Size(3)} />
          </View>

          <RenderButton
            onPress={() => navigation.navigate('ProfileSetting')}
            title="£7.5"
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
    paddingVertical: wp(5),
    marginVertical: wp(5),
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.11,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonText: {
    fontSize: Size(4.5),
    textAlign: 'center',
    // marginLeft: wp(2),
    color: Colors.textBlue,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginHorizontal: wp(5),
    flex: 1,
  },
  titleStyle: {
    fontSize: Size(3),
  },
});
