import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import {Colors} from '../../../../assets/color';
import HomeHeader from '../../../../components/homeHeader';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import {Size, hp, wp} from '../../../../assets/dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Images} from '../../../../assets/images';
import MatchStreaks from './matchStreaks';
import {useNavigation} from '@react-navigation/native';
import LiveStats from '../fixtureDetail/LiveStats';
import HeaderStats from './headerStats';
import MatchCorners from './matchCorners';
import MatchLive from './matchLive';
import MatchMatch from './matchMatch';
import MatchStandings from './matchStandings';
import MatchHeadToHead from './matchHeadToHead';
import MatchLastGames from './matchLastGames';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import MatchSquads from './matchSquad';
import Loader from '../../../../components/loader';

const MatchStats = () => {
  const [activeOption, setActiveOption] = useState('live');
  const navigation = useNavigation();

  const route = useRoute();
  const fixtureId = route.params.value;

  const options = [
    {id: 'live', name: 'Live'},
    {id: 'match', name: 'Match'},
    {id: 'head_to_head', name: 'Head To Head'},
    {id: 'last_games', name: 'Last Games'},
    {id: 'streaks', name: 'Streaks'},
    {id: 'squads', name: 'Squad'},
    {id: 'standings', name: 'Standings'},
    {id: 'goals', name: 'Goals'},
    {id: 'cards', name: 'Cards'},
    {id: 'corners', name: 'Corners'},
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={
        activeOption === item?.id
          ? styles.selectedOptionButton
          : styles.optionButton
      }
      onPress={() => handleOptionPress(item.id)}>
      <Text
        style={
          activeOption === item?.id
            ? styles.selectedOptionText
            : styles.optionText
        }>
        {item.name}
      </Text>
      {activeOption === item?.id && (
        <View style={{height: wp(0.5), width: '100%'}}>
          <AnimatedLinearGradient
            customColors={Colors.primaryGradient}
            speed={6000}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  const handleOptionPress = option => {
    setActiveOption(option);
  };

  const [championshipId, setChampionshipId] = useState();
  const [teamAId, setTeamAId] = useState();
  const [teamBId, setTeamBId] = useState();
  const [matchId, setMatchId] = useState();

  const [matchData, setMatchData] = useState({});

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchMatchData();
  }, []);

  const fetchMatchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://soccer-football-info.p.rapidapi.com/matches/view/full/?i=${fixtureId}`,
        {
          headers: {
            'X-RapidAPI-Key':
              '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
          },
        },
      );

      setMatchData(response.data);

      setChampionshipId(response.data.result[0].championship.id);
      setMatchId(response.data.result[0].id);
      setTeamAId(response.data.result[0].teamA.id);
      setTeamBId(response.data.result[0].teamB.id);
    } catch (error) {
      console.error('Error fetching match data in MatchLive: ', error);
    } finally {
      setLoading(false);
    }
  };

  const [goalsData, setGoalsData] = useState();
  const [cardsData, setCardsData] = useState();
  const [cornersData, setCornersData] = useState();

  const [streaksDataHomeTeam, setStreaksDataHomeTeam] = useState();
  const [streaksDataAwayTeam, setStreaksDataAwayTeam] = useState();

  useEffect(() => {
    if (matchId && teamAId && teamBId) {
      fetchGoalsData();
      fetchCardsData();
      fetchCornersData();
      fetchStreaksData();
    }
  }, [matchId, teamAId, teamBId]);

  const fetchGoalsData = async () => {
    try {
      const response = await axios.get(
        `https://api.bring-the-boom.com/api/native/matchdetailsgoals?matchid=${matchId}&team1=${teamAId}&team2=${teamBId}`,
        {
          headers: {
            'X-RapidAPI-Key':
              '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
          },
        },
      );
      setGoalsData(response.data);
    } catch (error) {
      console.error('Error fetching match data in Goals:', error);
    }
  };
  const fetchCardsData = async () => {
    try {
      const response = await axios.get(
        `https://api.bring-the-boom.com/api/native/matchdetailcards?matchid=${matchId}&team1=${teamAId}&team2=${teamBId}`,
        {
          headers: {
            'X-RapidAPI-Key':
              '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
          },
        },
      );

      setCardsData(response.data);
    } catch (error) {
      console.error('Error fetching match data in Cards:', error);
    }
  };
  const fetchCornersData = async () => {
    try {
      const response = await axios.get(
        `https://api.bring-the-boom.com/api/native/matchdetailcorners?matchid=${matchId}&team1=${teamAId}&team2=${teamBId}`,
        {
          headers: {
            'X-RapidAPI-Key':
              '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
          },
        },
      );

      setCornersData(response.data);
    } catch (error) {
      console.error('Error fetching match data in Corners:', error);
    }
  };

  const fetchStreaksData = async () => {
    try {
      const response = await axios.get(
        `https://api.bring-the-boom.com/api/native/streaks?matchid=${matchId}&team1=${teamAId}&team2=${teamBId}&games=10`,
        {
          headers: {
            'X-RapidAPI-Key':
              '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
          },
        },
      );

      setStreaksDataHomeTeam(response.data.hometeam);
      setStreaksDataAwayTeam(response.data.awayteam);
    } catch (error) {
      console.error('Error fetching match data in Streaks:', error);
    }
  };

  let displayData = null;
  if (activeOption === 'live') {
    displayData = <MatchLive matchData={matchData} />;
  } else if (activeOption === 'match') {
    displayData = (
      <MatchMatch matchId={matchId} teamAId={teamAId} teamBId={teamBId} />
    );
  } else if (activeOption === 'head_to_head') {
    displayData = (
      <MatchHeadToHead matchId={matchId} teamAId={teamAId} teamBId={teamBId} />
    );
  } else if (activeOption === 'last_games') {
    displayData = <MatchLastGames matchId={matchId} teamAId={teamAId} />;
  } else if (activeOption === 'goals') {
    displayData = <MatchCorners matchId={matchId} matchData={goalsData} />;
  } else if (activeOption === 'cards') {
    displayData = <MatchCorners matchId={matchId} matchData={cardsData} />;
  } else if (activeOption === 'corners') {
    displayData = <MatchCorners matchId={matchId} matchData={cornersData} />;
  } else if (activeOption === 'squads') {
    displayData = <MatchSquads matchId={matchId} />;
  } else if (activeOption === 'standings') {
    displayData = (
      <MatchStandings
        matchId={matchId}
        fixtureId={fixtureId}
        championshipId={championshipId}
      />
    );
  } else if (activeOption === 'streaks') {
    displayData = (
      <View style={{marginBottom: 70}}>
        <ScrollView>
          <View style={{backgroundColor: Colors.white, ...styles.shadow}}>
            <HeaderStats matchId={matchId} />
          </View>
          <MatchStreaks streaksData={streaksDataHomeTeam} />
          <MatchStreaks streaksData={streaksDataAwayTeam} />
        </ScrollView>
      </View>
    );
  }
  // Add similar conditions for the other options

  return (
    <SafeAreaView style={{flex: 1, overflow: 'hidden'}}>
      <AnimatedLinearGradient
        customColors={Colors.primaryGradient}
        speed={6000}
      />
      <HomeHeader
        title="Hi John Doe!"
        // onBellPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: wp(5),
              paddingHorizontal: wp(5),
            }}>
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
            <Text style={styles.welcomeText}>Match Stats</Text>
            <Ionicons color={Colors.white} name="pencil" size={Size(3)} />
          </View>

          {loading ? (
            <Loader />
          ) : (
            <View>
              <View>
                <FlatList
                  data={options}
                  renderItem={renderItem}
                  // keyExtractor={item => item.id}
                  horizontal
                  contentContainerStyle={{
                    ...styles.flatlistContainerStyle,
                    ...styles.shadow,
                    marginBottom: hp(4),
                  }}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              <View style={{marginBottom: 300}}>{displayData}</View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: wp(5),
  },

  optionButton: {
    paddingHorizontal: 20,
    marginHorizontal: wp(1),
    // paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(4),
  },
  selectedOptionButton: {
    paddingHorizontal: 20,
    marginHorizontal: wp(1),
    // paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(4),
  },
  optionText: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedOptionText: {
    fontSize: 16,
    color: Colors.black,
  },

  flatlistContainerStyle: {
    height: hp(5),
    backgroundColor: Colors.white,
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
  welcomeText: {
    fontSize: Size(2.4),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default MatchStats;
