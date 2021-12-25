import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Platform,
  CheckBox,
  PermissionsAndroid,
  SafeAreaView,
  Modal,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import NavBar1 from "../components/NavBar1";
import ListDevice from "../components/ListDevice";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { vi } from "date-fns/locale";
import { storeData, getData } from "../utils/storage";
import axios from "axios";

const DW = Dimensions.get("window").width;
const DH = Dimensions.get("window").height;

export default function NetworkScreen({ navigation, route }) {
  const token = route.params.token
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [device, setDevice] = useState("");
  const [display, setDisplay] = useState(true);
  const [listWifi, setListWifi] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
  }, []);
  const ScanWifi = async () => {
    setLoading(true);
    axios
      .get("http://14.225.27.249:80/wifi/scan", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.success === true && res.data.ssids.length > 0) {
          const temp = res.data.ssids.map((val) => {
            return { name: val };
          });
          setListWifi(temp);
          setRefresh(!refresh);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };

  const ConnectWifi = async () => {
    let formData = new FormData();
    formData.append("ssid", device);
    formData.append("password", input);
    setLoadingModal(true);
    axios
      .post("http://14.225.27.249:80/wifi/connect",formData, {
        method:'POST',
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.success === true) {
          setRefresh(!refresh);
          setLoadingModal(false);
          setVisible(!visible);
          alert('Connect ' + device + ' success !')
        } else {
          setVisible(!visible);
          setLoadingModal(false);
          alert('Connect ' + device + ' fail !')
        }
      });
  };

  const WifiContainer = ({ item }) => {
    return (
      <View style={{ marginTop: 18, marginHorizontal: 15 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#F2F2F2",
            paddingLeft: 30,
            paddingVertical: 15,
            borderRadius: 10,
          }}
          onPress={() => {
            setVisible(true);
            setDevice(item.name);
          }}
        >
          <Text numberOfLines={1} style={{ flex: 6 }}>
            {item.name}
          </Text>
          <View style={{ flex: 1 }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../static/ic_move.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <NavBar1 nav={navigation} token={token} screen="Network" />
        <View>
          <View style={{ alignSelf: "center" }}>
            <Image
              style={{ width: DW / 3, height: DW / 3, marginTop: 30 }}
              source={require("../../static/logo.jpg")}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                ScanWifi();
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
                Scan
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: "60%",
              marginTop: 25,
              marginHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <ScrollView>
              {loading ? (
                <ActivityIndicator size={"large"} style={{ marginTop: 35 }} />
              ) : (
                <View></View>
              )}
              {listWifi.length > 0 ? (
                <FlatList
                  data={listWifi}
                  renderItem={WifiContainer}
                  keyExtractor={(item, index) => index.toString()}
                  extraData={refresh}
                />
              ) : (
                <Text
                  style={{ marginTop: 40, fontSize: 18, textAlign: "center" }}
                >
                  No Wifi, Please scan to get wifi !
                </Text>
              )}
            </ScrollView>
          </View>
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
              <View style={{ flexDirection: "row-reverse" }}>
                <TouchableOpacity
                  style={{ marginRight: 35 }}
                  onPress={() => {
                    setVisible(!visible);
                    setLoadingModal(false)
                  }}
                >
                  <FontAwesome5Icon
                    name={"window-close"}
                    style={{ justifyContent: "flex-end" }}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 30, textAlign: "center" }}>
                Wifi login
              </Text>
              <Text
                style={{ fontSize: 18, textAlign: "center", marginTop: 20 }}
              >
                {device}
              </Text>
              {loadingModal ? <ActivityIndicator style={{marginTop:15}} size={"small"} /> : <View />}
              <View
                style={{
                  flexDirection: "row",
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
                  style={{ flex: 5 }}
                  value={input}
                  onChangeText={(e) => setInput(e)}
                  placeholder="Password"
                  secureTextEntry={display}
                />
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setDisplay(!display);
                    }}
                  >
                    <FontAwesome5Icon
                      name={!display ? "eye" : "eye-slash"}
                      size={20}
                      color={"#000"}
                    />
                  </TouchableOpacity>
                </View>
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
                  ConnectWifi();
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
                  Connect
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  // scroll_view: {
  //   width: "100%",
  //   padding: 10,
  //   flexDirection: "column",
  //   backgroundColor: "#F2F3F4",
  //   flex: 1,
  // },
  grid_row: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 7,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  container: {
    marginTop: 10,
    width: "100%",
    flexDirection: "column",
    borderRadius: 20,
    padding: 5,
    backgroundColor: "white",
  },
  text_input: {
    alignSelf: "center",
    width: "40%",
    height: 40,
    borderWidth: 1,
    borderColor: "#BDC3C7",
    fontSize: 15,
  },
  label: {},
});
