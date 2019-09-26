import React from "react";
import { 
  Modal,
  View,
  Button,
  TouchableHighlight,
  Text, 
  StyleSheet, 
  AsyncStorage } from "react-native";
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
    
    let visible = false

    client.connect(options);

    this.state = {
      client,
      table : 'black',
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
    },
    headerRight: (
        <Button
          style={{marginRight: 5}}
          onPress={() => alert('Colors mean: \n'+ 
                              '   *Black: no connection\n'+
                              '   *Red: Table Bussy.\n'+
                              '   *Yellow: Table in mainteinance.\n'+
                              '   *Green: Table is free.')}
          title="Info"
          color="#493D26"
        />
    )
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
            'red',
            "https://cdn.iconscout.com/icon/premium/png-512-thumb/restaurant-table-8-817653.png" //URL de la imagen
          )}
          {this.renderSensorData(
            "Table 3",
            'green',
            "https://cdn.iconscout.com/icon/premium/png-512-thumb/restaurant-table-8-817653.png" //URL de la imagen
          )}
          {this.renderSensorData(
            "Table 4",
            'red',
            "https://cdn.iconscout.com/icon/premium/png-512-thumb/restaurant-table-8-817653.png" //URL de la imagen
          )}
          {this.renderSensorData(
            "Table 5",
            'yellow',
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
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  }
});