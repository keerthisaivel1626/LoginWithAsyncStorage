

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login, Register,  ResetPassword } from './../auth/';


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
     
    >
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'Register' }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
        }}
      />
       <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: 'ResetPassword' }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;