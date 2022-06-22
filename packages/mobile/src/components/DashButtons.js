import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const DashButtons = ({onPress, text, type = '1', bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.ButtonContainer,
        styles[`ButtonContainer_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};


//colors
//#C3E4F5
//#213571
//#000000
//#7E7D7D


const styles = StyleSheet.create({
    ButtonContainer_1: {
        flex: 1,
        backgroundColor: '#C3E4F5',
        borderRadius: 10,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      },

    ButtonContainer_2: {
        flex: 1,
        backgroundColor: '#213571',
        borderRadius: 10,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      },
    ButtonContainer_3: {
        flex: 1,
        backgroundColor: '#000000',
        borderRadius: 10,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      },
      ButtonContainer_4: {
        flex: 1,
        backgroundColor: '#7E7D7D',
        borderRadius: 10,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      },
      ButtonContainer_5: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      },

  text_1: {
    color: '#000000',
    fontFamily: 'SF-Pro-Displa-Bold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: "left",
    padding:15,
  },
  text_2: {
    color: '#ffffff',
    fontFamily: 'SF-Pro-Displa-Bold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: "left",
    padding:15,
  },
  text_3: {
    color: '#ffffff',
    fontFamily: 'SF-Pro-Displa-Bold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: "left",
    padding:13,
    paddingRight:5,
  },
  text_4: {
    color: '#ffffff',
    fontFamily: 'SF-Pro-Displa-Bold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: "left",
    padding:15,
  },
  text_5: {
    color: '#000000',
    fontFamily: 'SF-Pro-Displa-Bold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    paddingTop:50,
    padding:20,
  },

 
});

export default DashButtons;

