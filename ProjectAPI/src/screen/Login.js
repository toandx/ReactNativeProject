import React, { useState } from "react";
import { StyleSheet, Alert, Text, View, TextInput, Image } from "react-native";
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import { format } from "date-fns";
const BACKEND='http://192.168.0.2:2708/';
export default function LoginScreen({navigation}) {
	const [text, setText] = React.useState("");
	const [pwValid, setPwValid] = useState(true);
	const login = () => {
      let formData = new FormData();
      formData.append('passphrase', text);
      fetch(BACKEND+'login/', {
            method: 'POST',
            body: formData,
      })
      .then((response) => response.json())
      .then((responseJson) => {
         if (responseJson.success)
         {
            global.token=responseJson.token;
            setPwValid(true);
            navigation.navigate('Home');
         } else
         {
            global.token=0;
            setPwValid(false);
         }
      })
      .catch((error) => {
         Alert.alert(error.toString());
      });
	};
	return (
    <View style={styles.root}>
		<View style={styles.nav}>
		<Text style={styles.txt1}> Kunio </Text>
		</View>
		<View style={styles.container}>
		<Image style={{width:200,height:200}} source={require('../../static/logo.jpg')} />
		<TextInput
			style={styles.input}
			placeholder="Password"
         onChangeText={text => setText(text)}
			secureTextEntry={true}
		/>
		{ pwValid ? null: <Text style={styles.msg} > Wrong password! </Text>}
		<View style={styles.test}>
			<Button title="Login" size="sm" bgColor="#3498DB" textColor="white" onPress={login} />
		</View>
      
		</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
	width:'100%',
	textAlign: "center",
	flexDirection:"column",
    flex: 1,
	alignSelf: "center",
    borderRadius: 23,
	},
  container: {
	width:'100%',
	textAlign: "center",
	flexDirection:"column",
    flex: 1,
	alignSelf: "center",
    padding: 10,
    borderRadius: 23,
    marginTop:5,
	justifyContent: 'center',
	alignItems: 'center',    
  },
  msg: {
	  textAlign: "center",
	  fontSize: 18,
	  marginTop:10,	  
	  color:'red',
  },
  txt1: {
	  color:'white',
	  fontSize: 20,
	  padding:8,
  },
  input: {
	width:'70%',
	fontSize: 18,
	alignSelf: "center",
	marginTop:50,
    borderWidth: 1,
  }, 
  test:{
	fontSize: 20,
    marginTop:50,
  },
  nav:{
	fontSize:20,
	backgroundColor:'black',
	flexDirection: 'row',
	alignItems: "flex-start",
  }
});
