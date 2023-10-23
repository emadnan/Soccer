import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderStats from '../headerStats';
import {Size, wp} from '../../../../../assets/dimensions';
import {Colors} from '../../../../../assets/color';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import axios from 'axios';
import Loader from '../../../../../components/loader';

export default function MatchMatch({matchId, teamAId, teamBId}) {
  const [goalsData, setGoalsData] = useState({});
  const [cardsData, setCardsData] = useState({});
  const [cornersData, setCornersData] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMatchData();
    // const interval = setInterval(fetchMatchData, 10000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  const fetchMatchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.bring-the-boom.com/api/native/teamsummary?matchid=${matchId}&team1=${teamAId}&team2=${teamBId}`,
        {
          headers: {
            'X-RapidAPI-Key':
              '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
          },
        },
      );

      const goals_Data = {
        firstHalfGoals: {
          title: 'First Half',
          hometeam: {
            for: response.data.hometeam.fh_goal_for,
            against: response.data.hometeam.fh_goal_against,
            total: response.data.hometeam.fh_goal_total,
          },
          awayteam: {
            for: response.data.awayteam.fh_goal_for,
            against: response.data.awayteam.fh_goal_against,
            total: response.data.awayteam.fh_goal_total,
          },
        },
        secondHalfGoals: {
          title: 'Second Half',
          hometeam: {
            for: response.data.hometeam.sh_goal_for,
            against: response.data.hometeam.sh_goal_against,
            total: response.data.hometeam.sh_goal_total,
          },
          awayteam: {
            for: response.data.awayteam.sh_goal_for,
            against: response.data.awayteam.sh_goal_against,
            total: response.data.awayteam.sh_goal_total,
          },
        },
        fullTimeGoals: {
          title: 'Full Time',
          hometeam: {
            for: response.data.hometeam.total_goal_for,
            against: response.data.hometeam.total_goal_against,
            total: response.data.hometeam.total_goal_total,
          },
          awayteam: {
            for: response.data.awayteam.total_goal_for,
            against: response.data.awayteam.total_goal_against,
            total: response.data.awayteam.total_goal_total,
          },
        },
      };

      const cards_Data = {
        firstHalfCards: {
          title: 'First Half',
          hometeam: {
            for: response.data.hometeam.fh_card_for,
            against: response.data.hometeam.fh_card_against,
            total: response.data.hometeam.fh_card_total,
          },
          awayteam: {
            for: response.data.awayteam.fh_card_for,
            against: response.data.awayteam.fh_card_against,
            total: response.data.awayteam.fh_card_total,
          },
        },
        secondHalfCards: {
          title: 'Second Half',
          hometeam: {
            for: response.data.hometeam.sh_card_for,
            against: response.data.hometeam.sh_card_against,
            total: response.data.hometeam.sh_card_total,
          },
          awayteam: {
            for: response.data.awayteam.sh_card_for,
            against: response.data.awayteam.sh_card_against,
            total: response.data.awayteam.sh_card_total,
          },
        },
        fullTimeCards: {
          title: 'Full Time',
          hometeam: {
            for: response.data.hometeam.total_card_for,
            against: response.data.hometeam.total_card_against,
            total: response.data.hometeam.total_card_total,
          },
          awayteam: {
            for: response.data.awayteam.total_card_for,
            against: response.data.awayteam.total_card_against,
            total: response.data.awayteam.total_card_total,
          },
        },
      };

      const corners_Data = {
        firstHalfCorners: {
          title: 'First Half',
          hometeam: {
            for: response.data.hometeam.fh_corner_for,
            against: response.data.hometeam.fh_corner_against,
            total: response.data.hometeam.fh_corner_total,
          },
          awayteam: {
            for: response.data.awayteam.fh_corner_for,
            against: response.data.awayteam.fh_corner_against,
            total: response.data.awayteam.fh_corner_total,
          },
        },
        secondHalfCorners: {
          title: 'Second Half',
          hometeam: {
            for: response.data.hometeam.sh_corner_for,
            against: response.data.hometeam.sh_corner_against,
            total: response.data.hometeam.sh_corner_total,
          },
          awayteam: {
            for: response.data.awayteam.sh_corner_for,
            against: response.data.awayteam.sh_corner_against,
            total: response.data.awayteam.sh_corner_total,
          },
        },
        fullTimeCorners: {
          title: 'Full Time',
          hometeam: {
            for: response.data.hometeam.total_corner_for,
            against: response.data.hometeam.total_corner_against,
            total: response.data.hometeam.total_corner_total,
          },
          awayteam: {
            for: response.data.awayteam.total_corner_for,
            against: response.data.awayteam.total_corner_against,
            total: response.data.awayteam.total_corner_total,
          },
        },
      };

      setGoalsData(goals_Data);
      setCardsData(cards_Data);
      setCornersData(corners_Data);
    } catch (error) {
      console.error('Error fetching match data in MatchMatch:', error);
    } finally {
      setLoading(false);
    }
  };

  const GoalCard = ({item}) => {
    if (!item || item.length === 0) {
      return <Loader />;
    }
    const {awayteam, hometeam, title} = item;

    return (
      <>
        {item && (
          <View style={styles.cardview}>
            <Text style={styles.titleStyle}>{title}</Text>
            <View style={styles.rowStyle}>
              <Text style={{color: 'transparent'}}>Avg For</Text>
              <Text style={styles.textContent}>Avg For</Text>
              <Text style={styles.textContent}>Avg Against</Text>
              <Text style={styles.textContent}>Avg Total</Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={{color: 'black'}}>Arsenal</Text>
              <Text style={styles.textContent}>{hometeam.for}</Text>
              <Text style={styles.textContent}>{hometeam.against}</Text>
              <Text style={styles.textContent}>{hometeam.total}</Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={{color: 'black'}}>Chelsea</Text>
              <Text style={styles.textContent}>{awayteam.for}</Text>
              <Text style={styles.textContent}>{awayteam.against}</Text>
              <Text style={styles.textContent}>{awayteam.total}</Text>
            </View>
          </View>
        )}
      </>
    );
  };

  const CornerCard = ({cornerdata}) => {
    if (!cornerdata || cornerdata.length === 0) {
      return <Loader />;
    }
    const {awayteam, hometeam, title} = cornerdata;
    return (
      <>
        {cornerdata && (
          <View style={styles.cardview}>
            <Text style={styles.titleStyle}>{title}</Text>
            <View style={styles.rowStyle}>
              <Text style={{color: 'transparent'}}>Avg For</Text>
              <Text style={styles.textContent}>Avg For</Text>
              <Text style={styles.textContent}>Avg Against</Text>
              <Text style={styles.textContent}>Avg Total</Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={{color: 'black'}}>Arsenal</Text>
              <Text style={styles.textContent}>{hometeam.for}</Text>
              <Text style={styles.textContent}>{hometeam.against}</Text>
              <Text style={styles.textContent}>{hometeam.total}</Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={{color: 'black'}}>Chelsea</Text>
              <Text style={styles.textContent}>{awayteam.for}</Text>
              <Text style={styles.textContent}>{awayteam.against}</Text>
              <Text style={styles.textContent}>{awayteam.total}</Text>
            </View>
          </View>
        )}
      </>
    );
  };

  const CardCard = ({carddata}) => {
    if (!carddata || carddata.length === 0) {
      return <Loader />;
    }
    const {awayteam, hometeam, title} = carddata;
    return (
      <>
        {carddata && (
          <View style={styles.cardview}>
            <Text style={styles.titleStyle}>{title}</Text>
            <View style={styles.rowStyle}>
              <Text style={{color: 'transparent'}}>Avg For</Text>
              <Text style={styles.textContent}>Avg For</Text>
              <Text style={styles.textContent}>Avg Against</Text>
              <Text style={styles.textContent}>Avg Total</Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={{color: 'black'}}>Arsenal</Text>
              <Text style={styles.textContent}>{hometeam.for}</Text>
              <Text style={styles.textContent}>{hometeam.against}</Text>
              <Text style={styles.textContent}>{hometeam.total}</Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={{color: 'black'}}>Chelsea</Text>
              <Text style={styles.textContent}>{awayteam.for}</Text>
              <Text style={styles.textContent}>{awayteam.against}</Text>
              <Text style={styles.textContent}>{awayteam.total}</Text>
            </View>
          </View>
        )}
      </>
    );
  };

  const {firstHalfGoals, secondHalfGoals, fullTimeGoals} = goalsData;
  const {firstHalfCards, secondHalfCards, fullTimeCards} = cardsData;
  const {firstHalfCorners, secondHalfCorners, fullTimeCorners} = cornersData;
  const goalsDataArr = [firstHalfGoals, secondHalfGoals, fullTimeGoals];
  const cardsDataArr = [firstHalfCards, secondHalfCards, fullTimeCards];
  const cornersDataArr = [firstHalfCorners, secondHalfCorners, fullTimeCorners];

  if (!cornersDataArr || !cardsDataArr || !goalsDataArr) {
    return <Loader />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView contentContainerStyle={{paddingBottom: wp(5)}}>
          <View style={styles.headerView}>
            <HeaderStats matchId={matchId} />
          </View>
          <Text style={styles.headerStyle}>Goals Summary (Last 10 Games)</Text>
          <SwiperFlatList
            showPagination
            paginationActiveColor={Colors.primaryGradient}
            index={0}
            contentContainerStyle={{paddingVertical: wp(5)}}
            data={goalsDataArr}
            renderItem={({item}) => <GoalCard item={item} />}
          />
          <Text style={styles.headerStyle}>
            Coorners Summary (Last 10 Games)
          </Text>
          <SwiperFlatList
            showPagination
            paginationActiveColor={Colors.primaryGradient}
            index={0}
            contentContainerStyle={{paddingVertical: wp(5)}}
            data={cornersDataArr}
            renderItem={({item}) => <CornerCard cornerdata={item} />}
          />
          <Text style={styles.headerStyle}>Cards Summary (Last 10 Games)</Text>
          <SwiperFlatList
            showPagination
            paginationActiveColor={Colors.primaryGradient}
            index={0}
            contentContainerStyle={{paddingVertical: wp(5)}}
            data={cardsDataArr}
            renderItem={({item}) => <CardCard carddata={item} />}
          />
        </ScrollView>
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
    fontSize: Size(2),
    paddingVertical: wp(2),
    borderBottomWidth: wp(0.1),
    width: '100%',
    color: Colors.black,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    marginVertical: wp(2),
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
    fontSize: Size(2),
    color: Colors.black,
    marginHorizontal: wp(5),
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
