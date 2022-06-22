import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Sample from '../views/Sample';
import Login from '../views/Login';
import Alerts from '../views/Alerts';
import Status from '../views/Status';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useLogin} from '../context/LoginProvider';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{tabBarIconStyle: {display: 'none'}}}
      tabBarOptions={{
        labelStyle: {
          fontSize: 14,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          textAlignVertical: 'center',
        },
      }}>
      <Tab.Screen name="Alerts" component={Alerts} />
      <Tab.Screen name="Status" component={Status} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const {isLoggedIn} = useLogin();
  return isLoggedIn ? <TabNavigator /> : <StackNavigator />;
};

export default Navigation;
