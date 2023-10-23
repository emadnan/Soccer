//import liraries
import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './Styles';
import {Colors} from '../../../assets/color';
import {wp} from '../../../assets/dimensions';
// create a component
const SelectedTab = ({focused, name, service}) => {
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        ,
      ]}>
      {/* <Image source={service} resizeMode="contain" style={styles.iconStyle} /> */}
      {service}
      <Text
        style={[
          styles.textStyle,
          {
            color: Colors.primaryLight,
          },
        ]}>
        {name}
      </Text>
    </View>
  );
};
//make this component available to the app
export {SelectedTab};
