import  React,{useEffect,useState} from 'react';
import { Text, View,TouchableOpacity,FlatList,Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemName = ({ title }) => (

  
  <View style={{ backgroundColor: '#f9c2ff',
    padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,}}>
    <Text >{title.name}</Text>
    <FlatList
        data={title.image}
        renderItem={renderimageItem}
        keyExtractor={item => item.label}
      />
   
  </View>
);
const renderimageItem = ({ item }) => ( 
   <Itemimage title={item} />  
 );
const Itemimage = ({ title }) => (
  
  
  <View style={{ backgroundColor: '#f9c2ff',
  padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,}}>
   
    <Image source={{uri:title.label}} style={{
      width:160,
      height:100,
      borderWidth:2,
      borderColor:'#d35647',
      resizeMode:'contain',
      margin:8
    }}></Image>
   
  </View>
);
function MovieScreen() {
  const[movieData,setMovieData]=useState({});
  const renderItem = ({ item }) => (
   
   <>
    <ItemName title={item} />
   
    </>
    
  );
 
  const getData=()=>{
    fetch('https://itunes.apple.com/in/rss/topalbums/limit=25/json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        //console.log('response',response)
        return response.json();
      })
      .then(function(myJson) {
        const data = myJson.feed.entry.map(function(item) {      
          return {            
            name: item['im:name'].label,
            image:item['im:image']
          };
        }); 
        
        setMovieData(data)     
       
      });
  }
  useEffect(()=>{
    getData()
  },[])
//console.log('---->movieData',movieData);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <FlatList
        data={movieData}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    
    </View>
  );
}

function ProfileScreen() {
  const [valName, setValName] = useState('');
  
  const [valPassword, setValPassword] = useState('');
  const[valemail,setValEmail]=useState('');
  //var db = openDatabase({ name: 'UserDatabase.db' });

  
  
  useEffect(() => {
    AsyncStorage.getItem('email',(error, result) => {
      if(error) console.error('Something went wrong!');
      else if(result) {
        console.log('Getting email was successfull', result);
        setValEmail(result);
      }
      else if(result === null) console.log('email does not exists!');
    });
    AsyncStorage.getItem('name',(error, result) => {
      if(error) console.error('Something went wrong!');
      else if(result) {
        console.log('Getting name was successfull', result);
        setValName(result);
      }
      else if(result === null) console.log('name does not exists!');
    });
    AsyncStorage.getItem('password',(error, result) => {
      if(error) console.error('Something went wrong!');
      else if(result) {
        console.log('Getting password was successfull', result);
        setValPassword(result);
      }
      else if(result === null) console.log('password does not exists!');
    });

}, []);

console.log('email',valemail,valName,valPassword); 


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{valName}</Text>
      <Text>{valemail}</Text>
      <Text>{valPassword}</Text>
     
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Home({navigation}) {
  
  return (<>
          <TouchableOpacity  onPress={() => navigation.navigate('AuthStack')}>
          <Text style={{alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    }}>logout</Text>
          </TouchableOpacity>
      <Tab.Navigator>
        <Tab.Screen name="MovieScreen" component={MovieScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
      </>
    
  );
}