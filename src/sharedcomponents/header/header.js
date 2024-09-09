import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Back from '../../assets/icons/back.svg';
import {textManger} from '../../utils/textStyleManager';
import {colors} from '../../utils/colorManager';

export default function Header({title, isBackActive = true, navigation}) {
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      padding: 10,
      justifyContent: isBackActive ? 'flex-start' : 'center',
      height: 50,
      width: '100%',
    },
    button: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 5,
    },
  });
  return (
    <View style={styles.header}>
      {isBackActive && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back margin={10} />
        </TouchableOpacity>
      )}
      <Text style={textManger.heading_lg}>{title}</Text>
    </View>
  );
}
