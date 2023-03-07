import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Index from "./views/Index";
import Infos from "./views/Infos";

const Stack = createStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Accueil" component={Index} />
      <Stack.Screen name="Infos" component={Infos} />
    </Stack.Navigator>
  );
}