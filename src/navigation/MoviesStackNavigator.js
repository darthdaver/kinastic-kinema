import React from 'react';
import { View, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MovieScreen from '../screens/movie/MovieScreen';
import MainScreen from '../screens/movie/MainScreen';
import logo from '../../assets/images/kinema_logo.png';

  
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
                    backgroundColor: 'black',
                    height: 60
                }
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={MainScreen} 
                options={{
                    headerTitle: () => (
                        <View>
                            <Image 
                                source={logo}
                                resizeMode={'contain'}
                                style={{height: 50}}
                            />
                        </View>
                    )
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