import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Sample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sample Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Sample;
