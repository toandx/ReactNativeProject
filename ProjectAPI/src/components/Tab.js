import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

function Tab({ onPress, title, bgColor ,textColor}){
	return (
		<TouchableOpacity onPress={onPress} style={[styles.appButtonContainer,{backgroundColor:bgColor}]}>
			<Text style={[styles.appButtonText,{color:textColor}]}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    alignSelf: "center",
    borderRadius: 7,
  },
  appButtonText: {
    fontSize: 16,
    alignSelf: "center",
	margin:8,
  }
});

export default Tab;