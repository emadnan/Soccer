import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../../assets/color';
import {wp} from '../../../assets/dimensions';
// define your styles
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: wp(5),
    top: wp(2),
  },
  iconStyle: {
    height: '65%',
    width: '65%',
    top: '10%',
  },
  textStyle: {
    fontSize: 12,
    paddingTop: 3,
  },
  elseTab: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: wp(3),
  },
});

export {styles};
