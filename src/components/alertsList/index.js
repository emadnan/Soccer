import React from 'react';
import {View, FlatList, StyleSheet, Image, Text, Platform} from 'react-native';
import {Size, hp, wp} from '../../assets/dimensions';
import {Colors} from '../../assets/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: '1',
    timeSlot: '11:00 to 12:00pm',
    shortDisc: 'Lorem ipsum',
    title: 'Mobile',
    image: 'https://picsum.photos/seed/11/200/200',
  },
  {
    id: '2',
    timeSlot: '11:00 to 12:00pm',
    shortDisc: 'Lorem ipsum',
    title: 'A/C',
    image: 'https://picsum.photos/seed/12/200/200',
  },
  {
    id: '3',
    timeSlot: '11:00 to 12:00pm',
    shortDisc: 'Lorem ipsum',
    title: 'Elevator',
    image: 'https://picsum.photos/seed/13/200/200',
  },
  {
    id: '4',
    timeSlot: '11:00 to 12:00pm',
    shortDisc: 'Lorem ipsum',
    title: 'Electricity',
    image: 'https://picsum.photos/seed/14/200/200',
  },
  {
    id: '5',
    timeSlot: '11:00 to 12:00pm',
    shortDisc: 'Lorem ipsum',
    title: 'Plumbing',
    image: 'https://picsum.photos/seed/15/200/200',
  },
  {
    id: '6',
    timeSlot: '11:00 to 12:00pm',
    shortDisc: 'Lorem ipsum',
    title: 'Camera',
    image: 'https://picsum.photos/seed/51/200/200',
  },
  {
    id: '7',
    timeSlot: '11:00 to 12:00pm',
    shortDisc: 'Lorem ipsum',
    title: 'Carpenter',
    image: 'https://picsum.photos/seed/24/200/200',
  },
  {
    id: '8',
    timeSlot: '11:00 to 12:00pm',
    shortDisc: 'Lorem ipsum',
    title: 'Garage',
    image: 'https://picsum.photos/seed/8/200/200',
  },
  {
    id: '9',
    timeSlot: '11:00 to 12:00pm',
    shortDisc: 'Lorem ipsum',
    title: 'Flooring',
    image: 'https://picsum.photos/seed/9/200/200',
  },
];

const HexagonalCircleItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <View
      style={
        item?.id < 3
          ? {
              ...styles.itemContainer,
              borderWidth: 0.8,
              borderColor: Colors.textBlue,
            }
          : {...styles.itemContainer}
      }>
      <View>
        <Text style={styles.titleText}>Half time break on field now!</Text>
        <Text style={styles.subTitleText}>Arsenal vs Chelsea</Text>
      </View>

      <MaterialCommunityIcons
        color={item?.id < 3 ? Colors.textBlue : Colors.white}
        name="circle-medium"
        size={Size(2)}
      />
    </View>
  );
};

const AlertList = () => {
  const renderItem = ({item}) => {
    return <HexagonalCircleItem item={item} />;
  };

  return (
    <View style={styles.container}>
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
    borderRadius: 10,
    marginHorizontal: wp(5),
    marginVertical: wp(3),
    // height:hp(25),
    paddingHorizontal: wp(2),
    paddingVertical: wp(5),
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  titleText: {
    fontSize: Size(2),
    color: Colors.darkGrey30,
  },
  subTitleText: {
    fontSize: Size(1.6),
    color: Colors.lightGrey,
  },
});

export default AlertList;
