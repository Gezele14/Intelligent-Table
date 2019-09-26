import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SensorMain from '../screens/SensorMain';
import GridMain from '../screens/GridMain';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Menu: GridMain,
    Inicio: SensorMain
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
  tabBarLabel: 'Menu',
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

export default HomeStack;
