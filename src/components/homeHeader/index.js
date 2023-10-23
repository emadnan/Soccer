import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import IIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Size, hp, wp} from '../../assets/dimensions';
import {Colors} from '../../assets/color';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

export default function HomeHeader(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection: 'row', marginLeft: wp(4)}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonStyle}>
          <Image
            source={Images.logo2}
            resizeMode="contain"
            style={styles.userImage}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <IIcon
          onPress={props.onBellPress}
          color={Colors.white}
          name="search-outline"
          size={Size(4)}
        />
        <View style={{width: wp(5)}} />
        <View style={{alignItems: 'center'}}>
          <IIcon
            onPress={props.onBellPress}
            color={Colors.white}
            name="notifications-outline"
            size={Size(4)}
          />
          {props?.dot && (
            <MaterialCommunityIcons
              color={Colors.white}
              name="circle-medium"
              size={Size(2)}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    alignSelf: 'center',
    paddingTop: hp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // zIndex:1,
    paddingBottom: wp(3),
    backgroundColor: 'rgba(0,0,0,0)',
  },
  backButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: Size(2),
    color: Colors.lightGrey,
    marginLeft: wp(8),
    alignSelf: 'center',
  },
  userImage: {
    alignSelf: 'center',
    width: wp(30),
    height: wp(12),
  },
});
