import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {hp, wp} from '../../assets/dimensions';

export default function NoRecordFound() {
  return (
    <View style={styles.emptyView}>
      <Text>No Record are Found</Text>
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
