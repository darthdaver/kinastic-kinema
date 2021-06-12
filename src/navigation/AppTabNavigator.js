import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MoviesStackNavigator from './MoviesStackNavigator';
import GenresStackNavigator from './GenresStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

  
const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    backgroundColor: 'rgba(221,134,0,1)',
                    borderRadius: 15,
                    height: 60,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Home" component={MoviesStackNavigator} />
            <Tab.Screen name="Genres" component={GenresStackNavigator} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default AppTabNavigator;