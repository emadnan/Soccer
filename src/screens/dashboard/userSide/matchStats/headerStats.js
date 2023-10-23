import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Image, Text, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {wp, Size, hp} from '../../../../assets/dimensions';
import {Images} from '../../../../assets/images';
import {Colors} from '../../../../assets/color';
import axios from 'axios';
import moment from 'moment';

const HexagonalCircleItem = ({item}) => {
  const navigation = useNavigation();

  if (!item.result || !Array.isArray(item.result) || item.result.length === 0) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
        }}>
        <Text>Loading.....</Text>
      </View>
    );
  }

  // { "m_awayteam_name": "Tuggeranong Utd Women", "m_awayteam_score": "0", "m_fixture_date": "2023-08-31 08:30:00", "m_fixture_id": "b1037f9b132f5f8e", "m_fixture_status": "IN_PLAY", "m_fixture_timer": "87:10", "m_hometeam_id": "3910ae26b446cd8c", "m_hometeam_logo": "https://static.soccerfootball.info/images/?i=3910ae26b446cd8c", "m_hometeam_name": "Canberra Olympic Women", "m_hometeam_score": "4", "m_id": "688", "m_league_id": "1e466281f346b650", "m_league_logo": "https://static.soccerfootball.info/images/?i=1e466281f346b650", "m_league_name": "Australia Capital Territory Premier League Women", "m_league_s_name": null}

  const formattedDate = moment(item.result[0].m_fixture_date).format(
    'D MMMM YYYY',
  );
  const startTime = moment(item.result[0].m_fixture_date).format('h:mm A');

  return (
    <View style={styles.itemContainer}>
      <View style={styles.topView}>
        <Text style={styles.liveText}>{item.result[0].m_fixture_status}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexShrink: 1,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: item.result[0].m_hometeam_logo}}
            resizeMode="contain"
            style={styles.teamLogo}
          />
          <Text
            style={{
              ...styles.scoreText,
              marginVertical: wp(0),
              marginHorizontal: wp(2),
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {item.result[0].m_hometeam_name}
          </Text>
        </View>

        <View style={{flex: 1, flexShrink: 1}}>
          <Text
            style={{
              ...styles.scoreText,
              fontSize: Size(1.8),
              textAlign: 'center',
              // fontWeight: 'bold',
            }}>
            {formattedDate}
          </Text>
          <Text
            style={{
              ...styles.scoreText,
              // fontSize: Size(2.8),
              fontWeight: 'bold',
            }}>
            {item.result[0].m_fixture_timer}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: item.result[0].m_awayteam_logo}}
            resizeMode="contain"
            style={styles.teamLogo}
          />
          <Text
            style={{
              ...styles.scoreText,
              marginVertical: wp(0),
              marginHorizontal: wp(2),
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {item.result[0].m_awayteam_name}
          </Text>
        </View>
      </View>

      <View style={styles.placeContainer}>
        <Image source={{uri: item.m_league_logo}} style={styles.flagImage} />
        <Text
          onPress={() => navigation.navigate('FixtureDetail')}
          style={styles.detailsText}>
          {item.result[0].m_league_name}
        </Text>
      </View>
    </View>
  );
};

const HeaderStats = ({matchId}) => {
  const [matchData, setMatchData] = useState({});
  useEffect(() => {
    fetchMatchData();
    const interval = setInterval(fetchMatchData, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const fetchMatchData = async () => {
    try {
      const response = await axios.get(
        `https://api.bring-the-boom.com/api/native/matchheader?matchid=${matchId}`,
        {
          headers: {
            'X-RapidAPI-Key':
              '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
          },
        },
      );

      setMatchData(response.data);
    } catch (error) {
      console.error('Error fetching match data in HeaderStats: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <HexagonalCircleItem item={matchData} />
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
    // borderRadius: 20,
    // marginHorizontal: wp(5),
    // marginVertical: wp(1),
    // height:hp(25),
    // paddingHorizontal: wp(2),
    // paddingBottom: wp(2),
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
    width: wp(8),
    height: wp(8),
    alignSelf: 'center',
  },
  scoreText: {
    fontSize: Size(2),
    alignSelf: 'center',
    marginVertical: wp(1),
    color: Colors.black,
  },
  detailsText: {
    fontSize: Size(1.6),
    alignSelf: 'center',
    color: Colors.black,
    borderWidth: 0.5,
    paddingHorizontal: wp(5),
    // paddingVertical: wp(2),
    borderRadius: 10,
    borderColor: Colors.white,
  },
  placeContainer: {
    // borderWidth: 0.5,
  },
  flagImage: {
    width: 20,
    height: 20,
    margin: 2,
  },
});

export default HeaderStats;
