import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

const Profilecomponent = () => {
  const navigation = useNavigation();
  const onProfilePressed = () => {
    navigation.navigate('Profile');
  };

  const onMenuPressed = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.topbar}>
      <Icon
        name="md-menu-sharp"
        size={35}
        color="#000000"
        onPress={onMenuPressed}
      />
      <TouchableOpacity style={styles.button} onPress={onProfilePressed}>
        <Image
          style={styles.ProfilePicture}
          source={require('../../assets/profile.jpg')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    padding: 20,
    flexDirection: 'row',
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  ProfilePicture: {
    width: 50,
    height: 50,
    resizeMode: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
});
export default Profilecomponent;
