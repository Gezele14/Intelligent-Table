import React from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import init from 'react_native_mqtt';

import SensorData from "../components/SensorData";
import { ScrollView } from "react-native-gesture-handler";

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

    const client = new Paho.MQTT.Client('soldier.cloudmqtt.com', 32885, 'webSocket');
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.decodeMessage;

    let options = {
      useSSL : true,
      userName : "bnjrpvae",
      password : "xQTE9il9FMYl",
      onSuccess : this.onConnect,
      onFailure : this.doFail
    }
    
    client.connect(options);

    this.state = {
      client,
      table : null,
    }
  };

  static navigationOptions = {
    title: 'Smart Tables',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#493D26',
      textAlign: 'center',
    },
    headerTitleStyle:{
      fontWeight: 'normal',
      fontFamily: 'Moonbright',
      fontSize: 38,
    }
  };

  onConnect = () => {
    const { client } = this.state;
    console.log("Connected");
    client.subscribe('Mesa1/estado');
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
    console.log(direction);
    let value = message._getPayloadString().split(',');
    
    switch(direction) {
      case 'Mesa1/estado':
        this.setState({
          table : value,
        });
        break;
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
      <ScrollView style={styles.mainWindow}>
        <View>
          {this.renderSensorData(
            "Table 1",
            this.state.table,
            "https://cdn.iconscout.com/icon/premium/png-512-thumb/restaurant-table-8-817653.png" //URL de la imagen
          )}
          {this.renderSensorData(
            "Table 2",
            this.state.table,
            "https://cdn.iconscout.com/icon/premium/png-512-thumb/restaurant-table-8-817653.png" //URL de la imagen
          )}
          {this.renderSensorData(
            "Table 3",
            this.state.table,
            "https://cdn.iconscout.com/icon/premium/png-512-thumb/restaurant-table-8-817653.png" //URL de la imagen
          )}
          {this.renderSensorData(
            "Table 4",
            this.state.table,
            "https://cdn.iconscout.com/icon/premium/png-512-thumb/restaurant-table-8-817653.png" //URL de la imagen
          )}
          {this.renderSensorData(
            "Table 5",
            this.state.table,
            "https://cdn.iconscout.com/icon/premium/png-512-thumb/restaurant-table-8-817653.png" //URL de la imagen
          )}
        </View>
      </ScrollView>
    );
  }
}


let styles = StyleSheet.create({
  mainWindow : {
    flex : 1,
    flexDirection : 'column',
    backgroundColor: '#F0E9CE',
    fontSize : 20
  }
});