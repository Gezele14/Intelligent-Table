import React from "react";

import {
    Image,
    Animated,
    TouchableWithoutFeedback} from 'react-native';


export default class ListItem extends React.Component{
    state={
        animatePress: new Animated.Value(1)
    }

   animateIn(){
        Animated.timing(this.state.animatePress, {
            toValue: 0.8,
            duration: 200
        }).start()
    }

    animateOut(){
        Animated.timing(this.state.animatePress, {
            toValue: 1,
            duration: 200
        }).start()
    }

    navigate = () => {
        this.props.navigation.navigate("Inicio");
    }

    render(){
        const { image, onPressItem} = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={ this.navigate }
                onPressIn={() => this.animateIn()}
                onPressOut={() => this.animateOut()}
            >
                <Animated.View style ={{
                    margin: 5,
                    transform: [
                        {
                            scale: this.state.animatePress
                        },
                    ]
                }}>
                    <Image style={{ 
                        flex: 1, 
                        alignContent:"center", 
                        alignItems:"center" 
                    }} source={image}></Image>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}