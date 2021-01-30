import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigator from "./src/navigator/AppNavigator";
import { name as appName } from "./app.json";
import { Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import AuthReducer from "./src/store/reducer/auth";
import ProductsReducer from "./src/store/reducer/products";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Products: ProductsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
