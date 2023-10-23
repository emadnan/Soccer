import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/authScreens/Login';
import Register from '../../screens/authScreens/register';
import ForgotPassword from '../../screens/authScreens/forgotPassword';
import OTP from '../../screens/authScreens/otp';
import { TypeSelection } from '../../screens/authScreens/typeSelection';

const auth = createStackNavigator();

function authStack() {
  return (
    <auth.Navigator
      screenOptions={{gestureEnabled: false}}
      headerMode="none"
      initialRouteName={'TypeSelection'}>
      <auth.Screen name="TypeSelection" component={TypeSelection} />
      <auth.Screen name="Login" component={Login} />
      <auth.Screen name="Register" component={Register} />
      <auth.Screen name="ForgotPassword" component={ForgotPassword} />
      <auth.Screen name="OTP" component={OTP} />
    </auth.Navigator>
  );
}
export {authStack};
