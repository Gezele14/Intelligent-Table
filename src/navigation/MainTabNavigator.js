import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SensorMain from '../screens/SensorMain';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Inicio: SensorMain,
  },
  {
    defaultNavigationOptions: {
        backgroundColor: '#F0E9CE',
      
      headerTitleStyle:{
        fontWeight: 'normal',
        
      }
    }
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
});

tabNavigator.path = '';

export default tabNavigator;
