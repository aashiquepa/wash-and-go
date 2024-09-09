import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from '../sharedcomponents/header/header';
import {colors} from '../utils/colorManager';
import {textManger} from '../utils/textStyleManager';
import PlaceholderErrorTextInput from '../sharedcomponents/textinput/PlaceholderErrorTextInput';
import {useEmployeeStore} from '../store/employeeStore';
import {validateEmail} from '../utils/helpers';
import {DashBoardText, ErrorText, PlaceholderText} from '../utils/textManager';

export default function AddViewEmployee({navigation, route}) {
  const {addEmployee, updateDetails} = useEmployeeStore();
  const isEdit = route.params?.details;
  const [selectedValue, setSelectedValue] = useState(
    isEdit || {
      name: '',
      department: '',
      position: '',
      email: '',
    },
  );
  const [error, setError] = useState({
    name: false,
    department: false,
    position: false,
    email: false,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const onSubmitPress = () => {
    if (
      selectedValue.name === '' ||
      selectedValue.department === '' ||
      selectedValue.position === '' ||
      !validateEmail(selectedValue.email)
    ) {
      setIsSubmit(true);
      return;
    }
    addEmployee(selectedValue);
    navigation.goBack();
  };
  const onUpdatePress = () => {
    if (
      selectedValue.name === '' ||
      selectedValue.department === '' ||
      selectedValue.position === '' ||
      !validateEmail(selectedValue.email)
    ) {
      setIsSubmit(true);
      return;
    }
    updateDetails(selectedValue);
    navigation.goBack();
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg,
    },
    button: {
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 10,
      height: 50,
      backgroundColor: colors.primary,
      width: '95%',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'baseline',
    },
  });
  return (
    <View style={styles.container}>
      <Header
        title={isEdit ? DashBoardText.editemp : DashBoardText.addemp}
        navigation={navigation}
      />
      <View style={{flex: 1, width: '100%', padding: 20}}>
        <PlaceholderErrorTextInput
        outerPlaceHolder={ DashBoardText.name}
          errorMessage={isSubmit && selectedValue.name === ''}
          innerPlaceHolder={PlaceholderText.name}
          inputValue={selectedValue.name}
          setInputValue={value =>
            setSelectedValue(prev => ({...prev, name: value}))
          }
          setErrorMessage={ErrorText.name}
        />
        <PlaceholderErrorTextInput
        outerPlaceHolder={ DashBoardText.department}
          errorMessage={isSubmit && selectedValue.department === ''}
          innerPlaceHolder={PlaceholderText.department}
          inputValue={selectedValue.department}
          setInputValue={value =>
            setSelectedValue(prev => ({...prev, department: value}))
          }
          setErrorMessage={ErrorText.department}
        />
        <PlaceholderErrorTextInput
        outerPlaceHolder={ DashBoardText.position}
          errorMessage={isSubmit && selectedValue.position === ''}
          innerPlaceHolder={PlaceholderText.position}
          inputValue={selectedValue.position}
          setInputValue={value =>
            setSelectedValue(prev => ({...prev, position: value}))
          }
          setErrorMessage={ErrorText.position}
        />
        <PlaceholderErrorTextInput
        outerPlaceHolder={ DashBoardText.email}
          errorMessage={
            isSubmit &&
            (selectedValue.email === '' || !validateEmail(selectedValue.email))
          }
          innerPlaceHolder={PlaceholderText.email}
          inputValue={selectedValue.email}
          keyboardType={'email-address'}
          setInputValue={value =>
            setSelectedValue(prev => ({...prev, email: value}))
          }
          setErrorMessage={ErrorText.email}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (isEdit) {
            onUpdatePress();
          } else {
            onSubmitPress();
          }
        }}>
        <Text style={textManger.heading_lg}>
          {isEdit ? 'Update' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
