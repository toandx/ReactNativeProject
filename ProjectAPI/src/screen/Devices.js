import React, { useState, useEffect } from "react";
import NavBar2 from "../components/NavBar2";
import {
  StyleSheet,
  Text,
  Alert,
  View,
  TextInput,
  Image,
  SafeAreaView,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { storeData, getData } from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const DW = Dimensions.get("window").width;
const DH = Dimensions.get("window").height;

const Devices = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [ipModal, setIpModal] = useState("");
  const [nameModal, setNameModal] = useState("");
  const [current, setCurrent] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const edit = async () => {
    if (ipModal.length > 0 && nameModal.length > 0) {
      const listDevice = await AsyncStorage.getItem("listDevice");
      let temp = JSON.parse(listDevice);
      list.splice(current, 1, {
        ip: ipModal,
        name: nameModal,
        token: temp[current].token,
      });
      setList(list);
      storeData("listDevice", list);
      setVisible(!visible);
    } else {
      setVisible(!visible);
      alert("Please fill !");
    }
  };

  const logout = async (index) => {
    const listDevice = await AsyncStorage.getItem("listDevice");

    let temp = JSON.parse(listDevice);
    axios
      .get("http://14.225.27.249:80/logout", {
        headers: {
          Authorization: "Bearer " + temp[index].token,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
    temp[index].token = "";
    await AsyncStorage.setItem("listDevice", JSON.stringify(temp));
    setList(temp);
    setRefresh(!refresh);
  };

  const getRes = async () => {
    const x = await getData("listDevice");
    if (x == null) {
      setList([]);
    } else {
      setList(x);
      console.log(x);
    }
  };

  useEffect(() => {
    const rerender = navigation.addListener("focus", () => {
      getRes();
    });
    return rerender;
  }, [navigation]);

  const Children = ({ item, index }) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "grey",
          width: DW * 0.35,
          borderRadius: 5,
          marginTop: 18,
          marginLeft: 28,
          // alignSelf:'center'
        }}
      >
        <TouchableOpacity
          style={{ alignSelf: "flex-end", marginRight: 10 }}
          onPress={() => {
            list.splice(index, 1);
            setList(list);
            setRefresh(!refresh);
            storeData("listDevice", list);
          }}
        >
          <Text style={{ fontSize: 18, fontStyle: "italic" }}>x</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center" }}>{item.ip}</Text>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            if (item.token.length > 0) {
              console.log(item.token);
              navigation.navigate("Home", { token: item.token });
            } else {
              alert("Please login !");
            }
          }}
        >
          <Image
            style={{ width: DW * 0.22, height: DW * 0.19 }}
            source={require("../../static/drum.png")}
          />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", marginBottom: 5 }}>
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 15,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              paddingVertical: 3,
              width: DW * 0.13,
              borderRadius: 3,
            }}
            onPress={() => {
              setCurrent(index);
              setVisible(!visible);
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>Edit</Text>
          </TouchableOpacity>
          {item.token.length > 0 ? (
            <TouchableOpacity
              style={{
                backgroundColor: "blue",
                paddingVertical: 3,
                width: DW * 0.13,
                borderRadius: 3,
              }}
              onPress={() => {
                logout(index);
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Log out
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "blue",
                paddingVertical: 3,
                width: DW * 0.13,
                borderRadius: 3,
              }}
              onPress={() => {
                navigation.navigate("Login", { params: index });
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>Log in</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ marginTop: Platform.OS === "ios" ? 0 : 27 }}>
      <NavBar2 nav={navigation} />
      <View>
        <View style={{ alignSelf: "center" }}>
          <Image
            style={{ width: DW / 3, height: DW / 3, marginTop: 30 }}
            source={require("../../static/logo.jpg")}
          />
        </View>
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 2 }}>
          Thêm thiết bị
        </Text>
        <View
          style={{
            backgroundColor: "#fff",
            alignSelf: "center",
            paddingVertical: 15,
            paddingHorizontal: 18,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row-reverse" }}>
            <TextInput
              placeholder={"Nhập Ip"}
              style={{
                borderWidth: 1,
                borderColor: "#BDC3C7",
                width: DW * 0.5,
                marginLeft: 30,
                borderRadius: 3,
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}
              value={ip}
              onChangeText={(e) => {
                setIp(e);
              }}
            />
            <Text style={{ fontSize: 16, marginTop: 3 }}>IP</Text>
          </View>
          <View style={{ flexDirection: "row-reverse", marginTop: 15 }}>
            <TextInput
              placeholder={"Nhập tên"}
              style={{
                borderWidth: 1,
                borderColor: "#BDC3C7",
                width: DW * 0.5,
                marginLeft: 30,
                borderRadius: 3,
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}
              value={name}
              onChangeText={(e) => {
                setName(e);
              }}
            />
            <Text style={{ fontSize: 16, marginTop: 3 }}>Tên</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (ip.length > 0 && name.length > 0) {
              list.push({ ip: ip, name: name, token: "" });
              setList(list);
              setRefresh(!refresh);
              storeData("listDevice", list);
            } else {
              alert("Fill please!");
            }
          }}
          activeOpacity={0.8}
          style={{
            alignSelf: "flex-end",
            backgroundColor: "gray",
            paddingHorizontal: 16,
            paddingVertical: 7,
            borderRadius: 10,
            marginTop: 15,
            marginRight: 40,
          }}
        >
          <Text
            style={{
              fontSize: 19,
              color: "#fff",
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#fff",
            width: DW * 0.92,
            height: DH * 0.4,
            alignSelf: "center",
            marginTop: 15,
            borderRadius: 6,
          }}
        >
          <ScrollView>
            <View>
              <FlatList
                data={list}
                renderItem={Children}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                extraData={refresh}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <SafeAreaView
          style={{ backgroundColor: "rgba(76, 76, 76, 0.3)", flex: 1 }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              marginTop: "50%",
              marginHorizontal: 20,
              borderRadius: 6,
            }}
          >
            <View style={{ marginTop: 30 }}>
              <View style={{ flexDirection: "row-reverse" }}></View>
              <Text style={{ fontSize: 30, textAlign: "center" }}>
                Edit device
              </Text>

              <View
                style={{
                  marginHorizontal: 50,
                  borderWidth: 1,
                  borderColor: "rgba(76, 76, 76,0.6)",
                  borderRadius: 7,
                  paddingLeft: 20,
                  paddingVertical: 10,
                  marginTop: 50,
                }}
              >
                <TextInput
                  value={ipModal}
                  onChangeText={(e) => setIpModal(e)}
                  placeholder="Ip"
                />
              </View>
              <View
                style={{
                  marginHorizontal: 50,
                  borderWidth: 1,
                  borderColor: "rgba(76, 76, 76,0.6)",
                  borderRadius: 7,
                  paddingLeft: 20,
                  paddingVertical: 10,
                  marginTop: 15,
                }}
              >
                <TextInput
                  value={nameModal}
                  onChangeText={(e) => setNameModal(e)}
                  placeholder="Name"
                />
              </View>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#3d7afc",
                  marginTop: 40,
                  width: DW * 0.35,
                  alignSelf: "center",
                  borderRadius: 7,
                  marginBottom: 25,
                }}
                onPress={() => {
                  edit();
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};
export default Devices;
