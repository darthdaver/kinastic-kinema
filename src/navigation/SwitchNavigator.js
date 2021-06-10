import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTabNavigator from './AppTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';

const SwitchNavigator = () => {
    const isSignedIn = true;
    return (
        <NavigationContainer>{
            isSignedIn ? (
                <AppTabNavigator />
            ) : (
                <AuthStackNavigator />
            )
        }</NavigationContainer>
    )
}

export default SwitchNavigator;