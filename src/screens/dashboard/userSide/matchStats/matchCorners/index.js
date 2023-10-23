import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import HeaderStats from '../headerStats';
import {Size, hp, wp} from '../../../../../assets/dimensions';
import {Colors} from '../../../../../assets/color';
import {Images} from '../../../../../assets/images';
import {ListItem} from '@rneui/themed';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

export default function MatchCorners({matchId, matchData}) {
  console.log('matchData: ', matchData);

  if (!matchData) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading.....</Text>
      </View>
    );
  }

  const {fulltime, firsthalf, hometeaminterval, awayteaminterval, basic} =
    matchData;

  const interval = [hometeaminterval, awayteaminterval];
  function LastTenMatches({firsthalf, basic}) {
    return (
      <View style={styles.lastTenContainer}>
        <Text style={styles.title}>Last 10 Matches</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: wp(2),
            paddingHorizontal: wp(2),
          }}>
          <View>
            <Image
              source={{uri: basic.m_hometeam_logo}}
              resizeMode="contain"
              style={styles.teamLogo}
            />
            <Text
              style={{
                ...styles.scoreText,
                marginVertical: wp(0),
                marginHorizontal: wp(2),
                fontWeight: 'bold',
              }}>
              {basic.m_hometeam_name}
            </Text>
          </View>
          <View>
            <Image
              source={{uri: basic.m_awayteam_logo}}
              resizeMode="contain"
              style={styles.teamLogo}
            />
            <Text
              style={{
                ...styles.scoreText,
                marginVertical: wp(0),
                marginHorizontal: wp(2),
                fontWeight: 'bold',
              }}>
              {basic.m_awayteam_name}
            </Text>
          </View>
        </View>
        <ListItem
          containerStyle={{
            justifyContent: 'space-between',
            alignSelf: 'center',
            alignItems: 'center',
            borderBottomWidth: wp(0.2),
          }}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'justify',
                fontWeight: 'bold',
                color: 'black',
              }}>
              Averages
            </Text>
          </View>
        </ListItem>
        <ListItem
          containerStyle={{
            justifyContent: 'space-between',
            alignSelf: 'center',
            alignItems: 'center',
            borderBottomWidth: wp(0.2),
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {firsthalf.average.hometeam_total}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'justify',
                color: 'black',
              }}>
              Average Total
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {firsthalf.average.awayteam_total}
            </Text>
          </View>
        </ListItem>
        <ListItem
          containerStyle={{
            justifyContent: 'space-between',
            alignSelf: 'center',
            alignItems: 'center',
            borderBottomWidth: wp(0.2),
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {firsthalf.average.hometeam_for}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'justify',
                color: 'black',
              }}>
              Average For
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {firsthalf.average.awayteam_for}
            </Text>
          </View>
        </ListItem>
        <ListItem
          containerStyle={{
            justifyContent: 'space-between',
            alignSelf: 'center',
            alignItems: 'center',
            borderBottomWidth: wp(0.2),
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {firsthalf.average.hometeam_against}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'justify',
                color: 'black',
              }}>
              Average Against
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {firsthalf.average.awayteam_against}
            </Text>
          </View>
        </ListItem>

        <ListItem
          containerStyle={{
            justifyContent: 'space-between',
            alignSelf: 'center',
            alignItems: 'center',
            borderBottomWidth: wp(0.2),
          }}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'justify',
                fontWeight: 'bold',
                color: 'black',
              }}>
              Total Overs
            </Text>
          </View>
        </ListItem>

        {firsthalf.total.map((item, index) => (
          <ListItem
            key={index}
            containerStyle={{
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              borderBottomWidth: wp(0.2),
              borderTopWidth: item?.isTitle === 1 ? wp(0.2) : 0,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 20,
              }}>
              <View>
                <Text
                  style={{
                    color: parseInt(item.hometeamcol2) >= 80 ? 'red' : 'black',
                    fontWeight: 'bold',
                  }}>
                  {item.hometeamcol1}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: parseInt(item.hometeamcol2) >= 80 ? 'red' : 'black',
                    fontWeight: 'bold',
                  }}>
                  {item.hometeamcol2}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: 200,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontWeight: item?.isTitle === 1 ? 'bold' : 'normal',
                  color: 'black',
                }}>
                {item.label}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 20,
              }}>
              <View>
                <Text
                  style={{
                    color: parseInt(item.awayteamcol2) >= 80 ? 'red' : 'black',
                    fontWeight: 'bold',
                  }}>
                  {item.awayteamcol1}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: parseInt(item.awayteamcol2) >= 80 ? 'red' : 'black',
                    fontWeight: 'bold',
                  }}>
                  {item.awayteamcol2}
                </Text>
              </View>
            </View>
          </ListItem>
        ))}

        <ListItem
          containerStyle={{
            justifyContent: 'space-between',
            alignSelf: 'center',
            alignItems: 'center',
            borderBottomWidth: wp(0.2),
          }}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'justify',
                fontWeight: 'bold',
                color: 'black',
              }}>
              Team Overs
            </Text>
          </View>
        </ListItem>

        {firsthalf.team.map((item, index) => (
          <ListItem
            key={index}
            containerStyle={{
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              borderBottomWidth: wp(0.2),
              borderTopWidth: item?.isTitle === 1 ? wp(0.2) : 0,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 20,
              }}>
              <View>
                <Text
                  style={{
                    color: parseInt(item.hometeamcol2) >= 80 ? 'red' : 'black',
                    fontWeight: 'bold',
                  }}>
                  {item.hometeamcol1}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: parseInt(item.hometeamcol2) >= 80 ? 'red' : 'black',
                    fontWeight: 'bold',
                  }}>
                  {item.hometeamcol2}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: 200,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontWeight: item?.isTitle === 1 ? 'bold' : 'normal',
                  color: 'black',
                }}>
                {item.label}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 20,
              }}>
              <View>
                <Text
                  style={{
                    color: parseInt(item.awayteamcol2) >= 80 ? 'red' : 'black',
                    fontWeight: 'bold',
                  }}>
                  {item.awayteamcol1}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: parseInt(item.awayteamcol2) >= 80 ? 'red' : 'black',
                    fontWeight: 'bold',
                  }}>
                  {item.awayteamcol2}
                </Text>
              </View>
            </View>
          </ListItem>
        ))}
      </View>
    );
  }

  function AllCompititionStats({fulltime, basic}) {
    return (
      <>
        <Text
          style={{
            marginHorizontal: wp(2),
            fontSize: Size(2),
            fontWeight: 'bold',
          }}>
          All Compitition Stats
        </Text>
        <View style={styles.lastTenContainer}>
          <Text style={styles.title}>All Compitition Stats</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: wp(2),
              paddingHorizontal: wp(2),
            }}>
            <View>
              <Image
                source={{uri: basic.m_hometeam_logo}}
                resizeMode="contain"
                style={styles.teamLogo}
              />
              <Text
                style={{
                  ...styles.scoreText,
                  marginVertical: wp(0),
                  marginHorizontal: wp(2),
                  fontWeight: 'bold',
                }}>
                {basic.m_hometeam_name}
              </Text>
            </View>
            <View>
              <Image
                source={{uri: basic.m_awayteam_logo}}
                resizeMode="contain"
                style={styles.teamLogo}
              />
              <Text
                style={{
                  ...styles.scoreText,
                  marginVertical: wp(0),
                  marginHorizontal: wp(2),
                  fontWeight: 'bold',
                }}>
                {basic.m_awayteam_name}
              </Text>
            </View>
          </View>
          <ListItem
            containerStyle={{
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              borderBottomWidth: wp(0.2),
            }}>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Averages
              </Text>
            </View>
          </ListItem>
          <ListItem
            containerStyle={{
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              borderBottomWidth: wp(0.2),
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {fulltime.average.hometeam_total}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  color: 'black',
                }}>
                Average Total
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {fulltime.average.awayteam_total}
              </Text>
            </View>
          </ListItem>
          <ListItem
            containerStyle={{
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              borderBottomWidth: wp(0.2),
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {fulltime.average.hometeam_for}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  color: 'black',
                }}>
                Average For
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {fulltime.average.awayteam_for}
              </Text>
            </View>
          </ListItem>
          <ListItem
            containerStyle={{
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              borderBottomWidth: wp(0.2),
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {fulltime.average.hometeam_against}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  color: 'black',
                }}>
                Average Against
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {fulltime.average.awayteam_against}
              </Text>
            </View>
          </ListItem>

          <ListItem
            containerStyle={{
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              borderBottomWidth: wp(0.2),
            }}>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Total Overs
              </Text>
            </View>
          </ListItem>

          {fulltime.total.map((item, index) => (
            <ListItem
              key={index}
              containerStyle={{
                justifyContent: 'space-between',
                alignSelf: 'center',
                alignItems: 'center',
                borderBottomWidth: wp(0.2),
                borderTopWidth: item?.isTitle === 1 ? wp(0.2) : 0,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 20,
                }}>
                <View>
                  <Text
                    style={{
                      color:
                        parseInt(item.hometeamcol2) >= 80 ? 'red' : 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.hometeamcol1}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color:
                        parseInt(item.hometeamcol2) >= 80 ? 'red' : 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.hometeamcol2}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexGrow: 0,
                  flexShrink: 1,
                  flexBasis: 200,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontWeight: item?.isTitle === 1 ? 'bold' : 'normal',
                    color: 'black',
                  }}>
                  {item.label}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 20,
                }}>
                <View>
                  <Text
                    style={{
                      color:
                        parseInt(item.awayteamcol2) >= 80 ? 'red' : 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.awayteamcol1}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color:
                        parseInt(item.awayteamcol2) >= 80 ? 'red' : 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.awayteamcol2}
                  </Text>
                </View>
              </View>
            </ListItem>
          ))}

          <ListItem
            containerStyle={{
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
              borderBottomWidth: wp(0.2),
            }}>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Team Overs
              </Text>
            </View>
          </ListItem>

          {fulltime.team.map((item, index) => (
            <ListItem
              key={index}
              containerStyle={{
                justifyContent: 'space-between',
                alignSelf: 'center',
                alignItems: 'center',
                borderBottomWidth: wp(0.2),
                borderTopWidth: item?.isTitle === 1 ? wp(0.2) : 0,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 20,
                }}>
                <View>
                  <Text
                    style={{
                      color:
                        parseInt(item.hometeamcol2) >= 80 ? 'red' : 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.hometeamcol1}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color:
                        parseInt(item.hometeamcol2) >= 80 ? 'red' : 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.hometeamcol2}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexGrow: 0,
                  flexShrink: 1,
                  flexBasis: 200,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontWeight: item?.isTitle === 1 ? 'bold' : 'normal',
                    color: 'black',
                  }}>
                  {item.label}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 20,
                }}>
                <View>
                  <Text
                    style={{
                      color:
                        parseInt(item.awayteamcol2) >= 80 ? 'red' : 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.awayteamcol1}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color:
                        parseInt(item.awayteamcol2) >= 80 ? 'red' : 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.awayteamcol2}
                  </Text>
                </View>
              </View>
            </ListItem>
          ))}
        </View>
      </>
    );
  }

  function Details({interval, basic}) {
    return (
      <>
        {interval && (
          <View style={[styles.lastTenContainer, {paddingHorizontal: wp(12)}]}>
            <Text style={styles.title}>{basic.m_league_name}</Text>
            <ListItem
              containerStyle={{
                justifyContent: 'space-between',
                alignSelf: 'center',
                alignItems: 'center',
                borderBottomWidth: wp(0.2),
              }}>
              <View
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Interval
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Scored
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Conceded
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Total
                </Text>
              </View>
            </ListItem>
            {interval &&
              interval.map((item, index) => (
                <ListItem
                  key={index}
                  containerStyle={{
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderBottomWidth: wp(0.2),
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'justify',
                        fontWeight: item?.isTitle === 1 ? 'bold' : 'normal',
                        color: 'black',
                      }}>
                      {item.label}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'justify',
                        fontWeight: item?.isTitle === 1 ? 'bold' : 'normal',
                        color: 'black',
                      }}>
                      {item.scored}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'justify',
                        fontWeight: item?.isTitle === 1 ? 'bold' : 'normal',
                        color: 'black',
                      }}>
                      {item.conceded}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'justify',
                        fontWeight: item?.isTitle === 1 ? 'bold' : 'normal',
                        color: 'black',
                      }}>
                      {item.total}
                    </Text>
                  </View>
                </ListItem>
              ))}
          </View>
        )}
      </>
    );
  }

  return (
    <ScrollView>
      <View style={{marginBottom: 50}}>
        <View style={styles.headerView}>
          <HeaderStats matchId={matchId} />
        </View>

        <LastTenMatches firsthalf={firsthalf} basic={basic} />

        <AllCompititionStats fulltime={fulltime} basic={basic} />

        {hometeaminterval && awayteaminterval && (
          <View>
            <Text
              style={{
                marginHorizontal: wp(2),
                fontSize: Size(2),
                fontWeight: 'bold',
              }}>
              Details
            </Text>

            <SwiperFlatList
              paginationActiveColor={Colors.primaryGradient}
              index={0}
              contentContainerStyle={{paddingVertical: wp(5)}}
              showPagination
              data={interval}
              renderItem={({item}) => <Details interval={item} basic={basic} />}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lastTenContainer: {
    // height: hp(65),
    // paddingHorizontal: wp(5),
    marginHorizontal: wp(2),
    marginVertical: wp(3),
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingVertical: wp(2),
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  shadow: {
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
  title: {
    fontSize: Size(1.8),
    alignSelf: 'center',
    fontWeight: 'bold',
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
});
