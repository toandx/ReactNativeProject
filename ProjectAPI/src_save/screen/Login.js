import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import { format } from "date-fns";
import { BACKEND } from "../utils/Consts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation,route }) {
  const index = route.params.params
  const [text, setText] = React.useState("");
  const [pwValid, setPwValid] = useState(true);
  const save_token_login = async (value) => {
    try {
      const listDevice = await AsyncStorage.getItem("listDevice");
      let temp = JSON.parse(listDevice)
      temp[index].token = value.toString()
      await AsyncStorage.setItem('listDevice', JSON.stringify(temp));
      setPwValid(true);
      navigation.navigate("Home",{token:value.toString()});
    } catch (e) {}
  };
  const login = () => {
    let formData = new FormData();
    formData.append("passphrase", text);
    fetch(BACKEND + "login", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success) {
          save_token_login(responseJson.token);
        } else {
          setPwValid(false);
        }
      })
      .catch((error) => {
        Alert.alert(error.toString());
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.root}>
        <View style={styles.nav}>
          <Text style={styles.txt1}> Kunio </Text>
        </View>
        <View style={styles.container}>
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../../static/logo.jpg")}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setText(text)}
            secureTextEntry={true}
          />
          {pwValid ? null : <Text style={styles.msg}> Wrong password! </Text>}
          <View style={styles.test}>
            <Button
              title="Login"
              size="sm"
              bgColor="#337ab7"
              textColor="white"
              onPress={login}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {
    width: "100%",
    textAlign: "center",
    flexDirection: "column",
    flex: 1,
    alignSelf: "center",
    borderRadius: 23,
  },
  container: {
    width: "100%",
    textAlign: "center",
    flexDirection: "column",
    flex: 1,
    alignSelf: "center",
    padding: 10,
    borderRadius: 23,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  msg: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    color: "red",
  },
  txt1: {
    color: "white",
    fontSize: 20,
    padding: 8,
  },
  input: {
    width: "70%",
    fontSize: 18,
    alignSelf: "center",
    marginTop: 50,
    borderWidth: 1,
  },
  test: {
    fontSize: 20,
    marginTop: 50,
  },
  nav: {
    fontSize: 20,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
