import React, { useEffect, useState } from 'react';

import RootStack from './navigator/RootStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';


function App() {
  const[login,setLogin]=useState(false)
 
  useEffect(() => {
    const init = async () => {
      const islogin=await AsyncStorage.getItem('login',(error, result) => {
        if(error) console.error('Something went wrong!');
        else if(result) console.log('Getting key was successfull', result);
        else if(result === null) console.log('Key does not exists!');
      });
     setLogin( islogin )
     console.log('asyns',islogin)
    };

    init().finally(async () => {
    });
  }, []);
  return (
    <NavigationContainer>

    <RootStack loginSuccess={login}/>
    </NavigationContainer>
   
  );
}

export default App;
