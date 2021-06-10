import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppTabNavigator from './src/navigation/AppTabNavigator';
import StoreProvider from './src/store/StoreContext';


const App = () => {

  return (
    <SafeAreaProvider>
      <StoreProvider>
        <AppTabNavigator />
      </StoreProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({})

export default App;
