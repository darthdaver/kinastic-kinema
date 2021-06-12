import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../screens/auth/LogInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="LogIn"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="LogIn" 
                component={LogInScreen}
            />
            <Stack.Screen 
                name="SignUp" 
                component={SignUpScreen} 
            />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator;