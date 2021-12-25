import React, { useState,useEffect} from "react";
import { StyleSheet, Text, Alert, View, TextInput, Image } from "react-native";
import Button from '../components/Button';	
import {BACKEND,UPDATE_INTERVAL} from "../utils/Consts";
import AsyncStorage from '@react-native-async-storage/async-storage';
// Network: Kunio, chart, network,device
// Home: Kunio, chart,status, Network, Devices
// Chart: Kunio, chart,status, Network, Devices
// Devices: Kunio, device
const NavBar1 = ({nav,token,screen,onChangeConfig}) => {
   const [cnt,setCnt] = useState(0);
   const [runTime,setRunTime] = useState(0);
   const [waitTime,setWaitTime] = useState(0);
   const [autoMode,setAutoMode] = useState(true);
   const [isPlaying,setIsPlaying] = useState(false); // The clock is running or not
   const [isRunning,setIsRunning] = useState(true); // The machine is really running or not
   const [duration,setDuration] = useState(0);
   const [remain,setRemain] = useState(0);
   const [sensors,setSensors] = useState([]);
   const status_tab = (screen !== 'network')
   const updateConfig = async () =>{
     try {
        setCnt(cnt+1);
        fetch(BACKEND + "config", {
           method: "GET",
           headers: {
              Authorization: "Bearer "+token,
              },
           })
        .then((response) => response.json())
        .then((responseJson) => {
           if (!responseJson.success) return;
           setRunTime(responseJson.ON);
           setWaitTime(responseJson.OFF);
           setAutoMode(responseJson.mode === "AUTO");
           setIsPlaying(responseJson.run === "ON");
           setIsRunning(responseJson.counter.state === "ON");
           setDuration(responseJson.counter.duration);
           setRemain(responseJson.counter.remain);
           setSensors(responseJson.sensors);
           if (screen==='home')
              onChangeConfig(cnt,token,runTime,waitTime,
                  autoMode,isPlaying,isRunning,duration,
                  remain,sensors);
        })
        .catch((error) => {
           alert(error);
        });
     } catch (e) {}
   }
   useEffect(() => {
      const interval = setInterval(() => {
         updateConfig();
         }, UPDATE_INTERVAL);
      return () => clearInterval(interval);
   },[cnt,runTime,waitTime,autoMode,isPlaying,isRunning,duration,remain,sensors]);
   const onPauseButtonPress =() => {
      const req = isPlaying ? 'pause' : 'run';
      fetch(BACKEND+req, {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
         /*if (responseJson.success)
         {
            setIsPlaying(responseJson.run === 'ON');
         }*/
      })
      .catch((error) => {
         alert(error);
      });
   }
   const log_out = () => {
      fetch(BACKEND+'logout', {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
         
      })
      .catch((error) => {
         alert("Log out fail");
      });
      nav.navigate('Login');      
	};
   return (
	<View style={styles.nav}>
		<Text style={styles.txt1} onPress={() => nav.navigate('Home',{token:token})}> Kunio </Text>
		<Button title="Charts" size="sm" bgColor="black" textColor="white" onPress={() => nav.navigate('Chart',{token:token})}/>
     {status_tab ? <Button title={isPlaying ? 'Running' : 'Pause'} bgColor={isPlaying ? 'white' : 'black'} textColor={isPlaying ? 'black' : 'white'} onPress={() => onPauseButtonPress()}/> : null}
		<Button title="Network" size="sm" bgColor="black" textColor="white" onPress={() => nav.navigate('Network',{token:token})}/>
		<Button title="Devices" size="sm" bgColor="black" textColor="white" onPress={()=> nav.navigate('Devices',{token:token})}/>
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
export default NavBar1;