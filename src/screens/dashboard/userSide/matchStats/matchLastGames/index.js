import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Size, wp} from '../../../../../assets/dimensions';
import {Colors} from '../../../../../assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Loader from '../../../../../components/loader';

export default function MatchLastGames({teamAId}) {
  const [matchData, setMatchData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchMatchData();
  }, []);

  const fetchMatchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.bring-the-boom.com/api/native/teamlg?teamid=${teamAId}`,
        {
          headers: {
            'X-RapidAPI-Key':
              '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
          },
        },
      );
      console.log('response.data: ', response.data);
      setMatchData(response.data);
    } catch (error) {
      console.error('Error fetching match data in MatchLastGames:', error);
    } finally {
      setLoading(false);
    }
  };

  const Content = props => {
    const {matches} = props.matchData;

    if (!matches || !Array.isArray(matches) || matches.length === 0) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text>Loading.....</Text>
        </View>
      );
    }

    return (
      <>
        {matches.map((match, index) => (
          <View key={index}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: wp(0.1),
                  borderTopWidth: props?.top ? 0 : wp(0.1),
                  borderColor: 'grey',
                }}>
                <Text style={styles.titleStyle}>
                  {new Date(match.fixture.time).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
                <Text style={styles.titleStyle}>
                  {new Date(match.fixture.time).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </Text>
              </View>

              <View style={styles.rowStyle}>
                <Text style={{color: 'transparent'}}>Avg For</Text>
                <Text style={{color: 'transparent'}}>Avg For</Text>
                <Text style={styles.textContent}>Goals FT/HT</Text>
                <Text style={styles.textContent}>Corners FT/HT</Text>
              </View>
              <View style={styles.rowStyle}>
                <View style={{flex: 1, flexShrink: 1}}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {match.hometeam.name}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 50,
                  }}>
                  <Text style={styles.textContent}>Home</Text>
                  <Text style={styles.textContent}>
                    {match.hometeam.ft_goals}-{match.hometeam.ht_goals} (
                    {match.hometeam.ft_goals}-{match.hometeam.ht_goals})
                  </Text>
                  <Text style={styles.textContent}>
                    {match.hometeam.ft_corners}-{match.hometeam.ht_corners} (
                    {match.hometeam.ft_corners}-{match.hometeam.ht_corners})
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.rowStyle,
                  {
                    backgroundColor: Colors.backgroundGrey,
                    paddingVertical: 2,
                  },
                ]}>
                <View style={{flex: 1, flexShrink: 1}}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {match.awayteam.name}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 50,
                  }}>
                  <Text style={styles.textContent}>Away</Text>
                  <Text style={styles.textContent}>
                    {match.awayteam.ft_goals}-{match.awayteam.ht_goals} (
                    {match.awayteam.ft_goals}-{match.awayteam.ht_goals})
                  </Text>
                  <Text style={styles.textContent}>
                    {match.awayteam.ft_corners}-{match.awayteam.ht_corners} (
                    {match.awayteam.ft_corners}-{match.awayteam.ht_corners})
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.country}>{match.league.name}</Text>
          </View>
        ))}
      </>
    );
  };

  const InnerCard = ({matchData}) => {
    return (
      <View style={styles.cardview}>
        <Content matchData={matchData} top />
      </View>
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={{marginBottom: 70}}>
          <ScrollView contentContainerStyle={{paddingBottom: wp(5)}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(5),
                }}>
                <Text style={styles.headerStyle}>Last Home Team Games</Text>
                <View style={styles.headerButton}>
                  <Text style={{color: Colors.black, fontSize: Size(1.4)}}>
                    Show 10 Entries
                  </Text>
                  <Ionicons
                    style={{marginLeft: wp(2)}}
                    color={'grey'}
                    name="chevron-down"
                    size={Size(2)}
                  />
                </View>
                <Ionicons
                  color={Colors.black}
                  name="options-outline"
                  size={Size(3)}
                />
              </View>

              <InnerCard matchData={matchData} />
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(5),
                  marginTop: wp(5),
                }}>
                <Text style={styles.headerStyle}>Last Away Team Games</Text>
                <View style={styles.headerButton}>
                  <Text style={{color: Colors.black, fontSize: Size(1.4)}}>
                    Show 10 Entries
                  </Text>
                  <Ionicons
                    style={{marginLeft: wp(2)}}
                    color={'grey'}
                    name="chevron-down"
                    size={Size(2)}
                  />
                </View>
                <Ionicons
                  color={Colors.black}
                  name="options-outline"
                  size={Size(3)}
                />
              </View>

              <InnerCard matchData={matchData} />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cardview: {
    width: wp(90),
    borderRadius: Size(1),
    marginHorizontal: wp(5),
    backgroundColor: Colors.white,
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
  titleStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Size(1.6),
    paddingVertical: wp(2),
    fontWeight: 'bold',
    // width: '100%',
    color: Colors.black,
    marginHorizontal: wp(2),
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    marginVertical: wp(1),
    alignItems: 'center',
  },
  textContent: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
  },
  headerStyle: {
    marginVertical: wp(2),
    marginTop: wp(5),
    fontWeight: 'bold',
    fontSize: Size(1.6),
    color: Colors.black,
  },
  headerView: {
    backgroundColor: Colors.white,
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
  headerButton: {
    padding: wp(2),
    borderWidth: 0.5,
    borderColor: Colors.lightGrey,
    margin: wp(2),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  country: {
    alignSelf: 'center',
    color: Colors.black,
    fontWeight: 'bold',
    marginVertical: wp(2),
  },
});
