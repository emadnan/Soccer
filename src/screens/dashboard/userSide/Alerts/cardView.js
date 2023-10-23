import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList, Text} from 'react-native';
import {Colors} from '../../../../assets/color';
import {Size, hp, wp} from '../../../../assets/dimensions';
import NotificationsGrid from '../../../../components/notificationsGrid';

const CardView = () => {
  const [isFirstListVisible, setIsFirstListVisible] = useState(true);
  const data1 = ['Item 1', 'Item 2', 'Item 3'];
  const data2 = ['Item A', 'Item B', 'Item C'];

  const toggleList = () => {
    setIsFirstListVisible(!isFirstListVisible);
  };

  return (
    <View style={{flex: 1}}>
      <NotificationsGrid />
    </View>
  );
};

const styles = {
  buttonTitle: {
    fontSize: Size(2.8),
    marginHorizontal: 10,
    color: 'gray',
  },
  activeButtonTitle: {
    fontSize: Size(2.8),
    fontWeight: 'bold',
    color: Colors.textBlue,
  },
  buttonView: {
    borderBottomWidth: 0.8,
    borderColor: Colors.lightGrey,
    paddingHorizontal: wp(10),
  },
  activeButtonView: {
    // borderBottomWidth:0.5,
    borderColor: Colors.textBlue,
    // paddingHorizontal:wp(10)
  },
  textStyle: {
    alignSelf: 'flex-end',
    // marginRight:wp(5),
    fontSize: Size(2.2),
    color: 'black',
    fontWeight: 'bold',
    marginBottom: wp(2),
  },
};

export default CardView;
