import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colorManager';
import { commonStyles, textManger } from '../utils/textStyleManager';

const ButtonComponent = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[commonStyles.centerView, styles.button]}>
      <Text style={textManger.heading_md_default}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 30,
    marginVertical:10,
  },
});

export default ButtonComponent;
