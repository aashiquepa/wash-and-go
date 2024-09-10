import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Apple from '../assets/icons/apple.svg';
import Google from '../assets/icons/google.svg';
import Mail from '../assets/icons/mail.svg';
import Phone from '../assets/icons/phone.svg';
import ButtonComponent from '../sharedcomponents/ButtonComponent';
import PasswordTextInput from '../sharedcomponents/textinput/PasswordTextInput';
import PlaceholderErrorTextInput from '../sharedcomponents/textinput/PlaceholderErrorTextInput';
import {colors} from '../utils/colorManager';
import {validateEmail} from '../utils/helpers';
import {SignInTexts} from '../utils/textManager';
import {commonStyles, textManger} from '../utils/textStyleManager';
import axios from 'axios';
import {ENDPOINTS} from '../services/Constants';
import { useAuthStore } from '../store/authStore';

const SignIn = ({navigation}) => {
  const {setAuth} = useAuthStore();
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const [sigInDetails, setSigInDetails] = useState({
    phone: '',
    password: '',
    isSubmit: false,
    ruleErr: false,
    fiveLengthErr: false,
  });
  function checkPassword(value) {
    setSigInDetails(prev => {
      return {...prev, password: value};
    });
    setSigInDetails(prev => {
      return {...prev, fiveLengthErr: false};
    });
    setSigInDetails(prev => {
      return {...prev, ruleErr: false};
    });

    const saveValue = value ?? '';
    if (saveValue.length < 6) {
      setSigInDetails(prev => {
        return {...prev, fiveLengthErr: true};
      });
      setSigInDetails(prev => {
        return {...prev, ruleErr: false};
      });
      return;
    }
    setSigInDetails(prev => {
      return {...prev, fiveLengthErr: false};
    });

    if (!/[A-Z]/.test(saveValue)) {
      setSigInDetails(prev => {
        return {...prev, ruleErr: true};
      });
      return;
    }

    if (!/[a-z]/.test(saveValue)) {
      setSigInDetails(prev => {
        return {...prev, ruleErr: true};
      });
      return;
    }

    if (!/[0-9]/.test(saveValue)) {
      setSigInDetails(prev => {
        return {...prev, ruleErr: true};
      });
      return;
    }

    if (!/[!@#\$%\^\&*\)\(+=._-]/.test(saveValue)) {
      setSigInDetails(prev => {
        return {...prev, ruleErr: true};
      });
      return;
    }

    setSigInDetails(prev => {
      return {...prev, ruleErr: false};
    });
  }
  const onSignInPressed = () => {
    let isSubmit = false;
    if (sigInDetails.phone.length < 10) {
      setSigInDetails(prev => {
        return {...prev, isSubmit: true};
      });
      isSubmit = true;
    }
    if (sigInDetails.password.length < 6) {
      setSigInDetails(prev => {
        return {...prev, fiveLengthErr: true, ruleErr: true};
      });
      isSubmit = true;
    }

    if (isSubmit) {
      return;
    }
    signIn();
  };
  const signIn = () => {
    axios
      .post(ENDPOINTS.SIGN_IN, {
        phone: sigInDetails.phone,
        password: sigInDetails.password,
      })
      .then(response => {
        const result = response.data;

        if (!result.status) {
          Alert.alert(result.message);
          return;
        } else {
          setAuth({name: result.data.name});
        }
      })
      .catch(error => {
      });
  };
  return (
    <ScrollView>
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
            inputValue={sigInDetails.phone}
            maxInputLength={10}
            leftPlaceHolderIcon={<Phone width={15} height={15} />}
            innerPlaceHolder={SignInTexts.placeHolderNumber}
            outerPlaceHolder={SignInTexts.number}
            placeholder={SignInTexts.number}
            setErrorMessage={'Please Enter Valid Email Id!'}
            errorMessage={sigInDetails.isSubmit && !sigInDetails.phone}
            keyboardType={'phone-pad'}
            setInputValue={phone => {
              setSigInDetails(prev => {
                return {...prev, phone: phone};
              });
            }}
          />
          <PasswordTextInput
            outerPlaceHolder={SignInTexts.password}
            placeHolderText={SignInTexts.placeHolderPassword}
            setErrorMessage={'Please Enter Password'}
            ruleErr={sigInDetails.ruleErr}
            fiveLengthErr={sigInDetails.fiveLengthErr}
            setPassword={checkPassword}
            password={sigInDetails.password}
          />
          <Text style={[textManger.heading_sm_bold, styles.button]}>
            {SignInTexts.forgotPassword}
          </Text>
          <ButtonComponent
            title={SignInTexts.signIn}
            onPress={onSignInPressed}
          />
          <View style={commonStyles.centerView}>
            <View
              style={[
                //   commonStyles.flexView,
                commonStyles.row,
                styles.divderContainer,
              ]}>
              <View style={styles.line} />
              <Text style={[textManger.heading_sm]}>{SignInTexts.or}</Text>
              <View style={styles.line} />
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
                <View
                  style={[
                    {
                      justifyContent: 'space-between',
                      width: width * 0.3,
                      marginVertical: 10,
                    },
                    commonStyles.row,
                  ]}>
                  <View style={styles.icon}>
                    <Text>
                      <Google />
                    </Text>
                  </View>
                  <View style={styles.icon}>
                    <Text>
                      <Apple />
                    </Text>
                  </View>
                </View>
                <View style={commonStyles.row}>
                  <Text style={[textManger.heading_sm]}>
                    {SignInTexts.dontHaveAccount}{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('signup');
                    }}>
                    <Text
                      style={[
                        textManger.heading_sm,
                        {textDecorationLine: 'underline'},
                      ]}>
                      {SignInTexts.signUp}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={[textManger.heading_sm, styles.bylogining]}>
                  {SignInTexts.bylogining}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    </ScrollView>
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
  },
  line: {
    height: 0.5,
    backgroundColor: colors.primary,
    flex: 1,
    marginHorizontal: 10,
  },
  divderContainer: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
