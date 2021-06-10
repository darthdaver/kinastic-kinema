import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SwitchNavigator from './src/navigation/SwitchNavigator';

const App = () => {

  return (
    <SafeAreaProvider>
        <SwitchNavigator />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({})

export default App;
