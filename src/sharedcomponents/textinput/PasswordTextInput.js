import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PasswordEye from '../../assets/icons/eye-cross.svg';
import PasswordEyeOff from '../../assets/icons/eye.svg';
import PadLock from '../../assets/icons/lock.svg';
import { colors } from '../../utils/colorManager';
import { textManger } from '../../utils/textStyleManager';

const PasswordTextInput = ({
  password,
  reference,
  setPassword,
  fiveLengthErr,
  ruleErr,
  placeHolderText,
  setErrorMessage,
  outerPlaceHolder,
}) => {
  const [passwordVisibility, setPasswordVisibility] = React.useState(true);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const fiveLengthText = 'Password must be at least 6 characters.';
  const ruleErrorText =
    'Password must contain lowercase, uppercase, numbers and atleast one special character.';

  const isSecure = passwordVisibility;

  return (
    <>
    <View style={{marginVertical:5}}>
    {outerPlaceHolder && <Text style={textManger.heading_sm}>{outerPlaceHolder}</Text>}
      <View
        style={[
          styles.placeHolderIconView,
          {
            borderColor:
              fiveLengthErr || ruleErr
                ? colors.black
                : colors.black,
          },
        ]}>
        <PadLock />
        <TextInput
          style={[
            textManger.heading_sm,

            {
              color:
                fiveLengthErr || ruleErr
                  ? colors.error
                : colors.dark,
            },
            styles.flexView,
          ]}
          placeholderTextColor={colors.black}
          placeholder={placeHolderText}
          value={password}
          ref={reference}
          maxLength={20}
          returnKeyType={'done'}
          onChangeText={setPassword}
          secureTextEntry={isSecure}
          textContentType={'newPassword'}
        />
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={handlePasswordVisibility}>
          {passwordVisibility ? (
            <PasswordEyeOff width={24} />
          ) : (
            <PasswordEye width={24} />
          )}
        </TouchableOpacity>
      </View>

      {fiveLengthErr && (
        <Text style={textManger.heading_sm}>{fiveLengthText}</Text>
      )}
      {ruleErr && <Text style={textManger.heading_sm}>{ruleErrorText}</Text>}
      {setErrorMessage && (
        <Text style={textManger.heading_sm}>{setErrorMessage}</Text>
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  flexView: {flex: 1, marginLeft: 5},
  placeHolderIconView: {
    flexDirection: 'row',
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 0.5,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default PasswordTextInput;
