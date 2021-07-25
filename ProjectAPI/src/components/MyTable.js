import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View, processColor
} from 'react-native';
import { format } from "date-fns";

function Row({time,temp}) {
	return (
    <View style={styles.row}>
      <View style={styles.cell}>
         <Text style={styles.txt}> {format(time, "dd/MM/yyyy, HH:mma")} </Text>
      </View>
      <View style={styles.cell}>
         <Text style={styles.txt}> {temp} </Text>
      </View>
    </View>
  );
}
function Header({}) {
	return (
    <View style={styles.row}>
      <View style={styles.cell}>
         <Text style={styles.header}> Time </Text>
      </View>
      <View style={styles.cell}>
         <Text style={styles.header}> Temperature </Text>
      </View>
    </View>
  );
}
export default class MyTable extends React.Component {
   constructor() {
      super();
      this.state = {
         data: {},
         };
   }
   componentDidMount() { 
      
   }

   render() {
      return (
      <View style={styles.root}>
         <Header/>
         <Row time={new Date()} temp='37'/>
         <Row time={new Date()} temp='100'/>
         <Row time={new Date()} temp='121'/>
         <Row time={new Date()} temp='300'/>
         <Row time={new Date()} temp='234'/>
         <Row time={new Date()} temp='435'/>
      </View>
      );
   }
}

const styles = StyleSheet.create({
   row: {
      width:'100%',
      flexDirection:'row',
      backgroundColor:'white'
      },
   cell: {
      flex:1,
      borderWidth:1,
      borderColor:'#BDC3C7'
      },
   root: {
      width:'100%',
      flexDirection:'column',
      padding:8
      },
   txt: {
      color:'black',
      fontSize:15,
   },
   header: {
      color:'black',
      fontSize:15,
      fontWeight:'bold',
   },
   
});