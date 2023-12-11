import {
  Platform,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Size, wp, hp} from '../../../../../assets/dimensions';
import {Colors} from '../../../../../assets/color';
import moment from 'moment';
import NoRecordFound from '../../../../../components/noRecordFound';

export default function Corners({cardsData, onSkipTakeChange, is_filtered}) {
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
    cardsData,
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
        {cardsData.map((card, index) => (
          <View key={index} style={styles.cardview}>
            <View style={styles.rowStyle}>
              <View style={{flex: 1, flexShrink: 1}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {card.ss_hometeam_name} VS {card.ss_awayteam_name}
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: wp(2),
              }}>
              <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(card.ss_home_cards_for_fh),
                  ]}>
                  {card.ss_home_cards_for_fh}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(card.ss_home_cards_against_f),
                  ]}>
                  {card.ss_home_cards_against_fh}
                </Text>
              </View>

              <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(card.ss_away_cards_for_fh),
                  ]}>
                  {card.ss_away_cards_for_fh}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(card.ss_away_cards_against_fh),
                  ]}>
                  {card.ss_away_cards_against_fh}
                </Text>
              </View>

              <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(card.ss_home_cards_for_ft),
                  ]}>
                  {card.ss_home_cards_for_ft}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(card.ss_home_cards_against_ft),
                  ]}>
                  {card.ss_home_cards_against_ft}
                </Text>
              </View>

              {/* <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    {backgroundColor: Colors.cardGreen},
                  ]}>
                  {card.ss_cards_over95}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    {backgroundColor: Colors.cardGreen},
                  ]}>
                  {card.ss_cards_over105}
                </Text>
              </View> */}

              <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(card.ss_away_cards_for_ft),
                  ]}>
                  {card.ss_away_cards_for_ft}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(card.ss_away_cards_against_ft),
                  ]}>
                  {card.ss_away_cards_against_ft}
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
                  {card.ss_league_name}
                </Text>
              </View>
              <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
                <Text style={[styles.country, {textAlign: 'center'}]}>
                  {formatDate(card.ss_fixture_date)}
                </Text>
              </View>
              <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
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
                  In Play
                </Text>
              </View>
            </View>
          </View>
        ))}
        {cardsData && cardsData.length !== 0 && !is_filtered ? (
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
                <Text style={styles.paginationButtonText}>Load Mosre</Text>
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
          gap: 10,
          marginHorizontal: wp(5),
          marginBottom: 6,
        }}>
        <View style={{flexShrink: 1}}>
          <View>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              FH Home
            </Text>
          </View>
          <View style={styles.cardInfoLables}>
            <View style={{flexShrink: 1}}>
              <Text>Avg For</Text>
            </View>
            <View style={{flexShrink: 1}}>
              <Text>Avg Against</Text>
            </View>
          </View>
        </View>

        <View style={{flexShrink: 1}}>
          <View>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              FH Away
            </Text>
          </View>
          <View style={styles.cardInfoLables}>
            <View style={{flexShrink: 1}}>
              <Text>Avg For</Text>
            </View>
            <View style={{flexShrink: 1}}>
              <Text>Avg Against</Text>
            </View>
          </View>
        </View>

        <View style={{flexShrink: 1}}>
          <View>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              FT Home
            </Text>
          </View>
          <View style={styles.cardInfoLables}>
            <View style={{flexShrink: 1}}>
              <Text>Avg For</Text>
            </View>
            <View style={{flexShrink: 1}}>
              <Text>Avg Against</Text>
            </View>
          </View>
        </View>

        <View style={{flexShrink: 1}}>
          <View>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              FT Away
            </Text>
          </View>
          <View style={styles.cardInfoLables}>
            <View style={{flexShrink: 1}}>
              <Text>Avg For</Text>
            </View>
            <View style={{flexShrink: 1}}>
              <Text>Avg Against</Text>
            </View>
          </View>
        </View>
      </View>

      <InnerCard
        cardsData={cardsData}
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
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Size(1.8),
  },
  textOfHeaderAboveGoalCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  cardInfoLables: {
    marginLeft: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: 6,
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
