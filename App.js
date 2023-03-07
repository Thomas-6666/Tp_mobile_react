import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider } from 'react-native-toast-message';

import Root from "./Root";

export default function App() {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}