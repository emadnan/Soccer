import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Size, hp, wp} from '../../../../../assets/dimensions';
import {Colors} from '../../../../../assets/color';
import moment from 'moment';
import NoRecordFound from '../../../../../components/noRecordFound';

export default function Goals({goalsData, onSkipTakeChange, is_filtered}) {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const loadPreviousData = () => {
    // Update the value of skip to load previous data
    const newSkip = skip - take;
    setSkip(newSkip);
    onSkipTakeChange(newSkip, take); // Notify the parent component
  };

  const loadMoreData = () => {
    // Update the value of skip to load more data
    const newSkip = skip + take;
    setSkip(newSkip);
    onSkipTakeChange(newSkip, take); // Notify the parent component
  };

  const InnerCard = ({
    goalsData,
    skip,
    take,
    loadMoreData,
    loadPreviousData,
  }) => {
    function formatDate(dateString) {
      // Parse the input date string
      const parsedDate = moment(dateString, 'YYYY-MM-DD HH:mm:ss');

      // Format the date in the desired format
      return parsedDate.format('DD MMMM YYYY');
    }

    function getBackgroundColor(value) {
      if (value >= 75) {
        return {backgroundColor: Colors.cardGreen};
      } else if (value <= 25) {
        return {backgroundColor: Colors.cardRed};
      } else {
        return {backgroundColor: Colors.cardYellow};
      }
    }

    return (
      <View>
        {goalsData.map((goal, index) => (
          <View key={index} style={styles.cardview}>
            <View style={styles.rowStyle}>
              <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {goal.ss_hometeam_name} VS {goal.ss_awayteam_name}
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: wp(2),
                gap: 15,
              }}>
              <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(goal.ss_goals_over15),
                  ]}>
                  {goal.ss_goals_over15}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(goal.ss_goals_over25),
                  ]}>
                  {goal.ss_goals_over25}
                </Text>
              </View>

              <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(goal.ss_goals_over35),
                  ]}>
                  {goal.ss_goals_over35}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(goal.ss_goals_overbtts),
                  ]}>
                  {goal.ss_goals_overbtts}
                </Text>
              </View>

              <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(goal.ss_goals_over05fhg),
                  ]}>
                  {goal.ss_goals_over05fhg}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(goal.ss_goals_over05shg),
                  ]}>
                  {goal.ss_goals_over05shg}
                </Text>
              </View>

              <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(goal.ss_goals_minute37),
                  ]}>
                  {goal.ss_goals_minute37}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(goal.ss_goals_minute85),
                  ]}>
                  {goal.ss_goals_minute85}
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
                <Text style={[styles.country, {fontWeight: 'bold'}]}>
                  {goal.ss_league_name}
                </Text>
              </View>
              <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
                <Text style={[styles.country, {textAlign: 'center'}]}>
                  {formatDate(goal.ss_fixture_date)}
                </Text>
              </View>
              <Text
                style={[
                  styles.country,
                  {
                    borderWidth: 1,
                    borderColor: Colors.black,
                    borderRadius: 10,
                    padding: 3,
                  },
                ]}>
                {goal.ss_fixture_status}
              </Text>
            </View>
          </View>
        ))}
        {goalsData && goalsData.length !== 0 && !is_filtered ? (
          <View>
            <View style={{...styles.paginationContainer, ...styles.shadow}}>
              {skip >= take && (
                <TouchableOpacity
                  onPress={loadPreviousData}
                  style={styles.paginationButton}>
                  <Text style={styles.paginationButtonText}>Load Previous</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={loadMoreData}
                style={styles.paginationButton}>
                <Text style={styles.paginationButtonText}>Load More</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <NoRecordFound />
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: wp(5),
          marginBottom: 6,
        }}>
        <View
          style={[
            styles.headingOfHeaderAboveGoalCard,
            // {marginLeft: 1, flexShrink: 1},
          ]}>
          <View>
            <Text>O1.5%</Text>
          </View>
          <View>
            <Text>O2.5%</Text>
          </View>
          <View>
            <Text>O3.5%</Text>
          </View>
          <View>
            <Text>BTTS%</Text>
          </View>
          <View style={{marginLeft: 1, flexShrink: 1}}>
            <Text>O0.5FHG%</Text>
          </View>
          <View style={{marginLeft: 1, flexShrink: 1}}>
            <Text>O0.5SHG%</Text>
          </View>
          <View style={{marginLeft: 1, flexShrink: 1}}>
            <Text>37+mins</Text>
          </View>
          <View style={{marginLeft: 1, flexShrink: 1}}>
            <Text>85+mins</Text>
          </View>
        </View>
      </View>

      <InnerCard
        goalsData={goalsData}
        loadMoreData={loadMoreData}
        loadPreviousData={loadPreviousData}
        skip={skip}
        take={take}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardview: {
    marginBottom: 10,
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

  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    marginVertical: wp(1),
    alignItems: 'center',
  },

  country: {
    alignSelf: 'center',
    color: Colors.black,
    margin: wp(2),
  },

  scoreCard: {
    fontWeight: 'bold',
    color: Colors.white,
    height: wp(5),
    width: wp(7),
    borderRadius: wp(0.8),
    textAlign: 'center',
    alignItems: 'center',
  },
  headingOfHeaderAboveGoalCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
  },
  textOfHeaderAboveGoalCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
  },
  paginationButton: {
    marginTop: 4,
    backgroundColor: Colors.white,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: 5,
  },
  paginationButtonText: {
    color: Colors.black,
    fontWeight: 'bold',
    // backgroundColor: Colors.white,
    // margin: 1,
    // padding: 4,
  },
  emptyView: {
    height: hp(50),
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
