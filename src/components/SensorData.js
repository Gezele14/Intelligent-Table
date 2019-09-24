import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { MoonText } from '../components/StyledText';

const SensorData = props => (
  <View style={styles.sensor}>
    <Image
      style={{width: 110, height: 110}}
      source={{uri: props.mediaImage}}
    />
    <View style={styles.column}>
      <Text style={{fontSize : 24, fontWeight:'bold'}}><MoonText>{props.name}</MoonText></Text>
      <Text style={{fontSize : 22}}>{props.value ? ("Nivel: " + props.value) + "%" : <MoonText>"Sin conexión con el broker"</MoonText>}</Text>
      <Text style={{fontSize : 22}}>{props.value && <MoonText>"Ultima vez actualizado"</MoonText>}</Text>
      <Text style={{fontSize : 22}}>{props.value && <MoonText>"2/9/2019 2:30AM"</MoonText>}</Text>
      
    </View>
  </View>
);

let styles = StyleSheet.create({
  sensor : {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding : 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection : 'row'
  },
  column : {
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SensorData;