import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Size, hp, wp} from '../../assets/dimensions';
import {Colors} from '../../assets/color';
import {useNavigation} from '@react-navigation/native';

const HexagonalCircleItem = ({item, specificDateSelected}) => {
  const navigation = useNavigation();

  const onPress = value => {
    navigation.navigate('MatchStats', {value});
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.topView}>
        <View style={{width: wp(12)}} />
        <View
          style={[
            styles.locationTitle,
            {flexDirection: 'row', alignItems: 'center', maxWidth: wp(50)},
          ]}>
          {specificDateSelected && (
            <Image
              source={{uri: item.m_league_logo}}
              style={styles.flagImage}
            />
          )}
          {specificDateSelected && (
            <Text style={styles.leagueName}>{item.m_league_name}</Text>
          )}
        </View>
        <View>
          {specificDateSelected && (
            <Text style={styles.liveText}>
              {item.m_fixture_status === 'NOT_STARTED'
                ? 'NS'
                : item.m_fixture_status}
            </Text>
          )}
        </View>
      </View>

      <View
        style={{
          margin: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          {specificDateSelected && (
            <Image
              source={{uri: item.m_hometeam_logo}}
              resizeMode="contain"
              style={styles.teamLogo}
            />
          )}
          <View style={{flexWrap: 'wrap', alignItems: 'center'}}>
            {specificDateSelected && (
              <Text
                style={{
                  ...styles.scoreText,
                  marginVertical: wp(0),
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {item.m_hometeam_name}
              </Text>
            )}
          </View>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(20),
            }}>
            {specificDateSelected === true ? (
              <Text style={styles.scoreText}>{item.m_hometeam_score}</Text>
            ) : (
              ''
            )}

            <Text style={styles.scoreText}>-</Text>

            {specificDateSelected && (
              <Text style={styles.scoreText}>{item.m_awayteam_score}</Text>
            )}
          </View>
          {specificDateSelected && (
            <Text style={{...styles.scoreText, color: 'red'}}>
              {item.m_fixture_timer}
            </Text>
          )}
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          {specificDateSelected && (
            <Image
              source={{uri: item.m_awayteam_logo}}
              resizeMode="contain"
              style={styles.teamLogo}
            />
          )}
          <View style={{flexWrap: 'wrap', alignItems: 'center'}}>
            {specificDateSelected && (
              <Text
                style={{
                  ...styles.scoreText,
                  marginVertical: wp(0),
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {item.m_awayteam_name}
              </Text>
            )}
          </View>
        </View>
      </View>

      <Text
        onPress={() => onPress(item.m_fixture_id)}
        style={styles.detailsText}>
        View Details
      </Text>
    </View>
  );
};

const FavouriteGrid = ({
  specificDateSelected,
  receivedMatchData,
  skip,
  take,
  onSkipChange,
  onTakeChange,
}) => {
  const renderItem = ({item}) => {
    return (
      <HexagonalCircleItem
        item={item}
        specificDateSelected={specificDateSelected}
      />
    );
  };

  const loadMoreData = () => {
    onSkipChange(skip + take);
  };

  const loadPreviousData = () => {
    if (skip >= take) {
      onSkipChange(skip - take);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {receivedMatchData && (
          <FlatList
            data={receivedMatchData}
            nestedScrollEnabled={true}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
            style={{marginBottom: specificDateSelected ? 0 : 100}}
          />
        )}
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flatListContent: {
    flexGrow: 1, // Ensure that the FlatList can scroll
    width: wp(100),
  },
  itemContainer: {
    borderRadius: 20,
    marginHorizontal: wp(5),
    marginVertical: wp(3),
    // height:hp(25),
    paddingHorizontal: wp(2),
    paddingBottom: wp(2),
    // alignItems:'center',
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
  topView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  liveText: {
    padding: wp(2),
    backgroundColor: 'red',
    color: Colors.white,
    fontSize: Size(1.8),
    borderRadius: 15,
    paddingHorizontal: wp(5),
    fontWeight: 'bold',
  },
  locationTitle: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundGrey,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: wp(4),
    fontSize: Size(1.8),
    paddingTop: wp(2),
    color: Colors.black,
  },
  teamLogo: {
    width: wp(13),
    height: wp(13),
    alignSelf: 'center',
  },
  scoreText: {
    fontSize: Size(2),
    alignSelf: 'center',
    marginVertical: wp(2),
    color: Colors.black,
  },
  detailsText: {
    fontSize: Size(2),
    alignSelf: 'center',
    color: Colors.lightGrey,
  },
  flagImage: {
    width: 20,
    height: 20,
    margin: 2,
  },
  leagueName: {
    marginLeft: 8,
    flexShrink: 1,
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
  emptyView: {
    minHeight: hp(50),
    // maxHeight: hp(50),
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavouriteGrid;
