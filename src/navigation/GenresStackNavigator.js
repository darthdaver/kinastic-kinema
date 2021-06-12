import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GenresScreen from '../screens/movie/GenresScreen';
import GenreScreen from '../screens/movie/GenreScreen';
import MovieScreen from '../screens/movie/MovieScreen';

  
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
                    backgroundColor: 'rgba(221,134,0,1)'
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