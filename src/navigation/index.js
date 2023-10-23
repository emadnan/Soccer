import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/preAuthScreens/splash';
import {authStack} from './authStack';
import {UserStack} from './userStack';
const Stack = createStackNavigator();

function MainNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{gestureEnabled: false}}
        headerMode="none"
        initialRouteName={'Splash'}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Auth" component={authStack} />
        <Stack.Screen name="UserStack" component={UserStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export {MainNavigator};
