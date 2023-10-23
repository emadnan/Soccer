import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {SelectedTab, UnSelected} from './TabView';
import {Image, Platform} from 'react-native';
import {Size, hp, wp} from '../../assets/dimensions';
import {Images} from '../../assets/images';
import {Colors} from '../../assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Home from '../../screens/dashboard/userSide/homeScreen';
import {styles} from './TabView/Styles';
import ListBuilder from '../../screens/dashboard/userSide/listBuilder';
import Favourite from '../../screens/dashboard/userSide/favourite';
import ProfileScreen from '../../screens/dashboard/userSide/profileScreen';
// import Alerts from '../../screens/dashboard/userSide/Alerts';
import Statistics from '../../screens/dashboard/userSide/Statistics/index';
import AlertBuilder from '../../screens/dashboard/userSide/Alerts/Alerts';

const Tab = createBottomTabNavigator();
function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'Fixtures') {
            return focused ? (
              <SelectedTab
                service={
                  // <Ionicons
                  //   color={Colors.textBlue}
                  //   name="home"
                  //   size={Size(3)}
                  // />
                  <Image
                    source={Images.homeActive}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
                focused={focused}
              />
            ) : (
              <UnSelected
                service={
                  // <Ionicons
                  //   color={Colors.lightGrey}
                  //   name="home"
                  //   size={Size(3)}
                  // />
                  <Image
                    source={Images.homeInActive}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
              />
            );
          } else if (route.name === 'Statistics') {
            return focused ? (
              <SelectedTab
                service={
                  // <Ionicons
                  //   color={Colors.textBlue}
                  //   name="home"
                  //   size={Size(3)}
                  // />
                  <Image
                    source={Images.chartActive}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
                focused={focused}
              />
            ) : (
              <UnSelected
                service={
                  // <Ionicons
                  //   color={Colors.lightGrey}
                  //   name="home"
                  //   size={Size(3)}
                  // />
                  <Image
                    source={Images.chart}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
              />
            );
          } else if (route.name === 'ListBuilder') {
            return focused ? (
              <SelectedTab
                service={
                  <Image
                    source={Images.listBuilderActive}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
                focused={focused}
              />
            ) : (
              <UnSelected
                service={
                  <Image
                    source={Images.listBuilder}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
              />
            );
          } else if (route.name === 'Streaks') {
            return focused ? (
              <SelectedTab
                service={
                  <Image
                    source={Images.streaksActive}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
                focused={focused}
              />
            ) : (
              <UnSelected
                service={
                  <Image
                    source={Images.streaks}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
              />
            );
          } else if (route.name === 'Profile') {
            return focused ? (
              <SelectedTab
                service={
                  <Image
                    source={Images.profileActive}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
                focused={focused}
              />
            ) : (
              <UnSelected
                service={
                  <Image
                    source={Images.profile}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
              />
            );
          } else if (route.name === 'ChatScreen') {
            return focused ? (
              <SelectedTab
                service={
                  <Ionicons
                    color={Colors.selectedBrown}
                    name="chatbubbles"
                    size={Size(3)}
                  />
                }
                focused={focused}
              />
            ) : (
              <UnSelected
                service={
                  <Ionicons
                    color={Colors.lightGrey}
                    name="chatbubbles"
                    size={Size(3)}
                  />
                }
              />
            );
          } else if (route.name === 'Alerts') {
            return focused ? (
              <SelectedTab
                service={
                  <Image
                    source={Images.alertsActive}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
                focused={focused}
              />
            ) : (
              <UnSelected
                service={
                  <Image
                    source={Images.alerts}
                    resizeMode="contain"
                    style={styles.iconStyle}
                  />
                }
              />
            );
          } else if (route.name === 'Notifications') {
            return focused ? (
              <SelectedTab
                service={
                  <Ionicons
                    color={Colors.selectedBrown}
                    name="settings-sharp"
                    size={Size(3)}
                  />
                }
                focused={focused}
              />
            ) : (
              <UnSelected
                service={
                  <Ionicons
                    color={Colors.lightGrey}
                    name="settings-sharp"
                    size={Size(3)}
                  />
                }
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.textBlue,
        inactiveTintColor: 'gray',
        showLabel: true,
        tabStyle: {
          height: '100%',
        },

        style: {
          height: Platform.OS === 'ios' ? hp(10) : hp(7),
          borderTopLeftRadius: wp(10),
          borderTopRightRadius: wp(10),
          overflow: 'hidden',
          paddingHorizontal: wp(5),
          // backgroundColor: Colors.white,
        },
      }}
      initialRouteName={'Fixtures'}>
      <Tab.Screen name="Fixtures" component={Home} />
      <Tab.Screen name="ListBuilder" component={ListBuilder} />
      <Tab.Screen name="Statistics" component={Statistics} />
      <Tab.Screen name="Streaks" component={Favourite} />
      <Tab.Screen name="Alerts" component={AlertBuilder} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
export {Navigation};
