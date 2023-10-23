import {View, StyleSheet, Text} from 'react-native';
import React from 'react';

import {Size, hp, wp} from '../../assets/dimensions';

export default function Loader() {
  return (
    <View style={styles.emptyView}>
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyView: {
    marginTop: wp(10),
    // justifyContent: 'center',
    minHeight: hp(100),
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
