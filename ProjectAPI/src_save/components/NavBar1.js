import React, { useState } from "react";
import { StyleSheet, Text, Alert, View, TextInput, Image } from "react-native";
import Button from '../components/Button';	
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
         cnt:0,
         token: this.props.token,
         runTime: 0,
         waitTime: 0,
         autoMode: true,
         isPlaying: false, // The clock is running or not
         isRunning: true, // The machine is really running or not
         duration: 0,
         remain: 0,
         sensors: [],
         status_tab: (this.props.screen !== 'network'),         
		};      
      this.onPauseButtonPress=this.onPauseButtonPress.bind(this);
      this.log_out=this.log_out.bind(this);
      this.updateConfig=this.updateConfig.bind(this);
	}
   async updateConfig(){
     try {
        //const value = await AsyncStorage.getItem("token");
        //this.setState({token: value,cnt:this.state.cnt+1});
        this.setState({cnt: this.state.cnt+1});
        fetch(BACKEND + "config", {
           method: "GET",
           headers: {
              Authorization: "Bearer "+this.state.token,
              },
           })
        .then((response) => response.json())
        .then((responseJson) => {
           if (!responseJson.success) return;
           this.setState({
              runTime: responseJson.ON,
              waitTime: responseJson.OFF,
              autoMode: responseJson.mode === "AUTO",
              isPlaying: responseJson.run === "ON",
              isRunning: responseJson.counter.state === "ON",
              duration: responseJson.counter.duration,
              remain: responseJson.counter.remain,
              sensors: responseJson.sensors,
              });
           //alert(responseJson.counter.state);
           if (this.props.screen==='home') 
              this.props.onChangeConfig(this.state.cnt,this.state.token,this.state.runTime,this.state.waitTime,
                  this.state.autoMode,this.state.isPlaying,this.state.isRunning,this.state.duration,
                  this.state.remain,this.state.sensors);
        })
        .catch((error) => {
           alert(error);
        });
     } catch (e) {}
   }
   componentDidMount() {
      this.interval = setInterval(() => {
         this.updateConfig();
      }, UPDATE_INTERVAL)
   }
   componentWillUnmount() {
      clearInterval(this.interval);
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
            this.setState({running: (responseJson.run === 'ON')});
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
         
      })
      .catch((error) => {
         Alert("Log out fail");
      });
      this.props.nav.navigate('Login');      
	};
	render(){
      return (
	<View style={styles.nav}>
		<Text style={styles.txt1} onPress={() => this.props.nav.navigate('Home',{token:this.state.token})}> Kunio </Text>
		<Button title="Charts" size="sm" bgColor="black" textColor="white" onPress={() => this.props.nav.navigate('Chart',{token:this.state.token})}/>
     {this.state.status_tab ? <Button title={this.state.isPlaying ? 'Running' : 'Pause'} bgColor={this.state.isPlaying ? 'white' : 'black'} textColor={this.state.isPlaying ? 'black' : 'white'} onPress={this.onPauseButtonPress}/> : null}
		<Button title="Network" size="sm" bgColor="black" textColor="white" onPress={() => this.props.nav.navigate('Network',{token:this.state.token})}/>
		<Button title="Devices" size="sm" bgColor="black" textColor="white" onPress={()=>this.props.nav.navigate('Devices',{token:this.state.token})}/>
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