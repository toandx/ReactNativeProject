import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View, processColor
} from 'react-native';
import { format } from "date-fns";

export default class Test extends React.Component {
   constructor() {
      super();
      this.state = {
            data:'toandeptrai'
         };
   }
   componentDidMount() { 
      
   }
   changeText()
   {
      this.setState({data:'Hello world'})
   }

   render() {
      return (
      <View style={styles.root}>
         <Text> {this.state.data} </Text>
      </View>
      );
   }
}

const styles = StyleSheet.create({
   root: {
      width:'100%',
      flexDirection:'column',
      padding:8
      },
});