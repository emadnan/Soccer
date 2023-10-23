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
import AlertList from '../../../../components/alertsList';

export default function Notifications() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <AnimatedLinearGradient
        customColors={Colors.primaryGradient}
        speed={6000}
      />
      <HomeHeader
        dot
        title="Hi John Doe!"
        onBellPress={() => navigation.goBack()}
      />
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
          overflow: 'hidden',
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.titleView}>
            <View style={{width: wp(5)}} />
            <Text style={styles.welcomeText}>Notifications</Text>
            <Ionicons
              color={Colors.black}
              name="options-outline"
              size={Size(3)}
            />
          </View>
          <AlertList />
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
});
