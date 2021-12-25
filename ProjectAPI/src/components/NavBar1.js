import React, { useState } from "react";
import { StyleSheet, Text, Alert, View, TextInput, Image } from "react-native";
import Tab from '../components/Tab';	
import {BACKEND,UPDATE_INTERVAL} from "../utils/Consts";
import AsyncStorage from '@react-native-async-storage/async-storage';
// Network: Kunio, chart, network,device
// Home: Kunio, chart,status, Network, Devices
// Chart: Kunio, chart,status, Network, Devices
// Devices: Kunio, device
class NavBar1 extends React.Component{
   constructor(props) {
		super(props);
		this.state = {
         token: this.props.token,
         isPlaying: false, // The clock is running or not
         status_tab: (this.props.screen !== 'network'),         
		};      
      this.onPauseButtonPress=this.onPauseButtonPress.bind(this);
      this.home_btn=this.home_btn.bind(this);
      this.chart_btn=this.chart_btn.bind(this);
      this.network_btn=this.network_btn.bind(this);
      this.devices_btn=this.devices_btn.bind(this);
      this.setIsPlaying=this.setIsPlaying.bind(this);
	}
   setIsPlaying(is_playing){
      this.setState({
         isPlaying: is_playing,
      })
   }
   onPauseButtonPress()
   {
      const req = this.state.isPlaying ? 'pause' : 'run';
      fetch(BACKEND+req, {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+this.state.token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
         if (responseJson.success)
         {
         }
      })
      .catch((error) => {
         alert(error);
      });
   }
   log_out() {
      fetch(BACKEND+'logout', {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+this.state.token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
          this.props.nav.navigate('Login');      
      })
      .catch((error) => {
         Alert("Log out fail");
      });
	};
   home_btn(){
      this.props.nav.navigate('Home',{token:this.state.token});
   }
   chart_btn(){
      this.props.nav.navigate('Chart',{token:this.state.token});
   }
   network_btn(){
      this.props.nav.navigate('Network',{token:this.state.token});
   }
   devices_btn(){
      this.props.nav.navigate('Devices',{token:this.state.token});
   }
	render(){
      return (
	<View style={styles.nav}>
		<Text style={styles.txt1} onPress={() => this.home_btn()}> Kunio </Text>
		<Tab title="Charts" size="sm" bgColor="black" textColor="white" onPress={() => this.chart_btn()}/>
     {this.state.status_tab ? <Tab title={this.state.isPlaying ? 'Running' : 'Pause'} bgColor={this.state.isPlaying ? 'white' : 'black'} textColor={this.state.isPlaying ? 'black' : 'white'} onPress={this.onPauseButtonPress}/> : null}
		<Tab title="Network" size="sm" bgColor="black" textColor="white" onPress={() => this.network_btn()}/>
		<Tab title="Devices" size="sm" bgColor="black" textColor="white" onPress={()=>this.devices_btn()}/>
	</View>)};
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
export default NavBar1;