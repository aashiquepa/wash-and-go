import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../utils/colorManager';
import { textManger } from '../../utils/textStyleManager';

const PlaceholderErrorTextInput = ({
  innerPlaceHolder,
  totalHeight,
  isMultiLineText,
  errorMessage,
  setErrorMessage,
  leftPlaceHolderIcon,
  rightPlaceHolderIcon,
  inputValue,
  setInputValue,
  ref,
  nextRef,
  maxInputLength,
  keyboardType,
  returnKeyType,
  disabled = true,
  textInputType,
  outerPlaceHolder,
}) => {
  const isMultiLine = isMultiLineText ?? false;
  return (
    <View style={{marginVertical:5}}>
    {outerPlaceHolder && <Text style={[textManger.heading_sm_bold,{marginVertical:5}]}>{outerPlaceHolder}</Text>}
      <View
        style={[
          styles.placeHolderIconView,
          {
            borderColor: errorMessage
              ? colors.error
              : colors.black,
            alignItems: isMultiLine ? 'center' : 'center',
            height: totalHeight ? totalHeight : 50,
          },
        ]}>
        {leftPlaceHolderIcon}

        <TextInput
          style={[
            textManger.heading_sm,

            {
              height: totalHeight,
              color: errorMessage ? colors.error : colors.black,
              textAlignVertical: 'center',
              justifyContent: 'center',
              alignItems: isMultiLine ? 'center' : 'center',
            },
            Platform.OS === 'ios' &&
              isMultiLine && {paddingTop: totalHeight / 2.5},
            styles.flexView,
          ]}
          placeholderTextColor={colors.black}
          placeholder={innerPlaceHolder}
          value={inputValue}
          multiline={isMultiLine}
          blurOnSubmit={true}
          ref={ref}
          textAlignVertical={'center'}
          onSubmitEditing={nextRef}
          maxLength={maxInputLength}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onChangeText={value => {
            setInputValue(value);
          }}
          editable={disabled}
          textContentType={textInputType}
        />

      </View>
      {errorMessage && <Text style={textManger.error_md}>{setErrorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  flexView: {flex: 1, marginLeft: 5},
  placeHolderIconView: {
    flexDirection: 'row',
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    // marginTop: 15,
  },
});

export default PlaceholderErrorTextInput;
