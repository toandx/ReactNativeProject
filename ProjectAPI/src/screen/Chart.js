import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, ScrollView, Platform } from "react-native";
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import TimePicker from '../components/TimePicker';
import TempChart from '../components/TempChart';
import { format } from "date-fns";
import MyTable from '../components/MyTable';
export default function ChartScreen({ navigation }) {
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
	return (
   <ScrollView style={styles.root}>
      <NavBar nav={navigation}/>
      <View style={styles.container}>
         <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center',width:'100%', color:'black'}}> Type of sensor </Text>
      </View>
      <View style={styles.container}>
         <View style={styles.grid_row}>
            <View style={{flex:1,marginLeft:10,marginRight:10}}><Button title="High level" size="sm" bgColor="black" textColor="white"/></View>
            <View style={{flex:1,marginLeft:10,marginRight:10}}><Button title="Low level" size="sm" bgColor="black" textColor="white"/></View>
         </View>
         <View style={styles.grid_row}>
            <View style={{flex:1,marginLeft:10,marginRight:10}}><Button title="Temperature" size="sm" bgColor="gray" textColor="black"/></View>
            <View style={{flex:1,marginLeft:10,marginRight:10}}></View>
         </View>
		</View>
      <View style={styles.container}>
         <View style={styles.grid_row}>
            <Text style={{alignSelf:'center'}}>Start date: </Text>
            <TimePicker setTimeOut={setStartDate} style={{flex:1}}/>
         </View>
         <View style={styles.grid_row}>
            <Text style={{alignSelf:'center'}}>End date: </Text>
            <TimePicker setTimeOut={setEndDate} style={{flex:1}}/>
         </View>
         <View style={{alignSelf:'center'}}>
            <Button title="Update" bgColor="#3498DB" textColor="white" />
         </View> 
         <Text>
            {format(startDate, "dd/MM/yyyy  HH:mma")}     
         </Text>
      </View>
      <View style={[styles.container,{height:500}]}>
         <TempChart/>
      </View>
      <View style={[styles.container,{}]}>
         <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center',width:'100%', color:'black'}}> Temperature </Text>
         <MyTable/>
      </View>
   </ScrollView>
  );
}
 
const styles = StyleSheet.create({
	root: {
		width:'100%',
		textAlign: "center",
		flexDirection:"column",
      backgroundColor:'#BDC3C7',
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
      width:'100%',
      flexDirection:"column",
      alignSelf: "flex-start",
      backgroundColor:'white',
      padding: 6,
      marginTop:5,
      alignItems: 'flex-start',
  },
});