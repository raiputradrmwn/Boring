import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import "./global.css";
import { useFonts } from "expo-font";
import { ActivityIndicator } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    "Goli-Bold": require("./assets/font/Goli-Bold.ttf"),
    "Goli-Regular": require("./assets/font/Goli-Regular.ttf"),
    "Goli-Medium": require("./assets/font/Goli-Medium.ttf"),
    "Goli-Light": require("./assets/font/Goli-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return <AppNavigator />;
}
