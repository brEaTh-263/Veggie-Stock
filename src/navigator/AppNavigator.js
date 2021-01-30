import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { MainNavigator } from "./Navigator";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
