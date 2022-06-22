import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Tab = ({screen, icon, size = 28}) => {
  const navigation = useNavigation();
  const currentScreen =
    navigation.getState().routes[navigation.getState().index].name;
  const isScreen = currentScreen === screen;

  return (
    <>
      {isScreen ? (
        // <View style={styles.activeTab}>
        <View>
          <MaterialCommunityIcons name={icon} size={size} color="white" />
        </View>
      ) : (
        <MaterialCommunityIcons
          name={icon}
          size={size}
          color="#9c9c9c"
          onPress={() => navigation.navigate(screen)}
        />
      )}
    </>
  );
};

const BottomNavigationBar = () => {
  return (
    <View style={styles.tabContainer}>
      <Tab screen="Dashboard" icon="home" />
      <Tab screen="OutForDelivery" icon="truck-delivery" />
      <Tab screen="Collections" icon="cash-marker" />
      <Tab screen="QRScan" icon="qrcode-scan" size={23} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0b0b45',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    height: 60,
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  activeTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3c5396',
    padding: 6,
    borderRadius: 10,
  },
  activeTabText: {
    color: 'white',
    paddingLeft: 10,
  },
});

export default BottomNavigationBar;
