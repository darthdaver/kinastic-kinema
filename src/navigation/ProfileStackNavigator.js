import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/auth/ProfileScreen';

  
const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Profile"
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
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    headerTitle: 'Profile'
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator;