import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderStats from '../headerStats';
import CustomButton from '../../../../../components/CustomButton';
import {Colors} from '../../../../../assets/color';
import {Size, hp, wp} from '../../../../../assets/dimensions';
import {Images} from '../../../../../assets/images';
import axios from 'axios';

export default function MatchStandings({matchId, championshipId}) {
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
        `https://soccer-football-info.p.rapidapi.com/championships/view/?i=${championshipId}`,
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
    }
  };

  const RenderItem = ({matchData}) => {
    if (
      !matchData.result ||
      !Array.isArray(matchData.result) ||
      matchData.result.length === 0
    ) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text>Loading.....</Text>
        </View>
      );
    }

    const matchResult = matchData.result[0];

    if (matchResult.seasons.length === 0) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text>No Record Found</Text>
        </View>
      );
    }

    return (
      <View>
        {matchResult.seasons.map((season, seasonIndex) => (
          <View
            key={seasonIndex}
            style={{borderBottomWidth: 0.2, paddingBottom: wp(2)}}>
            {season.groups.map((group, groupIndex) => (
              <View key={groupIndex}>
                <View>
                  <View style={styles.headingView}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.objLeft}>#</Text>
                      <Text style={styles.objLeft}>Team</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.objRightHead}>MP</Text>
                      <Text style={styles.objRightHead}>W</Text>
                      <Text style={styles.objRightHead}>D</Text>
                      <Text style={styles.objRightHead}>L</Text>
                      <Text style={styles.objRightHead}>G</Text>
                      <Text style={styles.objRightHead}>PTS</Text>
                    </View>
                  </View>
                </View>
                {group.table.map((team, teamIndex) => (
                  <View key={teamIndex} style={styles.teamDataContainer}>
                    <View style={styles.teamInfoContainer}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                        }}>
                        <Text style={styles.objLeft}>
                          {(teamIndex + 1).toString().padStart(2, '0')}
                        </Text>
                        <Image
                          source={Images.idezia2}
                          resizeMode="contain"
                          style={styles.teamLogo}
                        />
                        <Text style={{flexShrink: 1}}>{team.team.name}</Text>
                      </View>
                    </View>

                    <View style={styles.teamStatsContainer}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.objRight}>
                          {team.position.toString().padStart(2, '0')}
                        </Text>
                        <Text style={styles.objRight}>
                          {team.win.toString().padStart(2, '0')}
                        </Text>
                        <Text style={styles.objRight}>
                          {team.draw.toString().padStart(2, '0')}
                        </Text>
                        <Text style={styles.objRight}>
                          {team.loss.toString().padStart(2, '0')}
                        </Text>
                        <Text style={styles.objRight}>{`${team.goals_scored
                          .toString()
                          .padStart(2, '0')}:${team.goals_conceded
                          .toString()
                          .padStart(2, '0')}`}</Text>
                        <Text style={styles.objRight}>
                          {team.points.toString().padStart(2, '0')}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row-reverse'}}>
                        <Text
                          style={{
                            ...styles.objRightCard,
                            backgroundColor: Colors.cardGreen,
                          }}>
                          W
                        </Text>
                        <Text
                          style={{
                            ...styles.objRightCard,
                            backgroundColor: Colors.cardRed,
                          }}>
                          L
                        </Text>
                        <Text
                          style={{
                            ...styles.objRightCard,
                            backgroundColor: Colors.cardYellow,
                          }}>
                          D
                        </Text>
                        <Text
                          style={{
                            ...styles.objRightCard,
                            backgroundColor: Colors.cardGrey,
                          }}>
                          ?
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={{marginBottom: 100}}>
        <View style={styles.headerView}>
          <HeaderStats matchId={matchId} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            margin: wp(2),
          }}>
          <CustomButton
            overrideStyle={{margin: wp(2)}}
            buttonTextStyle={{fontSize: Size(1.6)}}
            gradient
            text="Overall"
            size="customSmall"
          />
          <CustomButton
            overrideStyle={{margin: wp(2)}}
            buttonTextStyle={{color: Colors.black, fontSize: Size(1.6)}}
            text="Home"
            size="customSmall"
          />
          <CustomButton
            overrideStyle={{margin: wp(2)}}
            buttonTextStyle={{color: Colors.black, fontSize: Size(1.6)}}
            text="Away"
            size="customSmall"
          />
        </View>

        <RenderItem matchData={matchData} />
      </View>
    </ScrollView>
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
  renderView: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    paddingVertical: wp(1),
    height: hp(6),
  },
  objLeft: {
    marginLeft: wp(5),
    fontSize: Size(1.8),
    color: Colors.black,
  },
  objRightHead: {
    marginRight: wp(6),
    fontSize: Size(1.8),
    color: Colors.black,
  },
  objRight: {
    marginRight: wp(5),
    fontSize: Size(1.6),
    color: Colors.black,
  },
  objRightCard: {
    marginRight: wp(5),
    fontSize: Size(1.8),
    color: Colors.white,

    height: wp(5),
    width: wp(5),
    borderRadius: wp(0.8),
    textAlign: 'center',
  },
  teamLogo: {
    height: wp(5),
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
