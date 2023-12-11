import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import {wp} from '../../assets/dimensions';
import {Colors} from '../../assets/color';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const DateSelectionComponent = ({
  onMatchDataChange,
  onChangeSelectedDate,
  loaderAdd,
  loaderRemove,
  skip,
  take,
  appScreen,
  handleDataGetAccordingtoDate,
  reRenderComponent,
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [unformatedSelectedDate, setUnformatedSelectedDate] = useState('');
  const [matchData, setMatchData] = useState();
  const [skipRecord, setSkipRecord] = useState();
  const [takeRecord, setTakeRecord] = useState();
  const [reRenderValues, setReRenderValues] = useState();
  useEffect(() => {
    setSkipRecord(skip);
    setTakeRecord(take);
    setReRenderValues(reRenderComponent);

    // Set the initial selected date to today when the component mounts
    const today = new Date();
    const formattedToday = today.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
    });
    setSelectedDate(formattedToday);
    setUnformatedSelectedDate(today);

    // Fetch data for today's date
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDateString = `${year}-${month}-${day}`;

    if (appScreen === 'statistics') {
      callApiForStats(formattedDateString);
      onChangeSelectedDate(formattedDateString);
    } else {
      onChangeSelectedDate(formattedDateString, formattedToday);
      getSpecificDateRecord(formattedDateString);
    }
  }, [skip, take, reRenderComponent]);

  const handleDatePress = (date, formattedDate) => {
    setSelectedDate(formattedDate);
    setUnformatedSelectedDate(date);

    onChangeSelectedDate(date, formattedDate);
    setSkipRecord(0); 
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const formattedDateString = `${year}-${month}-${day}`;

    if (appScreen === 'statistics') {
      callApiForStats(formattedDateString);
    } else {
      getSpecificDateRecord(formattedDateString);
    }
  };

  const callApiForStats = async dateString => {
    loaderAdd(true);
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      try {
        const response = await axios.get(
          `https://api.footballstatspro.com/api/getSummaryStats?date=${dateString}&take=${take}&skip=${skip}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              'X-RapidAPI-Key':
                '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
            },
          },
        );

        const matchData = response.data.SummaryStats;
        handleDataGetAccordingtoDate(matchData);
      } catch (error) {
        console.error('Error fetching match data in Statistics:', error);
      } finally {
        loaderRemove(false);
      }
    }
  };

  const getSpecificDateRecord = async dateString => {
    console.log('current date ', dateString);
    loaderAdd(true);
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      try {
        const response = await axios.get(
          `https://api.footballstatspro.com/api/get-matchesByDate/${dateString}?take=${take}&skip=${skip}`, //
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );

        const match_data = response.data;

        setMatchData(match_data);
        onMatchDataChange(match_data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        loaderRemove(false);
      }
    }
  };

  const getDayName = date => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const getShortMonthName = date => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[date.getMonth()];
  };

  useEffect(() => {
    if (
      unformatedSelectedDate &&
      skipRecord !== (undefined || null) &&
      takeRecord
    ) {
      const parsedDate = new Date(unformatedSelectedDate);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getDate()).padStart(2, '0');
      const formattedDateString = `${year}-${month}-${day}`;
      if (appScreen === 'statistics') {
        callApiForStats(formattedDateString);
      } else {
        getSpecificDateRecord(formattedDateString);
      }
    }
  }, [selectedDate, skipRecord, takeRecord, reRenderValues]);

  return (
    <View style={styles.dateSelectionContainer}>
      {[-2, -1, 0, 1, 2].map(offset => {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        const formattedDate = date.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
        });
        const dayName = getDayName(date);
        const shortMonthName = getShortMonthName(date);

        return (
          <TouchableOpacity
            key={offset}
            style={[
              styles.dateButton,
              selectedDate === formattedDate && styles.selectedDateButton,
            ]}
            onPress={() => handleDatePress(date, formattedDate)}>
            {selectedDate === formattedDate && (
              <AnimatedLinearGradient
                customColors={Colors.primaryGradient}
                speed={6000}
              />
            )}
            <Text
              style={[
                styles.dateText,
                selectedDate === formattedDate && styles.selectedDateText,
              ]}>
              {date.getDate() === new Date().getDate() ? 'Today' : dayName}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 2,
              }}>
              <Text
                style={[
                  styles.shortMonthText,
                  selectedDate === formattedDate && styles.selectedDateText,
                ]}>
                {shortMonthName}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDate === formattedDate && styles.selectedDateText,
                ]}>
                {date.getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dateSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  dateButton: {
    paddingHorizontal: wp(5),
    paddingVertical: wp(3),
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedDateButton: {
    backgroundColor: 'gold',
  },
  dateText: {
    fontSize: 13,
    alignSelf: 'center',
    color: Colors.black,
  },
  shortMonthText: {
    fontSize: 13,
    alignSelf: 'center',
    color: Colors.black,
    fontWeight: 'bold',
  },
  selectedDateText: {
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default DateSelectionComponent;
