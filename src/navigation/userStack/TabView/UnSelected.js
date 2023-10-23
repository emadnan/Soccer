//import liraries
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {styles} from './Styles';
// create a component
const UnSelected = ({name, service}) => {
  return (
    <View style={styles.elseTab}>
      {/* <Image source={service} resizeMode="contain" style={styles.iconStyle} /> */}
      {service}
      <Text style={styles.textStyle}>{name}</Text>
    </View>
  );
};

//make this component available to the app
export {UnSelected};
