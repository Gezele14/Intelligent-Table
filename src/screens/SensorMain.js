import React from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import init from 'react_native_mqtt';

import SensorData from "../components/SensorData";
import { MoonText } from '../components/StyledText';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync : {
  }
});
 
export default class SensorMain extends React.Component {
  constructor(props) {
    super(props);

    const client = new Paho.MQTT.Client('soldier.cloudmqtt.com', 36331, 'webSocket');
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.decodeMessage;

    let options = {
      useSSL : true,
      userName : "fpwzfqeg",
      password : "5ynwWEtuwmvs",
      onSuccess : this.onConnect,
      onFailure : this.doFail
    }
    
    client.connect(options);

    this.state = {
      client,
      table : null,
    }
  };

  onConnect = () => {
    const { client } = this.state;
    console.log("Connected");
  };
  
  doFail = () => {
    console.log("Failed");
  };
  
  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  };

  decodeMessage = message => {
    let direction = message._getDestinationName();
    let value = message._getPayloadString().split(',');
    let minVal;
    let maxVal;
    console.log(value);
    switch(direction) {
      //Aqui van los case para la mesa
    }
  }

  renderSensorData(name, sensorValue, mediaImage) {
    return (
      <SensorData
        value={sensorValue}
        name={name}
        mediaImage={mediaImage}
      />
    );
  };

  render() {
    return (
      <View style={styles.mainWindow}>
        <View>
          {this.renderSensorData(
            "Mesa 1",
            this.state.table,
            "https://purepng.com/public/uploads/large/purepng.com-tabletabledeskboardcook-tablefurniture-1701527998855osb4d.png" //URL de la imagen
          )}
         
        </View>
      </View>
    );
  }
}

SensorMain.navigationOptions = {
  title: 'Disponibilidad de las mesas',
  font: '../assets/fonts/Moonbright.ttf'
};

let styles = StyleSheet.create({
  mainWindow : {
    flex : 1,
    justifyContent : 'center',
    flexDirection : 'column',
    alignItems : 'center',
    fontSize : 20
  }
});