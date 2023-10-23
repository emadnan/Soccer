import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  Platform,
  Switch,
} from 'react-native';
import {Size, hp, wp} from '../../assets/dimensions';
import {Colors} from '../../assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import CustomButton from '../CustomButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import moment from 'moment';

const HexagonalCircleItem = ({item, onDelete, userToken}) => {
  const {created_at, description, title} = item;
  const formattedDate = moment(created_at).format('D-MMM-YYYY');

  const [alertOn, setAlertOn] = useState(false);
  const navigation = useNavigation();

  const handleSaveCardDataChange = () => {
    setAlertOn(!alertOn);
  };

  const deleteAlertCardBuilder = async () => {
    try {
      // Make the API call to delete the item
      await axios.post(
        `https://api.footballstatspro.com/api/delete-listBuilder/${item.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      onDelete(item.id);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.topView}>
        <Text style={styles.locationTitle}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <Ionicons color={Colors.black} name="pencil" size={Size(2.5)} /> */}
          <Ionicons
            color={'red'}
            name="trash-outline"
            size={Size(2.5)}
            onPress={deleteAlertCardBuilder}
          />
          <Switch
            trackColor={{false: '#767577', true: Colors.green}}
            thumbColor={alertOn ? Colors.white : '#f4f3f4'}
            onValueChange={handleSaveCardDataChange}
            value={alertOn}
          />
        </View>
      </View>
      <View>
        <Text style={styles.internalText}>Created At: {formattedDate}</Text>
      </View>
      <View>
        <Text style={styles.internalText}>Description: {description}</Text>
      </View>
      <View
        style={{
          borderBottomWidth: wp(0.2),
          borderColor: Colors.lightGrey,
          marginVertical: wp(2),
        }}
      />

      <CustomButton
        onPress={() => navigation.navigate('ResultList')}
        gradient
        text="View Details"
        size="small"
      />
    </View>
  );
};

const AlertCardBuilder = () => {
  const [data, setData] = useState({});
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    fetchAlertData();
  }, []);
  const fetchAlertData = async () => {
    const token = await AsyncStorage.getItem('userToken');

    setUserToken(token);
    if (token) {
      try {
        const response = await axios.get(
          `https://api.footballstatspro.com/api/get-alerts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-RapidAPI-Key':
                '2e7a3d50b5msh5f8a22afdf8cdcdp137f55jsn65f872c9d5c5',
            },
          },
        );

        setData(response.data.alerts);
      } catch (error) {
        console.error('Error fetching match data in Alerts:', error);
      }
    }
  };

  const renderItem = ({item}) => {
    const deleteItem = itemId => {
      const updatedData = data.filter(item => item.id !== itemId);
      setData(updatedData);
    };
    return (
      <HexagonalCircleItem
        item={item}
        onDelete={deleteItem}
        userToken={userToken}
      />
    );
  };

  return (
    <View style={[styles.container, {marginBottom: 100}]}>
      <FlatList
        data={data}
        nestedScrollEnabled={true}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height:hp(25),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flatListContent: {
    flex: 1,
    width: wp(100),
    // alignItems:'center',
    // paddingHorizontal: 10,
  },
  itemContainer: {
    borderRadius: 20,
    marginHorizontal: wp(5),
    marginVertical: wp(3),
    // height:hp(25),
    paddingHorizontal: wp(2),
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
  viewDetailsContainer: {
    marginHorizontal: wp(25),
    paddingHorizontal: wp(2),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    marginTop: wp(2),
  },
  locationTitle: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: Size(1.8),
    color: Colors.black,
    margin: wp(2),
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
    fontSize: Size(1.8),
    margin: 5,
    alignSelf: 'center',
    color: Colors.white,
  },
  internalText: {
    fontSize: Size(1.6),
    color: Colors.black,
    fontWeight: '500',
  },
  topView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AlertCardBuilder;
