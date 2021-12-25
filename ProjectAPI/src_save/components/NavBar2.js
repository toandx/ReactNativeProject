import React, { useState } from "react";
import { StyleSheet, Text, Alert, View, TextInput, Image } from "react-native";
import Button from '../components/Button';	
import {BACKEND} from "../utils/Consts";
import AsyncStorage from '@react-native-async-storage/async-storage';
// Network: Kunio, chart, network,device
// Home: Kunio, chart,status, Network, Devices
// Chart: Kunio, chart,status, Network, Devices
// Devices: Kunio, device
class NavBar2 extends React.Component{
   constructor(props) {
		super(props);
		this.state = {
         token:this.props.token,
		};      
	}
   componentDidMount() {
   }
	render(){
      return (
	<View style={styles.nav}>
		
		<Button title="Devices" size="sm" bgColor="black" textColor="white" onPress={()=>this.props.nav.navigate('Devices',{token:this.state.token})}/>
	</View>)};
}
//<Text style={styles.txt1} onPress={() => this.props.nav.navigate('Home',{token:this.state.token})}> Kunio </Text>
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
export default NavBar2;