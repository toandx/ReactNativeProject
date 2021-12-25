import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, Button,View, TextInput, Image } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screen/Login';
import ChartScreen from './screen/Chart';
import HomeScreen from './screen/Home';
import NetworkScreen from './screen/Network';
import Devices from './screen/Devices'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
export default function App() {
  // React.useEffect(() => {
  //   clearAll()
  // },[])
  // clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear()
  //   } catch(e) {
  //     // clear error
  //   }
  
  //   console.log('Done.')
  // }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Devices"
         screenOptions={{headerShown:false}}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chart" component={ChartScreen} />  
        <Stack.Screen name="Network" component={NetworkScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name='Devices' component={Devices}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
