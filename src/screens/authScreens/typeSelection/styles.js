import {Platform, StyleSheet} from 'react-native';
import { Colors } from '../../../assets/color';
import { hp, IOS, Size, wp } from '../../../assets/dimensions';
// import {Colors, hp, IOS, Size, wp} from '../../assets';
const ItemAlign = {
  alignItems: 'center',
  justifyContent: 'center',
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  imagestyle: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    resizeMode: 'stretch',
  },
  textjustify: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backarrowmain: {height: hp(10), justifyContent: 'center'},
  backarrow: {
    height: '40%',
    width: '20%',
    // alignItems: 'flex-start',
    top: hp(3),
    left: 20,
  },
  backarrowimage: {height: '60%', width: '60%', tintColor: 'black'},
  ChildContainer: {height: hp(100), top: Platform.OS === 'ios' ? IOS : 0},
  tyleselection: {
    flex: 0.17,
    marginHorizontal: wp(10),
    borderRadius: wp(3),
    borderColor: Colors.lightGrey,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  selctioncon: {flex: 1, marginHorizontal: wp(2),alignItems:'center'},
  Selectionchild: {flex: 1, flexDirection: 'row'},
  selectionimage: {height: '50%', width: '50%'},
  tesxtdirection: {flexDirection: 'row'},
  privacylabel: {alignSelf: 'center', fontSize: Size(1.3)},
  termstyle: {
    alignSelf: 'center',
    fontSize: Size(1.4),
    textDecorationLine: 'underline',
  },
  textdivider: {
    alignSelf: 'center',
    fontSize: Size(1.4)
  },
  buttonstyle: {
    backgroundColor: Colors.primaryLight,
    width: wp('80'),
    height: hp(6.5),
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  Overlaystyle: {
    width: wp(30),
    height: hp(15),
    ...ItemAlign,
  },
});
export {styles};
