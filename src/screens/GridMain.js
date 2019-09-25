import React from "react";

import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback} from 'react-native';

import ListItem from '../ListItem';


export default class GridMain extends React.Component {
    state={

    };

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                numColumns={2}
                data={[
                    require('../assets/images/icon01.png'),
                    require('../assets/images/icon02.png'),
                    require('../assets/images/icon03.png'),
                    require('../assets/images/icon04.png'),
                    require('../assets/images/Icon05.png'),
                    require('../assets/images/Icon06.png'),
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
        alignItems:'center',
        backgroundColor: '#F5FCFF',
    },
});


