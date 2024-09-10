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
import {LogOutText, WelcomeTexts} from '../utils/textManager';
import ButtonComponent from '../sharedcomponents/ButtonComponent';
import {useAuthStore, USER} from '../store/authStore';

const LogOut = ({navigation}) => {
  const {auth,setAuth} = useAuthStore();
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const onPress = () => {
    setAuth(USER);
  };
  return (
    <View style={commonStyles.flexView}>
      <Image
        style={{width: width, height: height * 0.3, marginTop: height * 0.2}}
        source={require('../assets/images/logo.png')}
      />
      <Text style={[textManger.heading_md_default, styles.subHeading]}>
        Welcome {auth.name}
      </Text>
      <View style={commonStyles.generalPadding}>
        <ButtonComponent title={LogOutText.heading} onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeading: {
    padding: 45,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default LogOut;
