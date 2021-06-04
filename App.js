import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppTabNavigator from './src/navigation/AppTabNavigator';

const App = () => {

  return (
    <SafeAreaProvider>
      <AppTabNavigator />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({})

export default App;
