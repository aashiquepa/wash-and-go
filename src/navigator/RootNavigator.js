import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import {useAuthStore} from '../store/authStore';
import LogOut from '../screens/LogOut';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {intializing} = useAuthStore();
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

const HomeNavigator = () => {
  const {auth} = useAuthStore();
  return (
    <Stack.Navigator
      initialRouteName="welcome"
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Group>
        {!auth.name ? (
          <>
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
              name="signup"
              component={SignUp}
              options={{
                headerShown: false,
                animation: 'fade_from_bottom',
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="logout"
            component={LogOut}
            options={{
              headerShown: false,
              animation: 'fade_from_bottom',
            }}
          />
        )}
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
