import React, { useState,useEffect } from "react";
import {  TextInput, View ,SafeAreaView,ScrollView,Text,TouchableOpacity, Alert} from 'react-native';
import { styles } from './app.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';

const Login=({ navigation })=>{
  var db = openDatabase({ name: 'UserDatabase.db' }); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

let getData = () => {
  if (!email) {
    alert('Please fill email');
    return;
  }
  if (!password) {
    alert('Please fill password');
    return;
  }
  console.log(email, password);   
  db.transaction ((tx) => {
    tx.executeSql(
      'SELECT * FROM user where email = ?',
      [email],
      async(tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          var username=results.rows.item(0).name;
          var userEmail = results.rows.item(0).email;
          var userPassword = results.rows.item(0).password;
          console.log('dbdata from login',username,userEmail,userPassword)
        AsyncStorage.setItem('email', username)
        AsyncStorage.setItem('name', userEmail)
        AsyncStorage.setItem('password', userPassword)
        AsyncStorage.setItem('login', 'true')
        
          navigation.navigate('HomeStack')

        } else {
          Alert.alert('Warning!', 'Please Enter Valid data.')
         
        }
      }
    );
  });
 
};


  return ( 
  <SafeAreaView style={styles.screen}>  
    <View style={styles.logoContainer}>   
    </View>
    <View style={styles.scrollContainer}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.inputText}>EMAIL</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.inputBox} 
              placeholder='Type Here'
              value={email}
              onChangeText={(value) => {
                setEmail(value);
              }}
            />          
          </View>
          <Text style={styles.inputText}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.inputBox} 
              placeholder='Typ eHere'
              secureTextEntry={true}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
              }}
            />           
          </View>         
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={{ ...styles.inputText, alignSelf: 'flex-end' }}>ResetPassword</Text>
          </TouchableOpacity>         
          <TouchableOpacity style={styles.solidButtonStyle} onPress={() => getData()}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.solidButtonStyle} onPress={() => navigation.navigate('Register')} >
            <Text style={styles.buttonText}>SIGNUP</Text>
          </TouchableOpacity>        
        </View>
      </ScrollView>
    </View>
  </SafeAreaView>
   
  );
}


export  { Login};