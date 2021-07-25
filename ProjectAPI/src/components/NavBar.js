import React, { useState } from "react";
import { StyleSheet, Text, Alert, View, TextInput, Image } from "react-native";
import Button from '../components/Button';	
const BACKEND='http://192.168.0.2:2708/';
export default function NavBar({nav}){
   const log_out = () => {
      fetch(BACKEND+'logout/', {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+global.token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
         
      })
      .catch((error) => {
         Alert("Log out fail");
      });
      nav.navigate('Login');      
	};
	return (
	<View style={styles.nav}>
		<Text style={styles.txt1} onPress={() => nav.navigate('Home')}> Kunio </Text>
		<Button title="Charts" size="sm" bgColor="black" textColor="white" onPress={() => nav.navigate('Chart')}/>
		<Button title="Running" size="sm" bgColor="white" textColor="black"/>
		<Button title="Network" size="sm" bgColor="black" textColor="white" onPress={() => nav.navigate('Network')}/>
		<Button title="Log out" size="sm" bgColor="black" textColor="white" onPress={log_out}/>
	</View>);
}
const styles = StyleSheet.create({
  txt1: {
	  color:'white',
	  fontSize: 20,
	  padding:8,
  },
  nav:{
	fontSize:20,
	backgroundColor:'black',
	flexDirection: 'row',
	alignItems: "flex-start",
   justifyContent: 'space-between',
  }
});
