import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Routes from './src/navigators/Routes';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
      <Routes/>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
