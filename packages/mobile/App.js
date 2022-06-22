/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import LoginProvider from './src/context/LoginProvider';

import Navigation from './src/navigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <LoginProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </LoginProvider>
    </PaperProvider>
  );
};

export default App;
