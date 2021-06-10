import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieScreen from '../screens/movie/MovieScreen';
import MainScreen from '../screens/movie/MainScreen';

  
const Stack = createStackNavigator();

const MoviesStackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Home"
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
                name="Home" 
                component={MainScreen} 
                options={{
                    headerTitle: 'Kinema'
                }}
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

export default MoviesStackNavigator;