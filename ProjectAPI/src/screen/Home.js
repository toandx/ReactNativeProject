import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Platform,
  Alert,
  SafeAreaView,
} from "react-native";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import NavBar1 from "../components/NavBar1";
import CountdownTimer from "../components/CountdownTimer";
import {BACKEND,SENSORS_IMAGE,UPDATE_INTERVAL} from "../utils/Consts"
const WARNING_COLOR = "#F4D03F";
const CRITICAL_COLOR = "#ff0000";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'react-native-check-box';
import { storeData, getData } from "../utils/storage";
import {alertMsg,showToast} from "../utils/alert";
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       cnt:0,
      logoutWhenChangePw: false,
      token:this.props.route.params.token,
      runTime: 0,
      waitTime: 0,
      autoMode: true,
      isPlaying: false, // The clock is running or not
      isRunning: true, // The machine is really running or not
      duration: 0,
      remain: 0,
      sensors:[],
      events: [],
      new_password:'',
    };
    this.deviceId=-1;
    this.clock = React.createRef();
    this.nav = React.createRef();
    this.timer_btn = this.timer_btn.bind(this);
    this.auto_btn = this.auto_btn.bind(this);
    this.apply_btn = this.apply_btn.bind(this);
    this.reset_err_btn = this.reset_err_btn.bind(this);
    this.update_events = this.update_events.bind(this);
    this.render_event = this.render_event.bind(this);
    this.get_token_init=this.get_token_init.bind(this);
    this.update_password=this.update_password.bind(this);
    this.get_sensors=this.get_sensors.bind(this);
    this.getDeviceId=this.getDeviceId.bind(this);
    this.updateConfig=this.updateConfig.bind(this);
    this.getPassword=this.getPassword.bind(this);
    this.urgentlyStopInterval=this.urgentlyStopInterval.bind(this);
    this.loginAPI=this.loginAPI.bind(this);
    this.saveToken=this.saveToken.bind(this);
  }
  urgentlyStopInterval()
  {
     clearInterval(this.interval);
  }
  getPassword(){
     fetch(BACKEND + "passphrase", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
     })
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.success) return;
        this.setState({
          new_password: responseJson.passphrase,
         });
      })
      .catch((error) => {
      });
  }
  async getDeviceId(token){
     try
     {
         const listDevice = await AsyncStorage.getItem("listDevice");
     let temp = JSON.parse(listDevice);
     const id=temp.findIndex((ele) => (ele.token === token));
     return id;
     }
     catch (e) 
     {
        alert(e);
     }
  }
  async updateConfig(){
     try {
        //const value = await AsyncStorage.getItem("token");
        //this.setState({token: value,cnt:this.state.cnt+1});
        this.setState({cnt: this.state.cnt+1});
        fetch(BACKEND + "config", {
           method: "GET",
           headers: {
              Authorization: "Bearer "+this.state.token,
              },
           })
        .then((response) => {
           if ((response.status==401) || (response.status==403))
           {
              this.props.navigation.navigate('Login', { params: this.deviceId });
           }
           return response.json();
        })
        .then((responseJson) => {
           if (!responseJson.success) 
           {
              Alert.alert('Cannot update config');
              this.urgentlyStopInterval();
              return;
           }
           this.setState({
              runTime: responseJson.ON,
              waitTime: responseJson.OFF,
              autoMode: responseJson.mode === "AUTO",
              isRunning: responseJson.counter.state === "ON",
              duration: responseJson.counter.duration,
              remain: responseJson.counter.remain,
              sensors: responseJson.sensors,
              });
        })
        .catch((error) => {
           alert(error);
           this.urgentlyStopInterval();
        });
     } catch (e) {}
   }
   update_events() {
    fetch(BACKEND + "events", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
         if (!responseJson.success) 
         {
            alert('Cannot update events');
            this.urgentlyStopInterval();
            return;
         }
        this.setState({
          events: (responseJson.events).map((item) => ({
            title: item.title,
            des: item.description,
            id: item.id,
            level: item.level === "Critical",
          })),
         });
      })
      .catch((error) => {
        alert(error);
        this.urgentlyStopInterval();
      });
  }
  get_sensors(){
      fetch(BACKEND+'sensors', {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+this.state.token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
      })
      .catch((error) => {
         alert("Cannot get sensor data!");
      });
   }
  async get_token_init(){
     this.setState({
        token:this.props.route.params.token,
     })
     this.getPassword();
     this.unsubscribe_focus = this.props.navigation.addListener('focus', () => {
         this.interval = setInterval(() => {
            this.updateConfig();
            this.update_events();
            this.clock.current.update_status(this.state.waitTime,this.state.runTime,this.state.autoMode,this.state.isPlaying,this.state.isRunning,this.state.remain);
            this.nav.current.setIsPlaying(this.state.isPlaying);
         }, UPDATE_INTERVAL)
      });
      this.unsubscribe_blur = this.props.navigation.addListener('blur', () => {
         clearInterval(this.interval);
      });
      this.unsubscribe_beforeRemove = this.props.navigation.addListener('beforeRemove', (e) => {
         e.preventDefault();
         clearInterval(this.interval);
         this.props.navigation.dispatch(e.data.action)
      });
      this.deviceId=await this.getDeviceId(this.state.token);
  }
  async saveToken() {
      try {
         const listDevice = await AsyncStorage.getItem("listDevice");
         let temp = JSON.parse(listDevice)
         temp[this.deviceId].token = this.state.token.toString();
         await AsyncStorage.setItem('listDevice', JSON.stringify(temp));
      } catch (e) {}
  };
  loginAPI()  {
    let formData = new FormData();
    formData.append("passphrase", this.state.new_password);
    fetch(BACKEND + "login", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success) {
          this.setState({token: responseJson.token});
          this.saveToken();
          alert('Update password success New token:'+this.state.token); 
        }
      })
      .catch((error) => {
        alert(error.toString());
      });
  };
  async update_password(){
     let formData = new FormData();
     formData.append('passphrase', this.state.new_password);
     formData.append('clean', this.state.logoutWhenChangePw);
     fetch(BACKEND + "passphrase", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
         if (responseJson.success==true)
         {
            this.loginAPI();
         }
         else 
            alert('Update password fail');
      })
      .catch((error) => {
        alert(error);
      });
  }
  componentDidMount() {
     this.get_token_init();
  }
  componentWillUnmount() {
      this.unsubscribe_focus();
      this.unsubscribe_blur();
      this.unsubscribe_beforeRemove();
      clearInterval(this.interval);
   }
  render_event(item,index) {
    return (
      <View style={[styles.container, { marginBottom: 10 }]} key={index}>
        <Text
          style={{
            padding: 10,
            color: item.level ? CRITICAL_COLOR : WARNING_COLOR,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {" "}
          W{item.id} - {item.title}{" "}
        </Text>
        <Text style={{ padding: 5, color: "#000000", fontSize: 15 }}>
          {" "}
          {item.des}{" "}
        </Text>
      </View>
    );
  }
  render_sensor(item,index) {
    return (
    <View style={{width:'50%',justifyContent: "center",alignItems: 'center',paddingBottom:10}} key={index}>
      <View style={{
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  }}>
         <Image
            style={styles.img}
            source={SENSORS_IMAGE[item.name]}
         />
         <Text style={styles.txt3}> {item.name} </Text>
         <Text style={styles.txt4}>
            {" "}{item.value}{" "}
         </Text>
         <Text style={styles.txt5}>
            {" "}{item.unit}{" "}
         </Text>
      </View>
      </View>
    );
  }
  timer_btn() {
     alertMsg("Error","");
     showToast("You cannot get data");
     /*fetch(BACKEND + "mode/timer", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
         if (responseJson.success)
         {
            this.setState({
               autoMode: (responseJson.mode ==='AUTO')
               });
            this.clock.current.setMode(this.state.autoMode);
         }
      })
      .catch((error) => {
        alert("Connection fail");
      });*/
  }
  auto_btn() {
    fetch(BACKEND+'mode/auto', {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+this.state.token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
         if (responseJson.success)
         {
            this.setState({
               autoMode: (responseJson.mode ==='AUTO')
               });
            this.clock.current.setMode(this.state.autoMode);
         }
      })
      .catch((error) => {
         alert("Connection fail");
      });
  }
  apply_btn() {
    fetch(BACKEND + "config", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token,
      },
      body: JSON.stringify({
        ON: this.state.runTime,
        OFF: this.state.waitTime,
      }),
    })
      .then((responseJson) => {
        this.clock.current.start(this.state.waitTime * 60, this.state.runTime);
      })
      .catch((error) => {
        alert(error);
      });
  }
  reset_err_btn() {
    fetch(BACKEND + "reset_errors", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {})
      .catch((error) => {
        alert("Reset error fail");
      });
  }
  render() {
    return (
      <SafeAreaView>
        <View style={styles.root}>
        <Text> {this.state.cnt} </Text>
          <NavBar1
            ref={this.nav}
            nav={this.props.navigation}
            token={this.state.token}
          />
          <ScrollView style={styles.scroll_view}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
               <View style={{width:'25%'}}>
                  <Button
                     title="Timer"
                     bgColor={this.state.autoMode ? "#000000" : "#CACFD2"}
                     textColor={this.state.autoMode ? "#ffffff" : "#000000"}
                     onPress={this.timer_btn}
                  />
               </View>
               <View style={{width:'25%'}}>
                  <Button
                     title="Auto"
                     bgColor={this.state.autoMode ? "#CACFD2" : "#000000"}
                     textColor={this.state.autoMode ? "#000000" : "#ffffff"}
                     onPress={this.auto_btn}
                     />
              </View>
              <Button
                title="Reset Error"
                bgColor="#ffa500"
                textColor="white"
                onPress={this.reset_err_btn}
              />
            </View>
            <View style={styles.container}>
              <View style={{ flexDirection: "row", width: "100%", margin: 5 }}>
                <View style={{ flexDirection: "column", width: "70%" }}>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <Text style={{ alignSelf: "center", width: "60%" }}>
                      {" "}
                      Wait time (min){" "}
                    </Text>
                    <TextInput
                      style={styles.text_input}
                      
                      onChangeText={(wait_time) =>
                        this.setState({ waitTime: wait_time })
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      width: "100%",
                    }}
                  >
                    <Text style={{ alignSelf: "center", width: "60%" }}>
                      {" "}
                      Run time (sec){" "}
                    </Text>
                    <TextInput
                      style={styles.text_input}
                      
                      onChangeText={(run_time) =>
                        this.setState({ runTime: run_time })
                      }
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginLeft: 20,
                    alignItems: "center",
                  }}
                >
                  <Button
                    title="Apply"
                    bgColor="#4267b2"
                    textColor="white"
                    onPress={this.apply_btn}
                  />
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <CountdownTimer ref={this.clock} />
            </View>
            <View style={styles.container}>
              <View
                style={{ flexDirection: "column", width: "100%", margin: 5 }}
              >
                <View style={{ flexDirection: "row", width: "95%" }}>
                  <Text style={{ alignSelf: "center" }}>
                    {" "}
                    Kunio password:{" "}
                  </Text>
                  <TextInput style={styles.text_input} 
                     onChangeText={(value) => this.setState({ new_password: value })}
                     value={this.state.new_password}/>
                </View>
                <View
                  style={{ flexDirection: "row", marginTop: 5, width: "95%" }}
                >
                  <Text style={{ alignSelf: "center" }}>
                    {" "}
                    Logout other device:{" "}
                  </Text>
                  <CheckBox 
                     style={{marginLeft:'auto'}}
                     onClick={()=>{this.setState({logoutWhenChangePw:!this.state.logoutWhenChangePw})}}
                     isChecked={this.state.logoutWhenChangePw} />
                </View>
                <View style={{ alignSelf: "center", marginTop: 10 }}>
                  <Button
                    title="Update password"
                    bgColor="#4267b2"
                    textColor="white"
                    onPress={this.update_password}
                  />
                </View>
              </View>
            </View>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 25,
                color: "black",
              }}
            >
              {" "}
              Index{" "}
            </Text>
            <View style={{width:'100%', flexDirection:'row',flexWrap: 'wrap',alignItems: 'flex-start',padding:10}}>
               {this.state.sensors.map((item, index) => this.render_sensor(item,index))}
            </View>
            <View
              style={{
                alignSelf: "center",
                height: 2,
                width: "40%",
                backgroundColor: "#CACFD2",
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 25,
                color: "black",
              }}
            >
              {" "}
              Events{" "}
            </Text>
            {this.state.events.map((item, index) => this.render_event(item,index))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  scroll_view: {
    width: "100%",
    padding: 10,
    flexDirection: "column",
    backgroundColor: "#F2F3F4",
    flex: 1,
  },
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
    marginLeft:10,
    flex:1,
    borderColor: "#BDC3C7",
    fontSize: 15,
  },
  sensor: {
    width: "48%",
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  txt1: {
    fontSize: 17,
    color: "black",
  },
  txt2: {
    fontSize: 19,
    color: "black",
  },
  txt3: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  txt4: {
    fontSize: 20,
    color: "black",
  },
  txt5: {
    fontSize: 16,
    color: "black",
  },
});
export default HomeScreen;
