import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BACKEND} from "../utils/Consts"
class ListDevice extends React.Component {
   constructor(props) {
		super(props);
		this.state = {
         data: [{name:'toandx'},{name:'abc'},{name:'helloworld'}],
		};      
      this.renderItem=this.renderItem.bind(this);
      this.refresh=this.refresh.bind(this);
      this.wifiConnect=this.wifiConnect.bind(this);
	}
   refresh()
   {
      fetch(BACKEND+'wifi/scan/', {
         method: 'GET',
         headers: {
            'Authorization': 'Bearer '+global.token,
            },
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState(
         {
            data: responseJson.ssids.map((item,id) => ({name:item}))
         });
      })
      .catch((error) => {
         alert("Connection fail");
      });
   }
   wifiConnect(item_name)
   {
      alert(item_name);
      let formData = new FormData();
      formData.append('ssid', item_name);
      formData.append('password', 'Kunio');
      fetch(BACKEND+'wifi/connect/', {
         method: 'POST',
         headers: {
            'Authorization': 'Bearer '+global.token,
            },
         body: formData,
      })
      .then((response) => response.json())
      .then((responseJson) => {
      })
      .catch((error) => {
         alert("Connection fail");
      });
   }
   componentDidMount() { 
      this.refresh();
   }
   renderItem(item){
      return(
      <TouchableOpacity style={styles.item} onPress={() => this.wifiConnect(item.name)}>
         <Text style = {styles.txt}>
            {item.name}
         </Text>
      </TouchableOpacity>);
   };
   
   render() {
     return (
    <View style={styles.container}>
      <FlatList
        data={this.state.data}
        renderItem={({item}) => this.renderItem(item)}
      />
    </View>);
  }
}
const styles = StyleSheet.create({
  container: {
   width:'100%',
  },
  item: {
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
    marginTop:5,
  },
  txt: {
     fontSize: 18,
     padding:5,
  }
});
export default ListDevice;