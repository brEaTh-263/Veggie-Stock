import React, { useState } from "react";
import { Button } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import { Alert } from "react-native";

const AuthScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter password</Text>
      <TextInput
        style={{ width: "90%" }}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        style={{ marginTop: 10 }}
        loading={isLoading}
        onPress={async () => {
          try {
            setIsLoading(true);
            await dispatch(authActions.validatePasswordAndGetToken(password));
            setIsLoading(false);
            navigation.navigate("Product");
          } catch (error) {
            setIsLoading(false);
            return Alert.alert(
              "Something went wrong",
              "Please check your password",
              [
                {
                  text: "Okay",
                },
              ]
            );
          }
        }}
      >
        Done
      </Button>
    </View>
  );
};

export const screenOptions = (navData = () => {
  return {
    headerShown: false,
  };
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 80,
    fontWeight: "bold",
  },
});

export default AuthScreen;
