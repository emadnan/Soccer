import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList, Text} from 'react-native';
import {Colors} from '../../../../assets/color';
import {Size, hp, wp} from '../../../../assets/dimensions';
import {Strings} from '../../../../assets/Strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FavouriteGrid from '../../../../components/favouriteGrid';
import LiveGrid from '../../../../components/liveGrid';
import DateSelectionComponent from '../../../../components/dateSelection';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';

const ToggleViews = ({liveData}) => {
  const [isFirstListVisible, setIsFirstListVisible] = useState(true);
  const [receivedMatchData, setReceivedMatchData] = useState();
  const [specificDateSelected, setSpecificDateSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);

  const toggleList = () => {
    setIsFirstListVisible(!isFirstListVisible);
  };

  const handleMatchData = data => {
    setReceivedMatchData(data.matches);
    setSpecificDateSelected(true);
  };

  const handleSelectedDate = (date, dateString) => {
    setSelectedDate(dateString);
    setSpecificDateSelected(true);
  };

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);

  const handleSkipChange = newSkip => {
    console.log(newSkip,'rgrtertretretretreterre');
    setSkip(newSkip);
  };

  const handleTakeChange = newTake => {
    setTake(newTake);
  };

  const loaderAdd = value => {
    setLoading(value);
  };
  const loaderRemove = value => {
    setLoading(value);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(2),
        }}>
        <TouchableOpacity
          style={[
            styles.buttonView,
            isFirstListVisible && styles.activeButtonView,
          ]}
          onPress={toggleList}>
          <Text
            style={[
              styles.buttonTitle,
              isFirstListVisible && styles.activeButtonTitle,
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonView,
            !isFirstListVisible && styles.activeButtonView,
          ]}
          onPress={toggleList}>
          <Text
            style={[
              styles.buttonTitle,
              !isFirstListVisible && styles.activeButtonTitle,
            ]}>
            Live
          </Text>
        </TouchableOpacity>
      </View>
      {isFirstListVisible && (
        <DateSelectionComponent
          onChangeSelectedDate={handleSelectedDate}
          onMatchDataChange={handleMatchData}
          skip={skip}
          take={take}
          loaderAdd={loaderAdd}
          loaderRemove={loaderRemove}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignSelf: 'center',

          justifyContent: 'space-between',
          paddingHorizontal: wp(5),
          marginTop: wp(5),
        }}>
        <Text style={styles.textStyle}>
          {specificDateSelected === true && isFirstListVisible
            ? selectedDate
            : 'Today'}
        </Text>
        <Ionicons color={Colors.lightGrey} name="filter" size={Size(3)} />
      </View>

      {isFirstListVisible ? (
        !loading && receivedMatchData ? (
          <View>
            <LiveGrid
              receivedMatchData={receivedMatchData}
              specificDateSelected={specificDateSelected}
              skip={skip}
              take={take}
              onSkipChange={handleSkipChange}
              onTakeChange={handleTakeChange}
            />
          </View>
        ) : (
          <View style={styles.emptyView}>
            <Text>Loading...</Text>
          </View>
        )
      ) : liveData ? (
        <View style={{minHeight: hp(70)}}>
          <LiveGrid liveData={liveData} />
        </View>
      ) : (
        <View style={styles.emptyView}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  toggleViewContainer: {
    flex: 1,
  },
  emptyView: {
    minHeight: hp(50),
    // maxHeight: hp(50),
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTitle: {
    fontSize: Size(2.8),
    marginHorizontal: 10,
    color: 'gray',
  },
  activeButtonTitle: {
    fontSize: Size(2.8),
    fontWeight: 'bold',
    color: Colors.black,
  },
  buttonView: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    paddingHorizontal: wp(10),
    width: wp(45),
    alignItems: 'center',
  },
  activeButtonView: {
    borderColor: Colors.textBlue,
  },
  textStyle: {
    alignSelf: 'flex-end',
    fontSize: Size(2.2),
    color: 'black',
    fontWeight: 'bold',
    marginBottom: wp(2),
  },
};

export default ToggleViews;
