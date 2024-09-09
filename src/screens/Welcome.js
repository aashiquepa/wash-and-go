import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {colors} from '../utils/colorManager';
import {commonStyles, textManger} from '../utils/textStyleManager';
import {WelcomeTexts} from '../utils/textManager';
import ButtonComponent from '../sharedcomponents/ButtonComponent';

const Welcome = ({navigation}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const onPress = () => {
    console.log('onPress');
    navigation.navigate('signin');
  };
  return (
    <View style={commonStyles.flexView}>
      <Image
        style={{width: width, height: height * 0.6}}
        source={require('../assets/images/welcome.png')}
      />
      <Text style={[textManger.heading_md_default, styles.subHeading]}>
        {WelcomeTexts.subHeading}
      </Text>
      <View style={commonStyles.generalPadding}>
      <ButtonComponent title={WelcomeTexts.button} onPress={onPress} /></View>
      <Text style={[textManger.heading_sm, styles.subHeading]}>
        {WelcomeTexts.alreadyHaveAccount}{' '}
        <TouchableOpacity style={{marginTop: 10}}>
          <Text
            style={[{textDecorationLine: 'underline'}, textManger.heading_sm]}>
            {WelcomeTexts.signIn}
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeading: {
    color: colors.gray,
    padding: 45,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Welcome;
