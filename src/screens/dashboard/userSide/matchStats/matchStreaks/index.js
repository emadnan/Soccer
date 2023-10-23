import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Size, wp, hp} from '../../../../../assets/dimensions';
import {Colors} from '../../../../../assets/color';
import {Images} from '../../../../../assets/images';

export default function MatchStreaks(props) {
  console.log('props: ', props.streaksData);

  const {
    0: {label: label1, number: number1, para: para1},
    1: {label: label2, number: number2, para: para2},
    2: {label: label3, number: number3, para: para3},
  } = props.streaksData;

  console.log('label: ', label1);
  return (
    <View style={styles.windowContainer}>
      <View style={styles.itemView}>
        <Image
          source={{uri: props.streaksData.logo}}
          resizeMode="contain"
          style={styles.teamLogo}
        />
        <Text style={styles.teamName}>{props.streaksData.name}</Text>
      </View>
      <View style={styles.itemView}>
        <Text style={{...styles.teamName, ...styles.numbers}}>{number1}</Text>
        <View>
          <Text style={{...styles.teamName, alignSelf: 'auto'}}>{label1}</Text>
          <Text
            style={{
              ...styles.teamName,
              alignSelf: 'auto',
            }}>
            {para1}
          </Text>
        </View>
      </View>
      <View style={styles.itemView}>
        <Text style={{...styles.teamName, ...styles.numbers}}>{number2}</Text>
        <View>
          <Text style={{...styles.teamName, alignSelf: 'auto'}}>{label2}</Text>
          <Text
            style={{
              ...styles.teamName,
              alignSelf: 'auto',
            }}>
            {para2}
          </Text>
        </View>
      </View>
      <View style={styles.itemView}>
        <Text style={{...styles.teamName, ...styles.numbers}}>{number3}</Text>
        <View>
          <Text style={{...styles.teamName, alignSelf: 'auto'}}>{label3}</Text>
          <Text
            style={{
              ...styles.teamName,
              alignSelf: 'auto',
            }}>
            {para3}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  windowContainer: {
    width: wp(90),
    alignSelf: 'center',
    marginVertical: wp(2),
    backgroundColor: Colors.white,
    borderRadius: 10,
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
  teamLogo: {
    width: wp(10),
    height: wp(10),
  },
  itemView: {
    borderBottomWidth: 0.2,
    padding: wp(2),
    flexDirection: 'row',
  },
  teamName: {
    alignSelf: 'center',
    marginLeft: wp(2),
    fontSize: Size(1.6),
    color: Colors.grey,
  },
  numbers: {
    fontSize: Size(3.8),
    marginRight: wp(2),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
