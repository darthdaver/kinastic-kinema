import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MoviesStackNavigator from './MoviesStackNavigator';
import GenresStackNavigator from './GenresStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import moviesIcon from '../../assets/images/movies_icon.png';
import profileIcon from '../../assets/images/profile_icon.png';
import genresIcon from '../../assets/images/genres_icon.png';

  
const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    borderTopColor:'black',
                    backgroundColor: 'black',
                    height: 40
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={MoviesStackNavigator} 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image 
                                source={moviesIcon}
                                resizeMode='contain'
                                style={[styles.icon, { tintColor: focused ? 'rgba(221,134,0,1)' : 'rgba(255,255,255,0.7)' }]}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="Genres" 
                component={GenresStackNavigator} 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image 
                                source={genresIcon}
                                resizeMode='contain'
                                style={[styles.icon, { height: 22, width: 22, tintColor: focused ? 'rgba(221,134,0,1)' : 'rgba(255,255,255,0.7)' }]}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileStackNavigator} 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image 
                                source={profileIcon}
                                resizeMode='contain'
                                style={[styles.icon, { tintColor: focused ? 'rgba(221,134,0,1)' : 'rgba(255,255,255,0.7)' }]}
                            />
                        </View>
                    )
                }}
            />
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
    },
    icon: {
        width: 30,
        height: 30,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
    }
})

export default AppTabNavigator;