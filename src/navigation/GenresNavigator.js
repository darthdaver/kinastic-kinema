import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GenresScreen from '../screens/GenresScreen';
import GenreScreen from '../screens/GenreScreen';
import MovieScreen from '../screens/MovieScreen';

  
const Stack = createStackNavigator();

const GenresStackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Genres"
            screenOptions={{
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerMode: 'none',
                headerStyle: {
                    backgroundColor: 'black'
                }
            }}
        >
            <Stack.Screen 
                name="Genres" 
                component={GenresScreen} 
                options={{
                    headerTitle: 'Movie Genres'
                }}
            />
            <Stack.Screen 
                name="Genre" 
                component={GenreScreen} 
                options={({route}) => ({
                    headerTitle: route.params.name,
                })}
            />
            <Stack.Screen 
                name="Movie" 
                component={MovieScreen}
                options={({route}) => ({
                    headerTitle: route.params.title,
                })}
            />
        </Stack.Navigator>
    )
}

export default GenresStackNavigator;