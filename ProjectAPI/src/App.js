import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, Button,View, TextInput, Image } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screen/Login';
import ChartScreen from './screen/Chart';
import HomeScreen from './screen/Home';
import NetworkScreen from './screen/Network';
import Test from './screen/Test';


const Stack = createStackNavigator();
export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
         screenOptions={{headerShown:false}}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chart" component={ChartScreen} />
        <Stack.Screen name="Network" component={NetworkScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};