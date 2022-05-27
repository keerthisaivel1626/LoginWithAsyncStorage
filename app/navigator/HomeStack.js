
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import   Home from '../home/Home';



const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
     
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
      />
      
     
    </Stack.Navigator>
  );
}

export default HomeStack;
