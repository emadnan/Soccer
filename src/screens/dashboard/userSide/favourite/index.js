import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HomeHeader from '../../../../components/homeHeader';
import {Images} from '../../../../assets/images';
import {Size, hp, wp} from '../../../../assets/dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../../../../assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FavouriteGrid from '../../../../components/favouriteGrid';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

import {useNavigation} from '@react-navigation/native';
import DateSelectionComponent from '../../../../components/dateSelection';
import axios from 'axios';
import {Overlay} from '@rneui/themed';
import CustomButton from '../../../../components/CustomButton';
import Loader from '../../../../components/loader';
import moment from 'moment';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import DownloadLoader from '../../../../components/downloadLoader';
import AsyncStorage from '@react-native-community/async-storage';

const ItemAlignment = {
  justifyContent: 'center',
  alignItems: 'center',
};

export default function Favourite() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const [jsonData, setJsonData] = useState(null);

  const [receivedMatchData, setReceivedMatchData] = useState();
  const [specificDateSelected, setSpecificDateSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [is_filtered, setIsFiltered] = useState(false);
  const [reRenderComponent, setReRenderComponent] = useState(false);

  const handleMatchData = data => {
    setReceivedMatchData(data.matches);
    setSpecificDateSelected(true);
  };
  const [date, setDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const handleSelectedDate = (date, dateString) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setDate(formattedDate);
    setSelectedDate(dateString);
    setSpecificDateSelected(true);
  };

  const loaderAdd = value => {
    setLoading(value);
  };

  const loaderRemove = value => {
    setLoading(value);
  };

  const [downloading, setDownloading] = useState(null);

  const handleDownloadStatsCSV = async () => {
    setDownloading(true);
    await requestExternalStoragePermission();
  };

  const requestExternalStoragePermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

      if (result === RESULTS.GRANTED) {
        downloadStatsCSV();
      } else {
        const permissionResult = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );

        if (permissionResult === RESULTS.GRANTED) {
          downloadStatsCSV();
        } else {
          console.log('Write external storage permission denied.');
        }
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  const downloadStatsCSV = async () => {
    const url = 'https://api.footballstatspro.com/api/download-stats';
    const userToken = await AsyncStorage.getItem('userToken');

    const requestData = {
      date: date,
    };

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    try {
      const response = await axios.post(url, requestData, {headers});

      downloadCSV(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error:', error.response.data);
      } else {
        console.error('An error occurred:', error.message);
      }
    }
  };

  const downloadCSV = async jsonData => {
    try {
      // Convert the JSON data to a CSV string using papaparse
      const csvData = Papa.unparse(jsonData);

      // Define the file name
      const fileName = 'data.csv';

      // Determine the download folder path based on the platform
      const downloadFolder =
        Platform.OS === 'android'
          ? RNFS.ExternalDirectoryPath // On Android, use ExternalDirectoryPath for the Downloads folder.
          : RNFS.DocumentDirectoryPath; // On iOS, use DocumentDirectoryPath.

      // Specify the full file path
      const filePath = `${downloadFolder}/${fileName}`;

      console.log('File path:', filePath);

      // Write the CSV data to a file
      await RNFS.writeFile(filePath, csvData, 'utf8');

      console.log('CSV file written successfully:', filePath);

      // Show a success message to the user
      console.log('CSV file downloaded successfully');

      // You can also open the downloaded file with the device's default viewer
      // if needed.
    } catch (error) {
      console.error('Error downloading CSV:', error);
    } finally {
      setDownloading(false);
    }
  };

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);

  const handleSkipChange = newSkip => {
    setSkip(newSkip);
  };

  const handleTakeChange = newTake => {
    setTake(newTake);
  };

  function SearchLeagueInputField({defaultTextValue, onSelectText}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = value => {
      setInputValue(value);
      onSelectText(value);
    };
    const [previousValue, setPreviousValue] = useState('');
    useEffect(() => {
      if (defaultTextValue && defaultTextValue !== '') {
        setPreviousValue(defaultTextValue);
      }
    }, []);

    return (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            <TextInput
              style={styles.numericInput}
              placeholder="Enter League Name"
              value={
                previousValue !== null && previousValue !== ''
                  ? previousValue
                  : inputValue
              }
              onChangeText={handleInputChange}
            />
          </View>
        </View>
      </View>
    );
  }

  const [previousTextValue, setPreviousTextValue] = useState('');

  const handlePreviousTextValue = value => {
    setPreviousTextValue(value);
  };

  const AddFilter = ({handlePreviousTextValue}) => {
    const onHandleTextInput = value => {
      handlePreviousTextValue(value);
    };

    const searchFilter = async () => {
      setVisible(!visible);
      setLoading(true);
      setIsFiltered(true);
      console.log('previousTextValue: ', previousTextValue);
      console.log('date: ', date);
      const url = `https://api.footballstatspro.com/api/search_league_name?name=${previousTextValue}&date=${date}`;
      const userToken = await AsyncStorage.getItem('userToken');

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      try {
        const response = await axios.post(url, {headers});
        handleMatchData(response.data);
      } catch (error) {
        console.error('Error:', error.response.data);
      } finally {
        setLoading(false);
      }
    };

    const removeFilter = () => {
      handlePreviousTextValue(null);
      setVisible(!visible);
      setIsFiltered(!is_filtered);
      setReRenderComponent(!reRenderComponent);
    };

    const handleClosePopup = () => {
      setVisible(!visible);
      if (!is_filtered) {
        handlePreviousTextValue('');
      }
    };

    return (
      <View>
        <View
          style={{...styles.titleView, marginTop: 0, paddingHorizontal: wp(2)}}>
          <View style={{width: wp(5)}} />
          <Text style={styles.welcomeText}>Add Filter</Text>
          <Ionicons
            onPress={handleClosePopup}
            color={Colors.black}
            name="close-circle-outline"
            size={Size(3)}
          />
        </View>

        <View
          style={{
            backgroundColor: Colors.extralightgray,
            padding: wp(2),
            margin: wp(2),
            borderRadius: Size(1),
            justifyContent: 'center',
          }}>
          <SearchLeagueInputField
            defaultTextValue={previousTextValue}
            onSelectText={onHandleTextInput}
          />
        </View>
        <CustomButton
          buttonTextStyle={{color: Colors.black}}
          text="Add Filter"
          size="small"
          onPress={searchFilter}
        />
        <CustomButton
          gradient
          text="Remove Filter"
          size="small"
          onPress={removeFilter}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <AnimatedLinearGradient
        customColors={Colors.primaryGradient}
        speed={6000}
      />
      <HomeHeader
        title="Hi John Doe!"
        onBellPress={() => navigation.navigate('Notifications')}
      />
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
          overflow: 'hidden',
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.titleView}>
            <View>
              <Image
                source={Images.calenderIcon}
                resizeMode="contain"
                style={styles.iconStyle}
              />
            </View>
            <View>
              <Text style={styles.welcomeText}>Streak</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 6,
              }}>
              <Ionicons
                onPress={handleDownloadStatsCSV}
                color={Colors.black}
                name="download-outline"
                size={Size(3)}
              />
              <Ionicons
                onPress={() => setVisible(!visible)}
                color={Colors.black}
                name="options-outline"
                size={Size(3)}
              />
            </View>
          </View>

          {downloading ? (
            <DownloadLoader />
          ) : (
            <View>
              <DateSelectionComponent
                onMatchDataChange={handleMatchData}
                onChangeSelectedDate={handleSelectedDate}
                loaderRemove={loaderRemove}
                loaderAdd={loaderAdd}
                skip={skip}
                take={take}
                reRenderComponent={reRenderComponent}
              />
              <View style={styles.titleView}>
                <Text style={styles.welcomeText}>{selectedDate}</Text>

                <Ionicons
                  color={Colors.lightGrey}
                  name="filter"
                  size={Size(3)}
                />
              </View>
              {loading === true ? (
                <Loader />
              ) : (
                <FavouriteGrid
                  skip={skip}
                  take={take}
                  onSkipChange={handleSkipChange}
                  onTakeChange={handleTakeChange}
                  jsonData={jsonData}
                  specificDateSelected={specificDateSelected}
                  receivedMatchData={receivedMatchData}
                />
              )}
            </View>
          )}
        </ScrollView>
        {visible ? (
          <Overlay overlayStyle={styles.OverlayStyle} isVisible={visible}>
            <AddFilter handlePreviousTextValue={handlePreviousTextValue} />
          </Overlay>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    alignSelf: 'center',
    width: wp(100),
    height: hp(45),
  },
  innerButton: {
    alignSelf: 'center',
    marginVertical: wp(2),
    height: hp(5),
    borderWidth: 0.8,
    paddingHorizontal: wp(5),
    justifyContent: 'center',
    borderRadius: wp(10),
    backgroundColor: Colors.white,
    borderColor: Colors.primaryLight,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.11,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  welcomeText: {
    fontSize: Size(2.4),
    color: Colors.black,
    justifyContent: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginTop: wp(5),
  },
  iconStyle: {
    height: wp(7),
    width: wp(7),
  },
  OverlayStyle: {
    width: wp(80),
    borderRadius: Size(1),
    // height: hp(15),
    ...ItemAlignment,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    marginBottom: wp(2),
    marginHorizontal: wp(2),
    borderWidth: wp(0.2),
    borderColor: Colors.grey,
    borderRadius: Size(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  numericInput: {
    flex: 1,
    fontSize: Size(1.6),
    textAlign: 'left',
    color: Colors.grey,
    height: '100%', // Adjust the height to match other buttons
    paddingVertical: 0, // Remove default vertical padding
  },
});
