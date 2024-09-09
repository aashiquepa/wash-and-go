import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import AddViewEmployee from '../screens/AddViewEmployee';
import Home from '../screens/Dashboard';
import { useEmployeeStore } from '../store/employeeStore';
import SearchEmployee from '../screens/SearchEmployees';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import SignIn from '../screens/SignIn';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {intializing} = useEmployeeStore();
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="welcome"
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Group>
      <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="signin"
          component={SignIn}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="addEmployee"
          component={AddViewEmployee}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="searchEmployee"
          component={SearchEmployee}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  flexView: {
    height: '100%',
    backgroundColor: 'white',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default RootNavigator;
