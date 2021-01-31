import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
// import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as productActions from "../store/actions/products";
import { useSelector, useDispatch } from "react-redux";

const ProductItem = ({
  name,
  indianName,
  imageUrl,
  price,
  quantity,
  _id,
  Category,
  subCategory,
  setIsLoading,
  fetchData,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector((state) => state.Auth.token);
  const tryingToDeleteItemAlert = () => {
    return Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "Press confirm to continue",
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              setIsLoading(true);
              await dispatch(productActions.deleteProduct(_id, token));
              setIsLoading(false);
              fetchData();
            } catch (error) {
              setIsLoading(false);
              return Alert.alert("Something went wrong", "Please try again", [
                { text: "OKay" },
              ]);
            }
          },
        },
        { text: "No" },
      ]
    );
  };

  return (
    <Card style={{ margin: 15 }}>
      <Card.Cover
        resizeMode="contain"
        source={{
          uri: imageUrl
            ? imageUrl
            : "https://th.bing.com/th/id/OIP.ouOFcEHOYh7Dj3JCmDUfhwAAAA?pid=Api&rs=1",
          cache: "reload",
        }}
      />
      <Card.Title title={name} subtitle={indianName ? indianName : name} />
      <Divider />
      <Card.Content>
        <Title>{Category}</Title>
        <Paragraph>{subCategory ? subCategory : "None"}</Paragraph>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {quantity === 0 ? (
            <Text style={{ fontSize: 18, marginTop: 5 }}>Out of stock</Text>
          ) : (
            <Text style={{ fontSize: 18, marginTop: 5 }}>Qty:{quantity}</Text>
          )}

          <Text style={{ fontSize: 18, fontStyle: "italic" }}>
            Rs{price}/kg
          </Text>
        </View>
      </Card.Content>

      <Card.Actions>
        <Button onPress={() => navigation.navigate("Edit", { productId: _id })}>
          Edit
        </Button>
        <Button color="red" onPress={() => tryingToDeleteItemAlert()}>
          DELETE
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ProductItem;
