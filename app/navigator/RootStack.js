import React,{useState,useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeStack from './HomeStack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();

const RootStack = ({ loginSuccess}) => {
  const[valset,setVal]=useState(false)
  useEffect(() => {
    setTimeout(() => {setVal(true)}, 100);
  }, []);
   console.log('login',loginSuccess)
  return (
    <>
   {valset?
    <Stack.Navigator
      initialRouteName={loginSuccess ? 'HomeStack' : 'AuthStack'}
      headerShown="false"
      presentation="modal">
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>:null}
    </>
  );
}

export default RootStack;