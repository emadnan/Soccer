import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import {Colors} from '../../../../assets/color';
import HomeHeader from '../../../../components/homeHeader';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import {Size, hp, wp} from '../../../../assets/dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Images} from '../../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import Goals from './Goals/Goals';
import Cards from './Cards/Cards';
import Corners from './Corners/Corners';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {Overlay} from '@rneui/themed';
import CustomButton from '../../../../components/CustomButton';
import DateSelectionComponent from '../../../../components/dateSelection';
import Loader from '../../../../components/loader';
import moment from 'moment';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import DownloadLoader from '../../../../components/downloadLoader';
import { MediaScanner } from 'react-native-media-scanner';
const ItemAlignment = {
  justifyContent: 'center',
  alignItems: 'center',
};

const Statistics = () => {
  const [activeOption, setActiveOption] = useState('goals');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [is_filtered, setIsFiltered] = useState(false);

  const [reRenderComponent, setReRenderComponent] = useState(false);

  const [visible, setVisible] = useState(false);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);

  const [goalsData, setGoalsData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [cornersData, setCornersData] = useState([]);

  const options = [
    {id: 'goals', name: 'Goals', type: 0},
    {id: 'cards', name: 'Cards', type: 1},
    {id: 'corners', name: 'Corners', type: 2},
  ];

  const handleDataGetAccordingtoDate = matchData => {
    const _goalsData = matchData.map(item => {
      return {
        ss_id: item.ss_id,

        ss_fixture_id: item.ss_fixture_id,
        ss_fixture_status: item.ss_fixture_status,
        ss_fixture_date: item.ss_fixture_date,
        ss_league_id: item.ss_league_id,
        ss_league_name: item.ss_league_name,
        ss_league_logo: item.ss_league_logo,
        ss_hometeam_id: item.ss_hometeam_id,
        ss_hometeam_name: item.ss_hometeam_name,
        ss_hometeam_logo: item.ss_hometeam_logo,
        ss_awayteam_id: item.ss_awayteam_id,
        ss_awayteam_name: item.ss_awayteam_name,
        ss_awayteam_logo: item.ss_awayteam_logo,

        ss_goals_over15: item.ss_goals_over15,
        ss_goals_over25: item.ss_goals_over25,
        ss_goals_over35: item.ss_goals_over35,
        ss_goals_overbtts: item.ss_goals_overbtts,
        ss_goals_over05fhg: item.ss_goals_over05fhg,
        ss_goals_over05shg: item.ss_goals_over05shg,
        ss_goals_minute37: item.ss_goals_minute37,
        ss_goals_minute85: item.ss_goals_minute85,
      };
    });

    const _cardsData = matchData.map(item => {
      return {
        ss_id: item.ss_id,

        ss_fixture_id: item.ss_fixture_id,
        ss_fixture_status: item.ss_fixture_status,
        ss_fixture_date: item.ss_fixture_date,
        ss_league_id: item.ss_league_id,
        ss_league_name: item.ss_league_name,
        ss_league_logo: item.ss_league_logo,
        ss_hometeam_id: item.ss_hometeam_id,
        ss_hometeam_name: item.ss_hometeam_name,
        ss_hometeam_logo: item.ss_hometeam_logo,
        ss_awayteam_id: item.ss_awayteam_id,
        ss_awayteam_name: item.ss_awayteam_name,
        ss_awayteam_logo: item.ss_awayteam_logo,

        ss_home_cards_for_fh: item.ss_home_cards_for_fh,
        ss_home_cards_against_fh: item.ss_home_cards_against_fh,
        ss_home_cards_for_sh: item.ss_home_cards_for_sh,
        ss_home_cards_against_sh: item.ss_home_cards_against_sh,
        ss_home_cards_for_ft: item.ss_home_cards_for_ft,
        ss_home_cards_against_ft: item.ss_home_cards_against_ft,
        // Away Team
        ss_away_cards_for_fh: item.ss_away_cards_for_fh,
        ss_away_cards_against_fh: item.ss_away_cards_against_fh,
        ss_away_cards_for_sh: item.ss_away_cards_for_sh,
        ss_away_cards_against_sh: item.ss_away_cards_against_sh,
        ss_away_cards_for_ft: item.ss_away_cards_for_ft,
        ss_away_cards_against_ft: item.ss_away_cards_against_ft,
      };
    });

    const _cornersData = matchData.map(item => {
      return {
        ss_id: item.ss_id,

        ss_fixture_id: item.ss_fixture_id,
        ss_fixture_status: item.ss_fixture_status,
        ss_fixture_date: item.ss_fixture_date,
        ss_league_id: item.ss_league_id,
        ss_league_name: item.ss_league_name,
        ss_league_logo: item.ss_league_logo,
        ss_hometeam_id: item.ss_hometeam_id,
        ss_hometeam_name: item.ss_hometeam_name,
        ss_hometeam_logo: item.ss_hometeam_logo,
        ss_awayteam_id: item.ss_awayteam_id,
        ss_awayteam_name: item.ss_awayteam_name,
        ss_awayteam_logo: item.ss_awayteam_logo,

        ss_corners_over25: item.ss_corners_over25,
        ss_corners_over35: item.ss_corners_over35,
        ss_corners_over45: item.ss_corners_over45,
        ss_corners_over85: item.ss_corners_over85,
        ss_corners_over95: item.ss_corners_over95,
        ss_corners_over105: item.ss_corners_over105,
        ss_corners_minute37: item.ss_corners_minute37,
        ss_corners_minute85: item.ss_corners_minute85,
      };
    });

    setGoalsData(_goalsData);
    setCardsData(_cardsData);
    setCornersData(_cornersData);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={
        activeOption === item?.id
          ? styles.selectedOptionButton
          : styles.optionButton
      }
      onPress={() => handleOptionPress(item)}>
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
    console.log('option: ', option);
    setType(option.type);
    setActiveOption(option.id);
    setSkip(0);
  };

  const handleSkipTakeChange = (newSkip, newTake) => {
    setSkip(newSkip);
    setTake(newTake);
  };

  const [date, setDate] = useState('');
  const [type, setType] = useState(0);

  const handleSelectedDate = value => {
    const formattedDate = moment(value).format('YYYY-MM-DD');
    setDate(formattedDate);
  };

  const loaderAdd = value => {
    setLoading(value);
  };
  const loaderRemove = value => {
    setLoading(value);
  };

  const [downloading, setDownloading] = useState(null);

  const handleDownloadStatsCSV = async () => {
    console.log('type: ', type);
    console.log('date: ', date);
    setDownloading(true);
    await requestExternalStoragePermission(); // Request storage permission
  };

  const requestExternalStoragePermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

      if (result === RESULTS.GRANTED) {
        // Permission already granted
        // You can proceed with downloading the CSV
        downloadStatsCSV();
      } else {
        // Permission not granted, request it
        const permissionResult = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );

        if (permissionResult === RESULTS.GRANTED) {
          // Permission granted
          // You can proceed with downloading the CSV
          downloadStatsCSV();
        } else {
          // Permission denied, handle accordingly
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
      type: type,
      date: date,
    };

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    try {
      const response = await axios.post(url, requestData, {headers});
      console.log('response.data: ', response.data);
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
      let fileName;
      switch (type) {
          case 0:
              fileName = 'goal_file.csv';
            
              break;
          case 1:
              fileName = 'card_file.csv';
          
              break;
          case 2:
              fileName = 'corners_file.csv'; 
              break;
          default:
              console.error(`File not found for type ${type}`);
              return;
      }
  
let externalDirectoryPath= '';
      // Determine the download folder path based on the platform
      const downloadFolder =
        Platform.OS === 'android'
          ? externalDirectoryPath = RNFS.ExternalStorageDirectoryPath// On Android, use ExternalDirectoryPath for the Downloads folder.
          : RNFS.DocumentDirectoryPath; // On iOS, use DocumentDirectoryPath.
          // Get the External Storage Directory Path


          const downloadDirectoryPath = `${externalDirectoryPath}/Download`;
      // Specify the full file path
const filePath = `${downloadDirectoryPath}/${fileName}`;

console.log('File path:', filePath);

      // Write the CSV data to a file
      await RNFS.writeFile(filePath, csvData, 'utf8');

      console.log('CSV file written successfully:', filePath);
      Alert.alert('Success',fileName+ ' downloaded successfully');
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

  let displayData = null;

  if (activeOption === 'goals') {
    displayData = loading ? (
      <Loader />
    ) : (
      <Goals
        goalsData={goalsData}
        onSkipTakeChange={handleSkipTakeChange}
        is_filtered={is_filtered}
      />
    );
  } else if (activeOption === 'cards') {
    displayData = loading ? (
      <Loader />
    ) : (
      <Cards
        cardsData={cardsData}
        onSkipTakeChange={handleSkipTakeChange}
        is_filtered={is_filtered}
      />
    );
  } else if (activeOption === 'corners') {
    displayData = loading ? (
      <Loader />
    ) : (
      <Corners
        cornersData={cornersData}
        onSkipTakeChange={handleSkipTakeChange}
        is_filtered={is_filtered}
      />
    );
  }

  function RenderButton(props) {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [previousValue, setPreviousValue] = useState('');
    const handleOptionPress = option => {
      setSelectedOption(option.name);
      setShowOptions(false);
      props.onSelect(option);
    };

    useEffect(() => {
      if (props.defaultValue && props.defaultValue !== '') {
        setPreviousValue(props.defaultValue.name);
        setSelectedOption(props.defaultValue.value);
      }
    }, []);

    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setShowOptions(!showOptions)}
          style={styles.button}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            {props?.leftIcon}
            <Text
              style={{
                ...styles.buttonText,
                ...props?.titleStyle,
              }}>
              {previousValue &&
              previousValue !== '' &&
              previousValue !== (null || undefined)
                ? previousValue
                : selectedOption || props?.title}
            </Text>
            <Ionicons
              color={props?.noDrop ? Colors.white : Colors.grey}
              name={showOptions ? 'chevron-up' : 'chevron-down'}
              size={Size(2)}
            />
          </View>
        </TouchableOpacity>
        {showOptions && (
          <View style={styles.optionsContainer}>
            {props.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionItem}
                onPress={() => handleOptionPress(option)}>
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }

  function NumericInputField({defaultNumericValue, onSelectNumeric}) {
    const [previousValue, setPreviousValue] = useState('');
    useEffect(() => {
      if (defaultNumericValue && defaultNumericValue !== '') {
        setPreviousValue(defaultNumericValue);
      }
    }, []);

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = value => {
      setInputValue(value);
      onSelectNumeric(value);
    };

    return (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TextInput
            style={styles.numericInput}
            placeholder="Enter Score"
            value={
              previousValue !== null && previousValue !== ''
                ? previousValue
                : inputValue
            }
            onChangeText={handleInputChange}
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  }

  const handlePreviousSelectFieldValue = value => {
    setPreviousSelectFieldValue(value);
  };
  const handlePreviousSelectOperatorValue = value => {
    setPreviousSelectOperatorValue(value);
  };
  const handlePreviousSelectNumericValue = value => {
    setPreviousSelectNumericValue(value);
  };

  const [previousSelectFieldValue, setPreviousSelectFieldValue] = useState({});
  const [previousSelectOperatorValue, setPreviousSelectOperatorValue] =
    useState({});
  const [previousSelectNumericValue, setPreviousSelectNumericValue] =
    useState('');

  const AddFilter = ({
    handlePreviousSelectFieldValue,
    handlePreviousSelectOperatorValue,
    handlePreviousSelectNumericValue,
  }) => {
    const onHandleFieldSelect = selected_value => {
      handlePreviousSelectFieldValue(selected_value);
    };

    const onHandleOperatorSelect = selected_value => {
      handlePreviousSelectOperatorValue(selected_value);
    };

    const onHandleNumericInput = value => {
      handlePreviousSelectNumericValue(value);
    };

    const searchFilter = async () => {
      setVisible(!visible);
      setLoading(true);
      setIsFiltered(true);
      const url =
        'https://api.footballstatspro.com/api/summar-stats-advance-filter';
      const userToken = await AsyncStorage.getItem('userToken');

      const requestData = {
        date: date,
        fieldName: previousSelectFieldValue.value,
        value: previousSelectNumericValue,
        condition: previousSelectOperatorValue.value,
      };

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      console.log('requestData: ', requestData);

      try {
        const response = await axios.post(url, requestData, {headers});
        handleDataGetAccordingtoDate(response.data);
      } catch (error) {
        console.error('Error:', error.response.data);
      } finally {
        setLoading(false);
      }
    };

    const removeFilter = () => {
      handlePreviousSelectFieldValue(null);
      handlePreviousSelectOperatorValue(null);
      handlePreviousSelectNumericValue(null);
      setVisible(!visible);
      setIsFiltered(!is_filtered);
      setReRenderComponent(!reRenderComponent);
    };

    const handleClosePopup = () => {
      setVisible(!visible);
      if (!is_filtered) {
        handlePreviousSelectFieldValue(null);
        handlePreviousSelectOperatorValue(null);
        handlePreviousSelectNumericValue(null);
      }
    };
    return (
      <ScrollView>
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
          <RenderButton
            title="Select"
            defaultValue={previousSelectFieldValue}
            options={[
              {name: 'Average over 1.5 Goals %', value: 'ss_goals_over15'},
              {name: 'Average over 2.5 Goals %', value: 'ss_goals_over25'},
              {name: 'Average over 3.5 Goals %', value: 'ss_goals_over35'},
              {name: 'Average over BTTS Goals %', value: 'ss_goals_overbtts'},
              {
                name: 'First Half over 0.5 Goals %',
                value: 'ss_goals_over05fhg',
              },
              {
                name: 'Second Half over 0.5 Goals %',
                value: 'ss_goals_over05shg',
              },
              {name: '35+ Goals Minutes%', value: 'ss_goals_minute37'},
              {name: '85+ Goals Minutes%', value: 'ss_goals_minute85'},
              // GOALS OPTION END

              {name: 'Home Card For FH', value: 'ss_home_cards_for_fh'},
              {name: 'Home Card Against FH', value: 'ss_home_cards_against_fh'},
              {name: 'Home Card For SH', value: 'ss_home_cards_for_sh'},
              {name: 'Home Card Against SH', value: 'ss_home_cards_against_sh'},
              {name: 'Home Card For FT', value: 'ss_home_cards_for_ft'},
              {name: 'Home Card Against FT', value: 'ss_home_cards_against_ft'},

              {name: 'Away Card For FH', value: 'ss_away_cards_for_fh'},
              {name: 'Away Card Against FH', value: 'ss_away_cards_against_fh'},
              {name: 'Away Card For SH', value: 'ss_away_cards_for_sh'},
              {name: 'Away Card Against SH', value: 'ss_away_cards_against_sh'},
              {name: 'Away Card For FT', value: 'ss_away_cards_for_ft'},
              {name: 'Away Card Against FT', value: 'ss_away_cards_against_ft'},
              // CARD END

              {name: 'Corners Over 02.5', value: 'ss_corners_over25'},
              {name: 'Corners Over 03.5', value: 'ss_corners_over35'},
              {name: 'Corners Over 04.5', value: 'ss_corners_over45'},
              {name: 'Corners Over 08.5', value: 'ss_corners_over85'},
              {name: 'Corners Over 09.5', value: 'ss_corners_over95'},
              {name: 'Corners Over 10.5', value: 'ss_corners_over105'},
              {name: '37+ Corners Minutes%', value: 'ss_corners_minute37'},
              {name: '85+ Corners Minutes%', value: 'ss_corners_minute85'},
            ]}
            onSelect={onHandleFieldSelect}
          />

          <RenderButton
            title="Select Operator"
            defaultValue={previousSelectOperatorValue}
            options={[
              {name: 'Equall', value: '='},
              {name: 'Less Than', value: '<'},
              {name: 'Greater Than', value: '>'},
              {name: 'Less Than Equall to', value: '<='},
              {name: 'Greater Than Equall to', value: '>='},
            ]}
            onSelect={onHandleOperatorSelect}
          />

          <NumericInputField
            defaultNumericValue={previousSelectNumericValue}
            onSelectNumeric={onHandleNumericInput}
          />
        </View>
        <CustomButton
          buttonTextStyle={{color: Colors.black}}
          onPress={searchFilter}
          text="Add Filter"
          size="small"
        />
        <CustomButton
          gradient
          text="Remove Filter"
          onPress={removeFilter}
          size="small"
        />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, overflow: 'hidden'}}>
      <ScrollView>
        <AnimatedLinearGradient
          customColors={Colors.primaryGradient}
          speed={6000}
        />
        <HomeHeader
       
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
              <View>
                <Image
                  source={Images.calenderIcon}
                  resizeMode="contain"
                  style={styles.iconStyle}
                />
              </View>
              <View>
                <Text style={styles.welcomeText}>Statistics</Text>
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
                  appScreen="statistics"
                  skip={skip}
                  take={take}
                  onChangeSelectedDate={handleSelectedDate}
                  handleDataGetAccordingtoDate={handleDataGetAccordingtoDate}
                  loaderRemove={loaderRemove}
                  loaderAdd={loaderAdd}
                  reRenderComponent={reRenderComponent}
                />

                <View>
                  <FlatList
                    data={options}
                    renderItem={renderItem}
                    // keyExtractor={item => item.id}
                    horizontal
                    contentContainerStyle={{
                      ...styles.flatlistContainerStyle,
                      ...styles.shadow,
                      marginBottom: hp(6),
                    }}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>

                <View>{displayData}</View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {visible ? (
        <Overlay overlayStyle={styles.OverlayStyle} isVisible={visible}>
          <AddFilter
            handlePreviousSelectFieldValue={handlePreviousSelectFieldValue}
            handlePreviousSelectOperatorValue={
              handlePreviousSelectOperatorValue
            }
            handlePreviousSelectNumericValue={handlePreviousSelectNumericValue}
          />
        </Overlay>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // overflow: 'hidden',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: wp(5),
  },
  optionsContainer: {
    paddingHorizontal: wp(2),
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    paddingHorizontal: 42,
    marginHorizontal: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(4),
  },
  selectedOptionButton: {
    paddingHorizontal: 42,
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
  displayContainer: {
    height: hp(100),
  },
  flatlistContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: hp(7),
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

export default Statistics;
