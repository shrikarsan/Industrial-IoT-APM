import React from 'react';
import {TextInput, Button, Text, Headline} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

// TODO Fix styles

const Login = () => {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.root}>
      <Headline style={styles.text}>Login</Headline>
      <View style={styles.container}>
        <TextInput
          label="Email"
          mode="outlined"
          value={text}
          onChangeText={text => setText(text)}
          contentStyle={styles.input}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          label="Password"
          mode="outlined"
          value={text}
          onChangeText={text => setText(text)}
          contentStyle={styles.input}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => console.log('Pressed')}
        contentStyle={styles.button}>
        Press me
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
  },
  container: {
    padding: 10,
  },
  text: {
    // margin: 10,
    textAlign: 'center',
  },
  input: {
    margin: 10,
    width: '100%',
  },
  button: {
    height: 60,
  },
});

export default Login;
