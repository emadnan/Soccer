import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import HomeHeader from '../../../../components/homeHeader';
import {Size, hp, wp} from '../../../../assets/dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../../../../assets/color';
import {useNavigation} from '@react-navigation/native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LiveStats from './LiveStats';
import {Images} from '../../../../assets/images';

export default function FixtureDetail() {
  const navigation = useNavigation();
  const onBellPress = () => {
    if (navigation.canGoBack()) {
      // There's a previous screen, navigate back
      navigation.goBack();
    } else {
      // No previous screen, navigate to NotificationScreen
      navigation.navigate('Notifications');
    }
  };





  const TeamWindow = props => {
    return (
      <View style={styles.windowContainer}>
        <View style={styles.itemView}>
          <Image
            source={props?.teamLogo ? props?.teamLogo : Images.idezia}
            resizeMode="contain"
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>{props?.teamName}</Text>
        </View>
        <View style={styles.itemView}>
          <Text style={{...styles.teamName, ...styles.numbers}}>
            {props?.wins}
          </Text>
          <View>
            <Text style={{...styles.teamName, alignSelf: 'auto'}}>Win</Text>
            <Text
              style={{
                ...styles.teamName,
                alignSelf: 'auto',
              }}>{`${props?.teamName} have won ${props?.wins} consecutive games`}</Text>
          </View>
        </View>
        <View style={styles.itemView}>
          <Text style={{...styles.teamName, ...styles.numbers}}>
            {props?.lose}
          </Text>
          <View>
            <Text style={{...styles.teamName, alignSelf: 'auto'}}>Lose</Text>
            <Text
              style={{
                ...styles.teamName,
                alignSelf: 'auto',
              }}>{`${props?.teamName} have lose ${props?.lose} consecutive games`}</Text>
          </View>
        </View>
        <View style={styles.itemView}>
          <Text style={{...styles.teamName, ...styles.numbers}}>
            {props?.unBeaten}
          </Text>
          <View>
            <Text style={{...styles.teamName, alignSelf: 'auto'}}>
              unbeaten
            </Text>
            <Text
              style={{
                ...styles.teamName,
                alignSelf: 'auto',
              }}>{`${props?.teamName} is unbeaten from previous ${props?.unBeaten} games`}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <AnimatedLinearGradient
        customColors={Colors.primaryGradient}
        speed={6000}
      />
      <HomeHeader
  
      />
      <LiveStats />
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
          overflow: 'hidden',
        }}>
        <ScrollView nestedScrollEnabled>
          <View style={styles.titleView}>
            {/* <TouchableOpacity> */}
            {/* <Ionicons color={Colors.white} name="chevron-back" size={Size(3)} /> */}
            {/* </TouchableOpacity> */}
            <Text style={styles.welcomeText}>Streaks</Text>
            {/* <Ionicons
              color={Colors.white}
              name="options-outline"
              size={Size(3)}
            /> */}
          </View>
          <Text
            style={{
              ...styles.welcomeText,
              alignSelf: 'auto',
              fontSize: Size(2),
              marginLeft: wp(5),
            }}>
            Match Streaks
          </Text>
          <View>
            <ScrollView>
              <TeamWindow
                wins="2"
                lose="0"
                unBeaten="5"
                teamName="Arsenal"
                teamLogo={Images.idezia}
              />
              <TeamWindow
                wins="4"
                lose="2"
                unBeaten="2"
                teamName="Chelsea"
                teamLogo={Images.idezia2}
              />
            </ScrollView>
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
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginTop: wp(5),
  },
  windowContainer: {
    width: wp(90),
    alignSelf: 'center',
    marginVertical: wp(2),
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  teamLogo: {
    width: wp(10),
    height: wp(10),
  },
  itemView: {
    borderBottomWidth: 0.2,
    padding: wp(2),
    flexDirection: 'row',
  },
  teamName: {
    alignSelf: 'center',
    marginLeft: wp(2),
    fontSize: Size(1.6),
    color: Colors.grey,
  },
  numbers: {
    fontSize: Size(3.8),
    marginRight: wp(2),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
