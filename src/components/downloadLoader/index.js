import {View, StyleSheet, Text} from 'react-native';
import React from 'react';

import {Size, hp, wp} from '../../assets/dimensions';

export default function DownloadLoader() {
  return (
    <View style={styles.emptyView}>
      <Text>File is downloading...</Text>
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
