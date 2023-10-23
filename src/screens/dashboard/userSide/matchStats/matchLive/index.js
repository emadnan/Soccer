import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderStats from '../headerStats';
import {Size, wp} from '../../../../../assets/dimensions';
import {Colors} from '../../../../../assets/color';
import axios from 'axios';
import moment from 'moment';

const LiveHeader = ({matchData}) => {
  if (
    !matchData.result ||
    !Array.isArray(matchData.result) ||
    matchData.result.length === 0
  ) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading.....</Text>
      </View>
    );
  }

  const matchResult = matchData.result[0];

  const {championship, timer, date, teamA, teamB} = matchResult;

  const formattedDate = moment(date).format('D MMMM YYYY');
  const startTime = moment(date).format('h:mm A');

  return (
    <>
      <View style={styles.headerView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.2,
            marginVertical: wp(2),
          }}>
          <Text style={styles.titleLeft}>{formattedDate}</Text>
          <Text
            style={[styles.innerContent]}>{`STARTED AT: ${startTime}`}</Text>
          <Text style={styles.minutes}>{timer}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: wp(2),
            paddingHorizontal: wp(2),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: teamA.logo}}
              resizeMode="contain"
              style={styles.teamLogo}
            />
            <Text style={{...styles.titleLeft, marginLeft: wp(2)}}>
              {teamA.name}
            </Text>
          </View>
          <Text style={{...styles.minutes, color: Colors.black}}>
            {teamA.score.f}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: wp(2),
            paddingHorizontal: wp(2),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: teamB.logo}}
              resizeMode="contain"
              style={styles.teamLogo}
            />
            <Text style={{...styles.titleLeft, marginLeft: wp(2)}}>
              {teamB.name}
            </Text>
          </View>
          <Text style={{...styles.minutes, color: Colors.black}}>
            {teamB.score.f}
          </Text>
        </View>

        <Text style={styles.country}>{championship.name}</Text>
      </View>
    </>
  );
};

export default function MatchLive({matchData}) {
  return (
    <ScrollView>
      <LiveHeader matchData={matchData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleLeft: {
    fontSize: Size(1.6),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  innerContent: {
    fontSize: Size(1.4),
    color: Colors.grey,
    fontWeight: '400',
    marginLeft: wp(-2),
    alignSelf: 'center',
  },
  minutes: {
    color: Colors.textRed,
    fontSize: Size(2),
    fontWeight: 'bold',
  },
  headerView: {
    marginHorizontal: wp(5),
    paddingHorizontal: wp(2),
    marginVertical: wp(2),
    borderRadius: 10,
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
  teamLogo: {
    width: wp(10),
    height: wp(10),
  },
  country: {
    padding: wp(2),
    marginBottom: wp(2),
    borderWidth: 0.4,
    borderColor: Colors.grey,
    borderRadius: 10,
    color: Colors.black,
    alignSelf: 'center',
  },
});
