import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Size, hp, wp} from '../../assets/dimensions';
import {Colors} from '../../assets/color';
import {useNavigation} from '@react-navigation/native';

const LiveGridItem = ({
  leagueName,
  leagueLogo,
  matches,
  specificDateSelected,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const navigation = useNavigation();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const onPress = value => {
    navigation.navigate('MatchStats', {value});
  };

  return (
    <View style={styles.liveGridContainer}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleExpand}>
        <View style={styles.dropdownTitleContainer}>
          <Ionicons
            onPress={() => setIsFav(!isFav)}
            name="star-outline"
            size={20}
            color={isFav ? 'gold' : 'black'}
          />
          <Image source={{uri: leagueLogo}} style={styles.flagImage} />
          <Text style={styles.dropdownTitleText}>{leagueName}</Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-down-outline' : 'chevron-forward-outline'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {expanded && (
        <ScrollView nestedScrollEnabled={true}>
          {matches.map((match, index) => (
            <View
              key={index}
              style={[styles.dropdownItem, {justifyContent: 'space-between'}]}>
              <View style={[styles.dropdownTitleContainer, {flexShrink: 1}]}>
                <Ionicons
                  onPress={() => setIsFav(!isFav)}
                  name="star-outline"
                  size={20}
                  color={isFav ? 'gold' : 'black'}
                />

                <View>
                  <Text style={styles.dropdownTitleText}>
                    {specificDateSelected === true
                      ? new Date(match.m_fixture_date).toLocaleTimeString(
                          'en-US',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false, // Set hour12 to false for 24-hour format
                          },
                        )
                      : match.fixture.starttime}
                  </Text>
                </View>

                <View style={{flexShrink: 1}}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexShrink: 1,
                      // gap: 10,
                    }}>
                    <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
                      <Text
                        style={[
                          styles.dropdownTitleText,
                          {marginLeft: wp(5), marginVertical: wp(1)},
                        ]}>
                        {specificDateSelected === true
                          ? match.m_hometeam_name
                          : match.hometeam.name}
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={[
                          styles.dropdownTitleText,
                          {
                            color: 'black',
                            fontWeight: 'bold',
                            marginVertical: wp(1),
                            marginHorizontal: wp(2),
                          },
                        ]}>
                        {specificDateSelected === true
                          ? match.m_hometeam_score
                          : match.score.home}
                      </Text>
                    </View>

                    <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 100}}>
                      <Text
                        style={[
                          styles.dropdownTitleText,
                          {
                            color: 'green',
                            fontWeight: 'bold',
                            marginVertical: wp(1),
                            alignSelf: 'center',
                          },
                        ]}>
                        {specificDateSelected === true
                          ? match.m_fixture_timer
                          : match.fixture.livetime}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexShrink: 1,
                      // gap: 10,
                    }}>
                    <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
                      <Text
                        style={[
                          styles.dropdownTitleText,
                          {marginLeft: wp(5), marginVertical: wp(1)},
                        ]}>
                        {specificDateSelected === true
                          ? match.m_awayteam_name
                          : match.awayteam.name}
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={[
                          styles.dropdownTitleText,
                          {
                            color: 'black',
                            fontWeight: 'bold',
                            marginVertical: wp(1),
                            marginHorizontal: wp(2),
                          },
                        ]}>
                        {specificDateSelected === true
                          ? match.m_awayteam_score
                          : match.score.away}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexGrow: 0,
                        flexShrink: 1,
                        flexBasis:
                          match.m_fixture_status === 'POSTPONE' ? 150 : 100,
                        justifyContent: 'flex-end',
                      }}>
                      {specificDateSelected === true ? (
                        <TouchableOpacity
                          onPress={() => onPress(match.m_fixture_id)}>
                          <Text style={styles.liveText}>
                            {match.m_fixture_status === 'NOT_STARTED'
                              ? 'NS'
                              : match.m_fixture_status}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => onPress(match.fixture.id)}>
                          <Text style={styles.liveText}>
                            {match.fixture.status === 'NOT_STARTED'
                              ? 'NS'
                              : match.fixture.status}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const LiveGrid = ({
  liveData,
  receivedMatchData,
  specificDateSelected,
  skip,
  take,
  onSkipChange,
  onTakeChange,
}) => {
  let organizedData = [];

  if (liveData !== undefined && liveData !== null) {
    organizedData = Object.entries(
      liveData.reduce((acc, match) => {
        const leagueName = match.leaguename;

        if (!acc.hasOwnProperty(leagueName)) {
          acc[leagueName] = [];
        }

        acc[leagueName].push(match);

        return acc;
      }, {}),
    );
  }

  let organizedSpecificDateMatchData = [];

  if (receivedMatchData !== undefined && receivedMatchData !== null) {
    organizedSpecificDateMatchData = Object.entries(
      receivedMatchData.reduce((acc, match) => {
        const leagueName = match.m_league_name;

        if (!acc.hasOwnProperty(leagueName)) {
          acc[leagueName] = [];
        }

        acc[leagueName].push(match);

        return acc;
      }, {}),
    );
  }

  const loadMoreData = () => {
    onSkipChange(skip + take);
  };

  const loadPreviousData = () => {
    if (skip >= take) {
      onSkipChange(skip - take);
    }
  };

  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.scrollViewContent}>
        {specificDateSelected === true ? (
          <View>
            {organizedSpecificDateMatchData.map(
              ([leagueName, matches], index) => (
                <LiveGridItem
                  key={index}
                  style={[
                    styles.dropdownButton,
                    {justifyContent: 'space-between'},
                  ]}
                  leagueName={leagueName}
                  leagueLogo={matches.m_league_logo}
                  matches={matches}
                  specificDateSelected={specificDateSelected}
                />
              ),
            )}
          </View>
        ) : (
          <View>
            {organizedData.map(([leagueName, matches], index) => (
              <LiveGridItem
                key={index}
                style={[
                  styles.dropdownButton,
                  {justifyContent: 'space-between'},
                ]}
                leagueName={leagueName}
                leagueLogo={matches[0].league.logo}
                matches={matches}
                specificDateSelected={specificDateSelected}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <View>
        {receivedMatchData &&
          receivedMatchData.length !== 0 &&
          specificDateSelected === true && (
            <View style={{marginBottom: 100}}>
              <View style={{...styles.paginationContainer, ...styles.shadow}}>
                {skip >= take && (
                  <TouchableOpacity
                    onPress={loadPreviousData}
                    style={styles.paginationButton}>
                    <Text style={styles.paginationButtonText}>
                      Load Previous
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={loadMoreData}
                  style={styles.paginationButton}>
                  <Text style={styles.paginationButtonText}>Load More</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  liveGridContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButton: {
    width: wp(100),
    height: 40,
    backgroundColor: Colors.extralightgray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dropdownTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownTitleText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.black,
  },
  dropdownItem: {
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    padding: 10,
    width: wp(100),
    flexDirection: 'row',
  },
  liveText: {
    padding: wp(1),
    backgroundColor: 'red',
    color: Colors.white,
    fontSize: Size(1.6),
    borderRadius: 15,
    paddingHorizontal: wp(5),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flagImage: {
    width: 20,
    height: 20,
    margin: 2,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
  },
  paginationButton: {
    backgroundColor: Colors.primary,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: 5,
  },
  paginationButtonText: {
    color: Colors.black,
    fontWeight: 'bold',
  },
});

export default LiveGrid;
