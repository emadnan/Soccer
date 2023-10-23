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

export default function Corners({cornersData, onSkipTakeChange, is_filtered}) {
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
    cornersData,
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
        {cornersData.map((corner, index) => (
          <View key={index} style={styles.cardview}>
            <View style={styles.rowStyle}>
              <View style={{flex: 1, flexShrink: 1}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {corner.ss_hometeam_name} VS {corner.ss_awayteam_name}
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
                    getBackgroundColor(corner.ss_corners_over25),
                  ]}>
                  {corner.ss_corners_over25}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(corner.ss_corners_over35),
                  ]}>
                  {corner.ss_corners_over35}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(corner.ss_corners_over45),
                  ]}>
                  {corner.ss_corners_over45}
                </Text>
              </View>

              <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(corner.ss_corners_over85),
                  ]}>
                  {corner.ss_corners_over85}
                </Text>

                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(corner.ss_corners_over95),
                  ]}>
                  {corner.ss_corners_over95}
                </Text>

                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(corner.ss_corners_over105),
                  ]}>
                  {corner.ss_corners_over105}
                </Text>
              </View>

              <View style={styles.textOfHeaderAboveGoalCard}></View>

              <View style={styles.textOfHeaderAboveGoalCard}>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(corner.ss_corners_minute37),
                  ]}>
                  {corner.ss_corners_minute37}
                </Text>
                <Text
                  style={[
                    styles.scoreCard,
                    getBackgroundColor(corner.ss_corners_minute85),
                  ]}>
                  {corner.ss_corners_minute85}
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexShrink: 1,
                flexGrow: 100,
              }}>
              <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
                <Text style={[styles.country, {fontWeight: 'bold'}]}>
                  {corner.ss_league_name}
                </Text>
              </View>
              <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
                <Text style={[styles.country, {textAlign: 'center'}]}>
                  {formatDate(corner.ss_fixture_date)}
                </Text>
              </View>
              <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 100}}>
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

        {cornersData && cornersData.length !== 0 && !is_filtered ? (
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
          gap: 10,
          marginHorizontal: wp(5),
          marginBottom: 6,
        }}>
        <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
          <View>
            <Text style={styles.headingOfHeaderAboveGoalCard}>FH</Text>
          </View>
          <View
            style={[styles.textOfHeaderAboveGoalCard, {flexShrink: 1, gap: 4}]}>
            <Text>O2.5%</Text>
            <Text>O3.5%</Text>
            <Text>O4.5%</Text>
          </View>
        </View>

        <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 200}}>
          <View>
            <Text style={styles.headingOfHeaderAboveGoalCard}>FT</Text>
          </View>
          <View
            style={[styles.textOfHeaderAboveGoalCard, {flexShrink: 1, gap: 5}]}>
            <Text>O8.5%</Text>
            <Text>O9.5%</Text>
            <Text>10.5%</Text>
          </View>
        </View>

        <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 120}}>
          <View>
            <Text style={styles.headingOfHeaderAboveGoalCard}>Corners</Text>
          </View>
          <View
            style={[styles.textOfHeaderAboveGoalCard, {flexShrink: 1, gap: 5}]}>
            <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 40}}>
              <Text>37+ mins</Text>
            </View>
            <View style={{flexGrow: 0, flexShrink: 1, flexBasis: 40}}>
              <Text>85+ mins</Text>
            </View>
          </View>
        </View>
      </View>

      <InnerCard
        cornersData={cornersData}
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
    gap: 20,
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
