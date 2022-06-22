import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Sample from '../views/Sample';
import Login from '../views/Login';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useLogin} from '../context/LoginProvider';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Sample} />
      <Tab.Screen name="Settings" component={Sample} />
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
