import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/AuthScreen";
import EditScreen from "../screens/EditScreen";
import ProductScreen from "../screens/ProductsScreen";
import SearchScreen from "../screens/SearchScreen";
import { screenOptions as AuthScreenOptions } from "../screens/AuthScreen";
// import { screenOptions as EditScreenOptions } from "../screens/EditScreen";
const MainStackNavigator = createStackNavigator();
import React from "react";

export const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthScreenOptions}
      />
      <MainStackNavigator.Screen
        name="Edit"
        component={EditScreen}
        // options={EditScreenOptions}
      />
      <MainStackNavigator.Screen
        name="Product"
        component={ProductScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />
      <MainStackNavigator.Screen
        name="Search"
        component={SearchScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />
    </MainStackNavigator.Navigator>
  );
};
