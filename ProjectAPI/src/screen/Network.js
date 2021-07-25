import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, ScrollView, Platform, CheckBox, PermissionsAndroid } from "react-native";
import Button from '../components/Button';
import NavBar from '../components/NavBar';
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
export default function NetworkScreen({ navigation }) {
	return (
   <View style={styles.root}>
   <NavBar nav={navigation}/>
   <ScrollView style={styles.scroll_view}>
      <View style={{flexDirection:'row',width:'100%',justifyContent: 'space-between'}}>
         <Button title='Timer' bgColor='#909497' textColor='black' onPress={requestCameraPermission} />
         <Button title='Auto' bgColor='black' textColor='white' />
         <Button title='Reset Error' bgColor='#F8C471' textColor='white' />
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