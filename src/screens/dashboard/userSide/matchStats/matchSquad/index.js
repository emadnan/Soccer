import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderStats from '../headerStats';
import CustomButton from '../../../../../components/CustomButton';
import {Colors} from '../../../../../assets/color';
import {Size, hp, wp} from '../../../../../assets/dimensions';
import {Images} from '../../../../../assets/images';
import axios from 'axios';
import Loader from '../../../../../components/loader';
import NoRecordFound from '../../../../../components/noRecordFound';

export default function MatchSquads({matchId}) {
  const [matchData, setMatchData] = useState({matchId});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchMatchData();
    const interval = setInterval(fetchMatchData, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const fetchMatchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.bring-the-boom.com/api/native/getplayerdetails?matchid=${matchId}`, //${matchId}
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
      console.error('Error fetching match data in MatchStandings:', error);
    } finally {
      setLoading(false);
    }
  };

  const RenderItem = ({matchData}) => {
    console.log('matchData: in MatchSquad ---> ', matchData);
    const {hometeam, awayteam} = matchData;
    if (
      !hometeam ||
      hometeam === '' ||
      !Array.isArray(hometeam) ||
      hometeam.length === 0 ||
      !awayteam ||
      awayteam === '' ||
      !Array.isArray(awayteam) ||
      awayteam.length === 0
    ) {
      return <NoRecordFound />;
    }

    return (
      <>
        <View style={{borderBottomWidth: 0.2, paddingBottom: wp(2)}}>
          <View>
            <View>
              <View style={styles.headingView}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.objLeft}>Starting 11</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Image
                      source={Images.game_icons_soccers}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                  </View>
                  <View>
                    <Image
                      source={Images.solar_football}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                  </View>
                  <View>
                    <Image
                      source={Images.game_icons_soccer_kick}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                  </View>
                  <View>
                    <Image
                      source={Images.redRectangle}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                  </View>
                  <View>
                    <Image
                      source={Images.yellowRectangle}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                  </View>
                  <View>
                    <Image
                      source={Images.cardGroup}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                  </View>
                  <View>
                    <Image
                      source={Images.mdi_clock}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                  </View>
                  <View>
                    <Image
                      source={Images.favorite_like_stars}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                  </View>
                </View>
              </View>
            </View>

            {hometeam.map((team, index) => (
              <View key={index} style={styles.teamDataContainer}>
                <View style={styles.teamInfoContainer}>
                  <View
                    style={[
                      styles.objLeft,
                      {
                        flexShrink: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      },
                    ]}>
                    <Image
                      source={Images.squadProfile}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                    <View style={{flexShrink: 1}}>
                      <Text>
                        {team.name} {/* {team.team.name} */}
                      </Text>
                      <Text style={{fontSize: Size(1.4)}}>
                        {team.status} {/* {team.team.name} */}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.teamStatsContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.objRight}>
                      {team.matches.toString().padStart(2, '0')}
                      {/* {team.position.toString().padStart(2, '0')} */}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.sno.toString().padStart(2, '0')}
                      {/* {team.win.toString().padStart(2, '0')} */}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.goal.toString().padStart(2, '0')}
                      {/* {team.draw.toString().padStart(2, '0')} */}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.red_card.toString().padStart(2, '0')}
                      {/* {team.loss.toString().padStart(2, '0')} */}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.yellow_card.toString().padStart(2, '0')}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.yellow_to_red_card
                        .toString()
                        .padStart(2, '0')}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.penalty_score.toString().padStart(2, '0')}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.penalty_miss.toString().padStart(2, '0')}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            {awayteam.map((team, index) => (
              <View key={index} style={styles.teamDataContainer}>
                <View style={styles.teamInfoContainer}>
                  <View
                    style={[
                      styles.objLeft,
                      {
                        flexShrink: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      },
                    ]}>
                    <Image
                      source={Images.squadProfile}
                      resizeMode="contain"
                      style={styles.icons}
                    />
                    <View style={{flexShrink: 1}}>
                      <Text>
                        {team.name} {/* {team.team.name} */}
                      </Text>
                      <Text style={{fontSize: Size(1.4)}}>
                        {team.status} {/* {team.team.name} */}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.teamStatsContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.objRight}>
                      {team.matches.toString().padStart(2, '0')}
                      {/* {team.position.toString().padStart(2, '0')} */}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.sno.toString().padStart(2, '0')}
                      {/* {team.win.toString().padStart(2, '0')} */}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.goal.toString().padStart(2, '0')}
                      {/* {team.draw.toString().padStart(2, '0')} */}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.red_card.toString().padStart(2, '0')}
                      {/* {team.loss.toString().padStart(2, '0')} */}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.yellow_card.toString().padStart(2, '0')}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.yellow_to_red_card
                        .toString()
                        .padStart(2, '0')}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.penalty_score.toString().padStart(2, '0')}
                    </Text>
                    <Text style={styles.objRight}>
                      {team.stats.penalty_miss.toString().padStart(2, '0')}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <View style={styles.headerView}>
            <HeaderStats matchId={matchId} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: wp(2),
            }}>
            <Text
              style={{
                marginLeft: wp(2),
                color: Colors.black,
                fontSize: Size(2),
                fontWeight: 'bold',
              }}>
              Line-Ups
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{margin: wp(2), color: Colors.black, fontSize: Size(2)}}>
              Home
            </Text>
            <Text
              style={{margin: wp(2), color: Colors.black, fontSize: Size(2)}}>
              Away
            </Text>
          </View>

          <RenderItem matchData={matchData} />
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
  headingView: {
    flexDirection: 'row',
    backgroundColor: Colors.Extlightgray,
    justifyContent: 'space-between',
    paddingVertical: wp(1),
  },

  objLeft: {
    marginLeft: wp(5),
    fontSize: Size(1.8),
    color: Colors.black,
  },
  objRight: {
    marginRight: wp(3),
    fontSize: Size(1.8),
    color: Colors.black,
  },
  objRightCard: {
    marginRight: wp(5),
    fontSize: Size(1.6),
    color: Colors.white,

    height: wp(5),
    width: wp(5),
    borderRadius: wp(0.8),
    textAlign: 'center',
  },
  icons: {
    height: wp(5),
    marginRight: wp(4),
  },
  teamDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp(1),
  },
  teamInfoContainer: {
    flex: 1,
  },
  teamStatsContainer: {
    // flex: 1,
    justifyContent: 'flex-end',
  },
});
