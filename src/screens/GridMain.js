import React from "react";

import {
    StyleSheet,
    View,
    FlatList,
    Text} from 'react-native';

import ListItem from '../ListItem';


export default class GridMain extends React.Component {
    state={
    };

    static navigationOptions = {
        title: ' Restaurant App',
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

    render(){
        return(
            <View style={styles.container}>
                 <Text style={{
                    fontFamily:'Moonbright',
                    color: '#493D26',
                    flex: 1,
                    fontSize: 50,
                    textAlign: 'center',
                    padding: 30,
                }}>
                    Welcome               This is Smart-Table
                </Text>
                <FlatList
                numColumns={2}
                data={[
                    require('../assets/images/tableIcon.png'),
                ]}
                renderItem={({item}) => {
                   return <ListItem image={item} navigation={this.props.navigation} />
                }}
                keyExtractor={
                    (index)=> {return index}
                }
                />
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
        alignContent: "center",
        alignItems:'center',
        backgroundColor: '#F0E9CE',
    },
});


