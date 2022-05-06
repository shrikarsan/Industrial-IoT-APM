import React from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Sample from '../views/Sample';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Sample} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return <StackNavigator />;
};

export default Navigation;
