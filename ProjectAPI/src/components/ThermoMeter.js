import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

export default function ThermoMeter({onPress,title}){
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Image style={styles.img} source={require('../../static/temperature.png')}/>
         <Text style={styles.txt1}> Temperature </Text>
         <Text style={styles.txt2}> 330.4 </Text>
         <Text style={styles.txt3}> degree Celsius </Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
  container: {
     width:'auto',
     flexDirection:'column',
     alignItems:'center',
     padding: 5,
     justifyContent:'center',
     backgroundColor: "white",
     borderRadius: 10,
  },
  img: {
    width:100,
    height:100,
    alignSelf:'center',
  },
  txt1:
  {
     fontSize:18,
     color:'black',
     fontWeight:'bold',
  },
  txt2:
  {
     fontSize:20,
     color:'black'
  },
  txt3:
  {
     fontSize:16,
     color:'black',
  }
});
