import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, ScrollView, Platform,SafeAreaView } from "react-native";
import Button from '../components/Button';
import NavBar1 from '../components/NavBar1';
import TimePicker from '../components/TimePicker';
import TempChart from '../components/TempChart';
import { format } from "date-fns";
import MyTable from '../components/MyTable';
import {BACKEND} from "../utils/Consts";
import AsyncStorage from '@react-native-async-storage/async-storage';
const ONE_MONTH=30*24*3600*1000;
class ChartScreen extends React.Component {
   constructor(props) {
		super(props);
		this.state = {
         token:this.props.route.params.token,
         startDate: new Date(new Date()-ONE_MONTH),
         endDate: new Date(),
         sensors:[],
         data:[],
         time:[],
         current_sensor_index: null,
		};
      this.nav = React.createRef();
      this.table=React.createRef();
      this.chart=React.createRef();
      this.get_sensor=this.get_sensor.bind(this);
      this.update_data=this.update_data.bind(this);
      this.get_token_init=this.get_token_init.bind(this);
      this.update_btn=this.update_btn.bind(this);
	}
  get_token_init(){
      this.setState({
         token: this.props.route.params.token,
      });
      this.get_sensor();
  }
   get_sensor(){
      fetch(BACKEND+'sensors', {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+this.state.token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
         if (!responseJson.success) 
         {
            alert('Cannot get sensor data');
            return;
         }
         this.setState({
            sensors: responseJson.sensors,
         });
         if (this.state.sensors.length>0) 
            this.update_data(0);
            
      })
      .catch((error) => {
         alert(error);
      });
   }
   update_btn()
   {
      if (this.state.current_sensor_index === null)
      {
         alert("You have not choosen sensor yet!");
         return;
      }
      this.update_data(this.state.current_sensor_index);
   }
   update_data(sensor_index){
      this.setState({
         current_sensor_index:sensor_index,
      });
      if (this.state.startDate.getTime()>=this.state.endDate.getTime())
      {
         alert('The start date must be before the end date!');
         return;
      }
      fetch(BACKEND+'data', {
         method: 'POST',
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer '+this.state.token,
            },
         body: JSON.stringify({
            time: {start: format(this.state.startDate,'yyyy-MM-dd HH:mm:ss.SSS'), end: format(this.state.endDate,'yyyy-MM-dd HH:mm:ss.SSS')},
            type: [this.state.sensors[sensor_index].id],
            }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
         if (responseJson.success==false) 
         {
            alert('Cannot get data!');
            return;
         }
         //alert(responseJson.success+' '+this.state.token+' '+sensor_id+' '+format(this.state.startDate,'yyyy-MM-dd HH:mm:ss.SSS')+' '+format(this.state.endDate,'yyyy-MM-dd HH:mm:ss.SSS')+' '+responseJson.data[sensor_id]);
         this.setState({
            data: responseJson.stamps.map((item, index) => ({time: item,temp:responseJson.data[this.state.sensors[sensor_index].id][index]}))
         });
         this.table.current.setData(this.state.data);
         this.chart.current.uploadData(this.state.data,this.state.sensors[sensor_index].name);
      })
      .catch((error) => {
         alert(error);
      });
   }
   componentDidMount() { 
      this.get_token_init();
      
   }
   render_sensor_btn(item,index) {
    const primary_btn = (index === this.state.current_sensor_index);
    return (
    <View style={{width:'50%',justifyContent: "center",alignItems: 'center',paddingBottom:10}} key={index}>
      <View style={{width:'90%'}}>
      <Button title={item.name} size="sm" bgColor={primary_btn ? "#CACFD2" : "black"} textColor={primary_btn ? "black" : "white"} onPress={() => this.update_data(index)}/>
      </View>
    </View>
    );
  }
	render() {
      return (
         <SafeAreaView style={{flex:1}}>

   <ScrollView style={styles.root}>
      <NavBar1 ref={this.nav} nav={this.props.navigation} token={this.state.token} screen='Chart'/>
      <View style={styles.container}>
         <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center',width:'100%', color:'black'}}> Type of sensor </Text>
      </View>
      <View style={styles.sensor_btn_group}>
           {this.state.sensors.map((item, index) => this.render_sensor_btn(item,index))}
       </View>
      <View style={styles.container}>
         <View style={styles.grid_row}>
            <Text style={{alignSelf:'center',width:'20%'}}>Start date: </Text>
            <TimePicker timeInit={this.state.startDate} setTimeOut={time => this.setState({ startDate: time })} style={{flex:1}}/>
         </View>
         <View style={styles.grid_row}>
            <Text style={{alignSelf:'center',width:'20%'}}>End date: </Text>
            <TimePicker timeInit={this.state.endDate} setTimeOut={time => this.setState({ endDate: time })} style={{flex:1}}/>
         </View>
         <View style={{alignSelf:'center'}}>
            <Button title="Update" bgColor="#4267b2" textColor="white" onPress={() => this.update_btn()} />
         </View> 
      </View>
      <View style={[styles.container,{height:500}]}>
         <TempChart ref={this.chart}/>
      </View>
      <View style={[styles.container,{}]}>
         <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center',width:'100%', color:'black'}}> Temperature </Text>
         <MyTable ref={this.table}/>
      </View>
            </ScrollView>
         </SafeAreaView>
            
   )}
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
  sensor_btn_group:{
     width:'100%',
     backgroundColor:'white', 
     marginTop:5, 
     flexDirection:'row',
     flexWrap: 'wrap',
     alignItems: 'flex-start',
     padding:10
  }
});
export default ChartScreen;