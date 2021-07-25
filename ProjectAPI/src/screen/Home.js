import React, { useState , useRef} from "react";
import { StyleSheet, Text, View, TextInput, Image, ScrollView, Platform, CheckBox, Alert } from "react-native";
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import CountdownTimer from '../components/CountdownTimer';
import MySwitch from '../components/MySwitch';
import ThermoMeter from '../components/ThermoMeter';
const BACKEND='http://192.168.0.2:2708/';
export default function HomeScreen({ navigation }) {
   const [runTime, setRunTime] = React.useState(0);
   const [autoMode,setAutoMode]= React.useState(true);
   const clock = useRef(null);
   const [waitTime, setWaitTime] = React.useState(0);
   const timer_btn = () => {
      
      /*fetch(BACKEND+'mode/timer/', {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+global.token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
         
      })
      .catch((error) => {
         Alert("Connection fail");
      });*/
      setAutoMode(false);
      clock.current.setMode(false);
	};
   const auto_btn = () => {
      
      /*fetch(BACKEND+'mode/auto/', {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+global.token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
         
      })
      .catch((error) => {
         Alert("Connection fail");
      });*/
      setAutoMode(true);
      clock.current.setMode(true);
	};
   const apply_btn = () => {
      clock.current.start(waitTime*60,runTime);
	};
   const reset_err_btn = () => {
      fetch(BACKEND+'reset_errors/', {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+global.token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
         
      })
      .catch((error) => {
         Alert("Reset error fail");
      });
	};
	return (
   <View style={styles.root}>
   <NavBar nav={navigation}/>
   <ScrollView style={styles.scroll_view}>
      <View style={{flexDirection:'row',width:'100%',justifyContent: 'space-between'}}>
         <Button title='Timer' bgColor='#909497' textColor='black' onPress={timer_btn}/>
         <Button title='Auto' bgColor='black' textColor='white' onPress={auto_btn}/>
         <Button title='Reset Error' bgColor='#F8C471' textColor='white' onPress={reset_err_btn}/>
      </View>
      <View style={styles.container}>
         <View style={{flexDirection:"row",width:'100%',margin:5}}>
            <View style={{flexDirection:"column",width:'70%'}}>
               <View style={{flexDirection:"row",width:'100%'}}>
                  <Text style={{alignSelf:'center',width:'60%'}}> Wait time (min) </Text>
                  <TextInput style={styles.text_input} onChangeText={waitTime => setWaitTime(waitTime)}/>
               </View>
               <View style={{flexDirection:"row",marginTop:5, width:'100%'}}>
                  <Text style={{alignSelf:'center',width:'60%'}}> Run time (sec) </Text>
                  <TextInput style={styles.text_input} onChangeText={runTime => setRunTime(runTime)}/>
               </View>
            </View>
            <View style={{flexDirection:'row',alignSelf:'center',marginLeft:20,alignItems:'center'}}>
               <Button title='Apply' bgColor='blue' textColor='white' onPress={apply_btn}/>
            </View>
         </View>
      </View>
      <View style={styles.container}>
         <CountdownTimer ref={clock}/>
      </View>
      <View style={styles.container}>
         <View style={{flexDirection:"column",width:'100%',margin:5}}>
               <View style={{flexDirection:"row",width:'95%'}}>
                  <Text style={{alignSelf:'center',width:'60%'}}> Kunio password: </Text>
                  <TextInput style={styles.text_input} />
               </View>
               <View style={{flexDirection:"row",marginTop:5, width:'95%'}}>
                  <Text style={{alignSelf:'center',width:'60%'}}> Logout other device: </Text>
                  <CheckBox/>
               </View>
            <View style={{alignSelf:'center',marginTop:10}}>
               <Button title='Update password' bgColor='blue' textColor='white'/>
            </View>
         </View>
      </View>
      <Text style={{fontWeight:'bold',textAlign:'center',fontSize:25,color:'black'}}> Index </Text>
      <View style={styles.grid_row}>
         <View style={{width:'48%'}}> 
            <MySwitch title='High level'/>
         </View>
         <View style={{width:'48%'}}> 
            <MySwitch title='Low level'/>
         </View>
      </View>
      <View style={styles.grid_row}>
         <View style={{width:'48%'}}> 
            <ThermoMeter />
         </View>
         <View style={{width:'48%'}} /> 
      </View>
      <View style={{alignSelf:'center',height:2,width:'40%',backgroundColor:'#CACFD2'}}/>
      <Text style={{fontWeight:'bold',textAlign:'center',fontSize:25,color:'black'}}> Events </Text>
      <View style={[styles.container,{marginBottom:10}]}>
         <Text style={{padding:10, color:'#F4D03F',fontWeight:'bold',fontSize:20}}> W20 - Water temperature out of range </Text>
         <Text style={{padding:5, color:'black',fontSize:15}}> Water temperature is in unsuitable condition [20-27oC/68-80.6oF] </Text>
      </View>
   </ScrollView>
   </View>
  );
}
 
const styles = StyleSheet.create({
	root:{
		width:'100%',
		height:'100%',
		flexDirection:"column",
	},
   scroll_view: {
		width:'100%',
		padding:10,
		flexDirection:"column",
      backgroundColor:'#F2F3F4',
		flex: 1,
	},
	grid_row: {
		width:'100%',
		flexDirection:"row",
		alignSelf: "flex-start",
		padding: 7,
		justifyContent: 'space-between',
		alignItems: 'flex-start',    
	},
   container: {
      marginTop:10,
      width:'100%',
      flexDirection:"column",
      borderRadius: 20,
      padding:5,
      backgroundColor:'white',
  },
  text_input:{
     alignSelf:'center',
     width:'40%',
     height:40,
     borderWidth:1,
     borderColor:'#BDC3C7',
     fontSize:15,
  },
});