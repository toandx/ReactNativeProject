import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

export default function MySwitch({onPress,title}){
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Image style={styles.img} source={require('../../static/bouy.png')}/>
         <Text style={styles.txt1}> {title} </Text>
         <Text style={styles.txt2}> ON </Text>
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
     fontSize:17,
     color:'black',
  },
  txt2:
  {
     fontSize:19,
     color:'black',
  },
});
