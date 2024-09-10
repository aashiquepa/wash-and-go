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
import {commonStyles, textManger} from '../utils/textStyleManager';
import {SignInTexts, SignUpTexts, WelcomeTexts} from '../utils/textManager';
import {colors} from '../utils/colorManager';
import Mail from '../assets/icons/mail.svg';
import Phone from '../assets/icons/phone.svg';
import User from '../assets/icons/user.svg';
import Apple from '../assets/icons/apple.svg';
import Google from '../assets/icons/google.svg';
import PlaceholderErrorTextInput from '../sharedcomponents/textinput/PlaceholderErrorTextInput';
import PasswordTextInput from '../sharedcomponents/textinput/PasswordTextInput';
import ButtonComponent from '../sharedcomponents/ButtonComponent';
import CheckBox from '@react-native-community/checkbox';
import {validateEmail} from '../utils/helpers';
import {useAxiosPrivate} from '../hooks/useAxios';
import axios from 'axios';
import {ENDPOINTS} from '../services/Constants';
import {useAuthStore} from '../store/authStore';

const SignUp = ({navigation}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const {setAuth} = useAuthStore();
  const [signUpDetails, setSignUpDetails] = useState({
    name: '',
    phone: '',
    password: '',
    ischecked: false,
    isSubmit: false,
    ruleErr: false,
    fiveLengthErr: false,
    isPasswordMatch: false,
  });
  const onSignUpPressed = () => {
    let isSubmit = false;
    if (signUpDetails.name.length < 1) {
      setSignUpDetails(prev => {
        return {...prev, isSubmit: true};
      });
      isSubmit = true;
    }
    if (signUpDetails.phone.length < 10) {
      setSignUpDetails(prev => {
        return {...prev, isSubmit: true};
      });
      isSubmit = true;
    }
    if (signUpDetails.password.length < 6) {
      setSignUpDetails(prev => {
        return {...prev, fiveLengthErr: true, ruleErr: true};
      });
      isSubmit = true;
    }
    if (signUpDetails.ischecked == false) {
      setSignUpDetails(prev => {
        return {...prev, isSubmit: true};
      });
      isSubmit = true;
    }

    if (isSubmit) {
      return;
    }
    signUp();
  };
  function checkPassword(value) {
    setSignUpDetails(prev => {
      return {...prev, password: value};
    });
    setSignUpDetails(prev => {
      return {...prev, fiveLengthErr: false};
    });
    setSignUpDetails(prev => {
      return {...prev, ruleErr: false};
    });

    const saveValue = value ?? '';
    if (saveValue.length < 6) {
      setSignUpDetails(prev => {
        return {...prev, fiveLengthErr: true};
      });
      setSignUpDetails(prev => {
        return {...prev, ruleErr: false};
      });
      return;
    }
    setSignUpDetails(prev => {
      return {...prev, fiveLengthErr: false};
    });

    if (!/[A-Z]/.test(saveValue)) {
      setSignUpDetails(prev => {
        return {...prev, ruleErr: true};
      });
      return;
    }

    if (!/[a-z]/.test(saveValue)) {
      setSignUpDetails(prev => {
        return {...prev, ruleErr: true};
      });
      return;
    }

    if (!/[0-9]/.test(saveValue)) {
      setSignUpDetails(prev => {
        return {...prev, ruleErr: true};
      });
      return;
    }

    if (!/[!@#\$%\^\&*\)\(+=._-]/.test(saveValue)) {
      setSignUpDetails(prev => {
        return {...prev, ruleErr: true};
      });
      return;
    }

    setSignUpDetails(prev => {
      return {...prev, ruleErr: false};
    });
  }
  const signUp = () => {
    axios
      .post(ENDPOINTS.SIGNUP, {
        phone: signUpDetails.phone,
        password: signUpDetails.password,
        name: signUpDetails.name,
      })
      .then(response => {
        const result = response.data.data;
        if (result.name) {
          setAuth({name: result.name});
        }
        else{
          Alert.alert(result.message);
        }
      })
      .catch(error => {
        Alert.alert(error);
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
          <Text style={textManger.heading_lg}>{SignUpTexts.heading}</Text>
          <Text style={[textManger.heading_md, styles.subHeading]}>
            {SignUpTexts.subHeading}
          </Text>
          <PlaceholderErrorTextInput
            inputValue={signUpDetails.name}
            leftPlaceHolderIcon={<User />}
            innerPlaceHolder={SignInTexts.placeHolderName}
            outerPlaceHolder={SignInTexts.name}
            placeholder={SignInTexts.email}
            setErrorMessage={'Please Enter Your Name'}
            errorMessage={
              signUpDetails.isSubmit && signUpDetails.name.length < 1
            }
            setInputValue={name => {
              setSignUpDetails(prev => {
                return {...prev, name: name};
              });
            }}
          />
          <PlaceholderErrorTextInput
            inputValue={signUpDetails.phone}
            maxInputLength={10}
            leftPlaceHolderIcon={<Phone width={15} height={15} />}
            innerPlaceHolder={SignInTexts.placeHolderNumber}
            outerPlaceHolder={SignInTexts.number}
            placeholder={SignInTexts.email}
            setErrorMessage={'Please Enter Phone Number'}
            keyboardType={'numeric'}
            errorMessage={signUpDetails.isSubmit && signUpDetails.phone < 10}
            setInputValue={phone => {
              setSignUpDetails(prev => {
                return {...prev, phone: phone};
              });
            }}
          />
          <PasswordTextInput
            outerPlaceHolder={SignInTexts.password}
            placeHolderText={SignInTexts.placeHolderPassword}
            setErrorMessage={'Please Enter Password'}
            ruleErr={signUpDetails.ruleErr}
            fiveLengthErr={signUpDetails.fiveLengthErr}
            setPassword={checkPassword}
            password={signUpDetails.password}
          />

          <View style={[commonStyles.row, {alignItems: 'center'}]}>
            <CheckBox
              onChange={() => {
                setSignUpDetails(prev => {
                  return {...prev, ischecked: !prev.ischecked};
                });
              }}
              value={signUpDetails.ischecked}
              onCheckColor={colors.black}
              tintColors={colors.black}
              style={{padding: 10}}
            />
            <Text style={[textManger.heading_sm_bold]}>
              {SignUpTexts.acceptTerms1}{' '}
            </Text>
            <Text
              style={[
                textManger.heading_sm,
                {textDecorationLine: 'underline'},
              ]}>
              {SignUpTexts.acceptTerms2}
            </Text>
          </View>
          {signUpDetails.isSubmit && !signUpDetails.ischecked && (
            <Text style={[textManger.heading_sm, {color: colors.error}]}>
              Please accept the Terms and Conditions
            </Text>
          )}

          <ButtonComponent
            title={SignUpTexts.heading}
            onPress={onSignUpPressed}
          />
          <View style={commonStyles.centerView}>
            <ImageBackground
              source={require('../assets/images/footerSignup.png')}
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
                <View style={commonStyles.row}>
                  <Text style={[textManger.heading_sm]}>
                    {WelcomeTexts.alreadyHaveAccount}{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('signin');
                    }}>
                    <Text
                      style={[
                        textManger.heading_sm,
                        {textDecorationLine: 'underline'},
                      ]}>
                      {SignUpTexts.signIn}
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
    width: 280,
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
});

export default SignUp;
