import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

let stateValue
const SensorData = props => (
  <View style={styles.container}>
    <Image
      style={styles.imageStyle}
      source={{uri: props.mediaImage}}
    />
    <View>
      <Text style={styles.textTitleStyle}>{props.name}</Text>

      <View style={styles.column}>
        <Text style={styles.textStyle}>{"State:"}</Text>
        <View style={
          {
            width: 25,
            height: 25,
            borderRadius: 25 / 2,
            lineHeight: 20,
            borderColor: '#000',
            marginTop: 10,
            backgroundColor: props.value
          }
        }></View>

      </View>
    </View>
  </View>
);

let styles = StyleSheet.create({
  container : {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#000',
    padding : 4,
    flexDirection : 'row'
  },
  column : {
    flexDirection : 'column',
    alignItems: "center",
    justifyContent: 'center',
    marginLeft: 40,
    marginTop: 10
  },
  textTitleStyle:{
    paddingLeft: 50,
    fontFamily: 'Comic',
    marginLeft: 40,
    fontSize : 20,
    marginTop: 10
  },
  textStyle:{
    fontFamily: 'Berlin',
    justifyContent: 'center',
    fontSize : 20,
  },
  imageStyle: {
    width: 100, 
    height: 100,
    marginRight: 20,
    marginLeft: 40
  }
});

export default SensorData;