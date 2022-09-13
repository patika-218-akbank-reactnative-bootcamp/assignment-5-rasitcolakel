import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '@src/screens/auth/SignIn';
import SignUp from '@src/screens/auth/SignUp';
import React from 'react';

export type AuthStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<AuthStackParamsList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Sign Up',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
