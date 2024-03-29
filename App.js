import React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SwitchNavigator from './src/navigation/SwitchNavigator';
import RootStoreProvider from './src/store/contexts/RootContext';

const App = () => {

  return (
    <SafeAreaProvider>
      <RootStoreProvider>
        <SwitchNavigator />
        <FlashMessage position="top" />
      </RootStoreProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({})

export default App;
