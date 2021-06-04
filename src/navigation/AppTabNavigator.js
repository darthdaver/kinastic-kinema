import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import MoviesStackNavigator from './MoviesNavigator';
import GenresStackNavigator from './GenresNavigator';

  
const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={MoviesStackNavigator} />
                <Tab.Screen name="Genres" component={GenresStackNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppTabNavigator;