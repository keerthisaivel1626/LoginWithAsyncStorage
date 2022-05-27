import React, { useState,useEffect } from "react";
import { TextInput, View ,SafeAreaView,ScrollView,Text,TouchableOpacity,Alert} from 'react-native';
import { styles } from './app.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';
const Register=({navigation})=>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
var db = openDatabase({ name: 'UserDatabase.db' });
        

useEffect(() => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS user', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS user(name VARCHAR(100), email VARCHAR(100) PRIMARY KEY, password VARCHAR(100))',
            []
          );
        }
      }
    );
  });
}, []);

const isValiEmail = (email) => {
  console.log('email', email);
  if (email) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEmail.test(email)) {
      console.log('email check');
      return email;
    } else {
      return console.log('Invalid Email Address');
    }
  } else {
    return console.log('Invalid Email Address');
  }
};
  


const setData =  () => {
  console.log(name, email, password);

  if (!name) {
    alert('Please fill name');
    return;
  }
  if (!email) {
    alert('Please fill email');
    return;
  }
  if (!password) {
    alert('Please fill password');
    return;
  }
  if (isValiEmail(email)) {
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO user (name, email, password) VALUES (?,?,?)',
      [name, email, password],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'You are Registered Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('HomeStack'),
              },
            ],
            { cancelable: false }
          );
        } else alert('Registration Failed');
      }
    );
  }); AsyncStorage.setItem('email', email);
 
  AsyncStorage.setItem('name', name);
  AsyncStorage.setItem('password', password);
  AsyncStorage.setItem('login', 'true');
}else{
  alert('Invalid Email Address');

}
 
};
        return(
    <SafeAreaView style={styles.screen}>  
    <View style={styles.logoContainer}>   
    </View>
    <View style={styles.scrollContainer}>
      <ScrollView>
        <View style={styles.box}>
        <Text style={styles.inputText}>NAME</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.inputBox} 
              placeholder='Type Here'
              value={name}
              onChangeText={(value) => {
                setName(value);
              }}
            />          
          </View>
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
              placeholder='Type Here'
              secureTextEntry={true}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
              }}
            />           
          </View>
          <TouchableOpacity style={styles.solidButtonStyle}  onPress={() => {setData()}} >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.solidButtonStyle} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Back To LOGIN</Text>
          </TouchableOpacity>
        
         
        </View>
      </ScrollView>
    </View>
  </SafeAreaView>
   
  );
}


export  { Register };