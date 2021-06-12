import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTabNavigator from './AppTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import SplashScreen from '../screens/auth/SplashScreen';
import { observer } from 'mobx-react';
import { useRootStore } from '../store/contexts/RootContext';
import AuthConstants from '../constants/auth';

const SwitchNavigator = observer(() => {
    const { authStore } = useRootStore();

    if (authStore.state === AuthConstants.LOADING) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>{
            authStore.state === AuthConstants.AUTHENTICATED ? (
                <AppTabNavigator />
            ) : (
                <AuthStackNavigator />
            )
        }</NavigationContainer>
    )
});

export default SwitchNavigator;