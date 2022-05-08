import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Sample from '../views/Sample';
import Login from '../views/Login';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return <StackNavigator />;
};

export default Navigation;
