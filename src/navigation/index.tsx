import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppContainer from '../screens/AppContainer';
import { HOME_SCREEN } from './screenNames';

const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
        <Drawer.Navigator
            initialRouteName={HOME_SCREEN}
            screenOptions={{
                headerShown: false,
                drawerType: 'back',
                overlayColor: '#00000000'
            }}
        >
            <Drawer.Screen name={HOME_SCREEN} component={AppContainer} />
        </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
