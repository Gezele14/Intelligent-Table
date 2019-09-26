import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";


const SensorData = props => (
  <View style={styles.sensor}>
    <Image
      style={{width: 110, height: 110,marginRight: 20}}
      source={{uri: props.mediaImage}}
    />
    <View style={styles.column}>
      <Text style={styles.textTitleStyle}>{props.name}</Text>
      <Text style={styles.textStyle}>{props.value ? ("State: " + props.value) : "No connection with broker"}</Text>
    </View>
  </View>
);

let styles = StyleSheet.create({
  sensor : {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#000',
    marginTop: -2,
    padding : 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection : 'row'
  },
  column : {
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  textTitleStyle:{
    fontFamily: 'Comic',
    fontSize : 20
  },
  textStyle:{
    fontFamily: 'Berlin',
    fontSize : 20,
    marginTop: 5
  }
});

export default SensorData;