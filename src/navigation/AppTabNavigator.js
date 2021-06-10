import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import MoviesStackNavigator from './MoviesStackNavigator';
import GenresStackNavigator from './GenresStackNavigator';

  
const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MoviesStackNavigator} />
            <Tab.Screen name="Genres" component={GenresStackNavigator} />
        </Tab.Navigator>
    )
}

export default AppTabNavigator;