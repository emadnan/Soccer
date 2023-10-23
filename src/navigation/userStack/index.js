import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Favourite from '../../screens/dashboard/userSide/favourite';
import ChatScreen from '../../screens/dashboard/userSide/chatScreen';
import SearchScreen from '../../screens/dashboard/userSide/searchScreen';
import Payment from '../../screens/dashboard/userSide/payment';
import Notifications from '../../screens/dashboard/userSide/notifications';
import ProfileScreen from '../../screens/dashboard/userSide/profileScreen';
import ProfileSetting from '../../screens/dashboard/userSide/profileSetting';
import Subscription from '../../screens/dashboard/userSide/subscription';
import TermsAndConditions from '../../screens/dashboard/userSide/T&C';
import ListBuilder from '../../screens/dashboard/userSide/listBuilder';
import ResultList from '../../screens/dashboard/userSide/resultList';
import FixtureDetail from '../../screens/dashboard/userSide/fixtureDetail';
import Alerts from '../../screens/dashboard/userSide/Alerts';
import MatchStats from '../../screens/dashboard/userSide/matchStats';
import {Navigation} from './TabNaviStack';

const userStack = createStackNavigator();

function UserStack() {
  return (
    <userStack.Navigator
      screenOptions={{gestureEnabled: false}}
      headerMode="none"
      initialRouteName={'Home'}>
      <userStack.Screen name="Home" component={Navigation} />
      <userStack.Screen name="Favourite" component={Favourite} />
      {/*////Streaks */}
      <userStack.Screen name="ChatScreen" component={ChatScreen} />
      <userStack.Screen name="SearchScreen" component={SearchScreen} />
      <userStack.Screen name="Payment" component={Payment} />
      <userStack.Screen name="Notifications" component={Notifications} />
      <userStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <userStack.Screen name="ProfileSetting" component={ProfileSetting} />
      <userStack.Screen name="Subscription" component={Subscription} />
      <userStack.Screen name="ListBuilder" component={ListBuilder} />
      <userStack.Screen name="ResultList" component={ResultList} />
      <userStack.Screen name="FixtureDetail" component={FixtureDetail} />
      <userStack.Screen name="Alerts" component={Alerts} />
      <userStack.Screen name="MatchStats" component={MatchStats} />
      <userStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
    </userStack.Navigator>
  );
}
export {UserStack};
