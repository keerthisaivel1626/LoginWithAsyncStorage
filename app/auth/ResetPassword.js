import React, { useState } from "react";
import { TextInput, View ,SafeAreaView,ScrollView,Text,TouchableOpacity} from 'react-native';
import { styles } from './app.style';
import { openDatabase } from 'react-native-sqlite-storage';
const ResetPassword=({navigation})=>{
  
  var db = openDatabase({ name: 'UserDatabase.db' });
  const [email, setEmail] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [reTrypassword, setReTrypassword] = useState('');
   
  let updatePassword = () => {
    console.log(email, newpassword, reTrypassword);
    if (!email) {
      alert('Please fill User id');
      return;
    }
    if (!newpassword) {
      alert('Please fill name');
      return;
    }
    if (!reTrypassword) {
      alert('Please fill Contact Number');
      return;
    }
    

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE user set  password=? where email=?',
        [newpassword, email],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Login'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
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
        <Text style={styles.inputText}>email *</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.inputBox} 
              placeholder='Type Here'
              value={email}
              onChangeText={(value) => setEmail(value)}              
            />          
          </View>
          <Text style={styles.inputText}>New Password *</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.inputBox} 
              placeholder='Type Here'
              value={newpassword}
              onChangeText={(value) => setNewpassword(value)}              
            />          
          </View>
          <Text style={styles.inputText}> Re-Type Password*</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.inputBox} 
              placeholder='Type Here'
              secureTextEntry={true} 
              value={reTrypassword}
              onChangeText={(value) => setReTrypassword(value)}              
            />            
          </View>         
          <TouchableOpacity style={styles.solidButtonStyle} onPress={() =>updatePassword() } >
            <Text style={styles.buttonText}>SUBMIT</Text>
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


export  { ResetPassword }; 