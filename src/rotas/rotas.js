import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RotasStack } from "./stackRotas";

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <RotasStack />
    </NavigationContainer>
  );
};
