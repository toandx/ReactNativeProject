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
            data:[],
         };
      this.renderItem=this.renderItem.bind(this);
      this.setData=this.setData.bind(this);
   }
   componentDidMount() { 
      
   }
   renderItem(item,index){
      return (
      <View style={styles.row} key={index}>
         <View style={styles.cell}>
            <Text style={styles.txt}> {item.time} </Text>
         </View>
         <View style={styles.cell}>
            <Text style={styles.txt}> {item.temp} </Text>
         </View>
      </View>
      );
   }
   setData(data_input){
      this.setState({
         data: data_input,
      })
   }

   render() {
      return (
      <View style={styles.root}>
         <Header/>
         {
            this.state.data.map((item,index) => this.renderItem(item,index))
         }
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