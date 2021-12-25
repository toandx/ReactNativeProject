import React, {useState} from "react";
import { View, StyleSheet, Text,Button } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import Icon from 'react-native-vector-icons/Entypo';
//import Button from './Button';
function TimePicker({timeInit,setTimeOut}){
   const [timeNow, setTimeNow] = useState(timeInit);
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);
   const onChange = (event, selectedVal) => {
      setShow(false);
      if (mode=='date') 
      {
         const currentDate = selectedVal || date;
         setTimeNow(currentDate);
         setTimeOut(currentDate);
         setMode('time');
         setShow(true);
      } else
      {
         const currentTime = selectedVal || time;
         setTimeNow(currentTime);
         setTimeOut(currentTime)
         setShow(false);
         setMode('date');
      }
   };
   const showTimepicker = () => {
      setShow(true);
      setMode('date');
   };
	return (
		<View style={styles.container}>
         <Text style={styles.txt}>
            {format(timeNow, "dd/MM/yyyy  HH:mma")}     
         </Text>
         <Icon.Button
            name="calendar"
            color='black'
            backgroundColor="white"
            onPress={showTimepicker}
         />
         {show && (
         <DateTimePicker
            testID="dateTimePicker"
            value={timeNow}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
         />
         )}
      </View>
	);
};

const styles = StyleSheet.create({
  container: {
     borderColor:'black',
     borderWidth:2, 
     borderRadius: 7,
     flexDirection:"row", 
     flexGrow:1,
     justifyContent: 'space-between',
   },
  txt: {
     alignSelf:'center',
     textAlign:'center',
     justifyContent: 'center',
   }
});

export default TimePicker;