import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {commonStyles, textManger} from '../utils/textStyleManager';
import {SignInTexts} from '../utils/textManager';
import {colors} from '../utils/colorManager';
import Mail from '../assets/icons/mail.svg';
import Apple from '../assets/icons/apple.svg';
import Google from '../assets/icons/google.svg';
import PlaceholderErrorTextInput from '../sharedcomponents/textinput/PlaceholderErrorTextInput';
import PasswordTextInput from '../sharedcomponents/textinput/PasswordTextInput';
import ButtonComponent from '../sharedcomponents/ButtonComponent';

const SignIn = () => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  return (
    <View style={[commonStyles.flexView]}>
      <View style={[commonStyles.centerView, {marginTop: 20}]}>
        <Image
          style={[
            {width: width * 0.7, height: height * 0.2},
            commonStyles.centerView,
          ]}
          source={require('../assets/images/logo.png')}
        />
      </View>
      <View style={commonStyles.generalPadding}>
        <Text style={textManger.heading_lg}>{SignInTexts.heading}</Text>
        <Text style={[textManger.heading_md, styles.subHeading]}>
          {SignInTexts.comeBack}
        </Text>
        <PlaceholderErrorTextInput
          leftPlaceHolderIcon={<Mail />}
          innerPlaceHolder={SignInTexts.placeHolderEmail}
          outerPlaceHolder={SignInTexts.email}
          placeholder={SignInTexts.email}
        />
        <PasswordTextInput
          outerPlaceHolder={SignInTexts.password}
          placeHolderText={SignInTexts.placeHolderPassword}
        />
        <Text style={[textManger.heading_sm_bold, styles.button]}>
          {SignInTexts.forgotPassword}
        </Text>
        <ButtonComponent title={SignInTexts.signIn} onPress={() => {}} />
        <View style={commonStyles.centerView}>
          <View
            style={[
              //   commonStyles.flexView,
              commonStyles.row,
              {
                marginTop: 10,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <View
              style={{
                height: 0.5,
                backgroundColor: colors.primary,
                flex: 1,
                marginHorizontal: 10,
              }}
            />
            <Text style={[textManger.heading_sm]}>{SignInTexts.or}</Text>
            <View
              style={{
                height: 0.5,
                backgroundColor: colors.primary,
                flex: 1,
                marginHorizontal: 10,
              }}
            />
          </View>
          <ImageBackground
            source={require('../assets/images/footerbg.png')}
            resizeMode="cover"
            style={{
              width: width,
              height: height * 0.2,
            }}>
            <View
              style={[
                commonStyles.centerView,
                {padding: commonStyles.generalPadding},
              ]}>
              <View style={[{justifyContent: 'space-between',width:width*0.3,marginVertical:10}, commonStyles.row]}>
                <View
                  style={styles.icon}>
                  <Text>
                    <Google />
                  </Text>
                </View>
                <View
                  style={styles.icon}>
                  <Text>
                  <Apple />
                  </Text>
                </View>

              </View>
              <Text style={[textManger.heading_sm]}>
                {SignInTexts.dontHaveAccount}{' '}
                <Text style={[textManger.heading_sm, styles.button]}>
                  {SignInTexts.signUp}
                </Text>
              </Text>
              <Text style={[textManger.heading_sm, styles.bylogining]}>
                {SignInTexts.bylogining}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeading: {
    color: colors.gray,
    width: 200,
  },
  button: {
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
  bylogining: {
    color: colors.gray,
    textAlign: 'center',
    marginTop: 10,
    width: '85%',
  },
  icon: {
    height: 45,
    width: 45,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
  }
});

export default SignIn;
