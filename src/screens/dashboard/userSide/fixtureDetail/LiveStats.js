import React from 'react';
import {View, FlatList, StyleSheet, Image, Text, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {wp, Size, hp} from '../../../../assets/dimensions';
import {Images} from '../../../../assets/images';
import {Colors} from '../../../../assets/color';

const HexagonalCircleItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.itemContainer}>
      <View style={styles.topView}>
        <Text style={styles.liveText}>Live</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: wp(4),
        }}>
        <View>
          <Image
            source={Images.idezia}
            resizeMode="contain"
            style={styles.teamLogo}
          />
          <Text
            style={{
              ...styles.scoreText,
              marginVertical: wp(0),
              fontWeight: 'bold',
            }}>
            Team 1
          </Text>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(20),
            }}>
            <Text
              style={{
                ...styles.scoreText,
                fontSize: Size(3.2),
                fontWeight: 'bold',
              }}>
              4
            </Text>
            <Text
              style={{
                ...styles.scoreText,
                fontSize: Size(3.2),
                fontWeight: 'bold',
              }}>
              -
            </Text>
            <Text
              style={{
                ...styles.scoreText,
                fontSize: Size(3.2),
                fontWeight: 'bold',
              }}>
              6
            </Text>
          </View>
          <Text
            style={{
              ...styles.scoreText,
              fontSize: Size(3.2),
              fontWeight: 'bold',
            }}>
            62'
          </Text>
        </View>

        <View>
          <Image
            source={Images.idezia2}
            resizeMode="contain"
            style={styles.teamLogo}
          />
          <Text
            style={{
              ...styles.scoreText,
              marginVertical: wp(0),
              fontWeight: 'bold',
            }}>
            Team 2
          </Text>
        </View>
      </View>
      <View style={styles.placeContainer}>
        <Text
          onPress={() => navigation.navigate('FixtureDetail')}
          style={styles.detailsText}>
          🇪🇸 La Liga
        </Text>
      </View>
    </View>
  );
};

const LiveStats = () => {
  return (
    <View style={styles.container}>
      <HexagonalCircleItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height:hp(25),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    flex: 1,
    width: wp(100),
    // alignItems:'center',
    // paddingHorizontal: 10,
  },
  itemContainer: {
    borderRadius: 20,
    marginHorizontal: wp(5),
    // marginVertical: wp(1),
    // height:hp(25),
    // paddingHorizontal: wp(2),
    paddingBottom: wp(2),
    // alignItems:'center',
  },
  topView: {
    width: wp(95),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  liveText: {
    padding: wp(2),
    backgroundColor: 'red',
    color: Colors.white,
    fontSize: Size(1.8),
    borderRadius: 15,
    paddingHorizontal: wp(5),
    fontWeight: 'bold',
  },
  locationTitle: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundGrey,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: wp(4),
    fontSize: Size(1.8),
    paddingTop: wp(2),
    color: Colors.black,
  },
  teamLogo: {
    width: wp(13),
    height: wp(13),
    alignSelf: 'center',
  },
  scoreText: {
    fontSize: Size(2.8),
    alignSelf: 'center',
    marginVertical: wp(1),
    color: Colors.white,
  },
  detailsText: {
    fontSize: Size(1.6),
    alignSelf: 'center',
    color: Colors.white,
    borderWidth: 0.5,
    paddingHorizontal: wp(5),
    paddingVertical: wp(2),
    borderRadius: 10,
    borderColor: Colors.white,
  },
  placeContainer: {
    // borderWidth: 0.5,
  },
});

export default LiveStats;
