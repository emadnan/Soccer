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
import BuilderGrid from '../../../../components/builderGrid';
import FavouriteGrid from '../../../../components/favouriteGrid';

export default function ResultList() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <AnimatedLinearGradient
        customColors={Colors.primaryGradient}
        speed={6000}
      />
      <HomeHeader
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
            <Text style={styles.welcomeText}>Result List</Text>
            <Ionicons
              color={Colors.white}
              name="options-outline"
              size={Size(3)}
            />
          </View>
          <FavouriteGrid />
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
