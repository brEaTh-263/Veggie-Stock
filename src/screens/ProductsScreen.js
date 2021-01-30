import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../Components/ProductItem";
import { FAB } from "react-native-paper";
import * as productActions from "../store/actions/products";
import { TouchableOpacity } from "react-native";

const ProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.Auth.token);
  const products = useSelector((state) => state.Products.products);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    await dispatch(productActions.getAllProducts(token));
    setIsLoading(false);
  }, [setIsLoading, dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchData);
    fetchData();
    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <FAB
          small={false}
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate("Edit", { newProduct: true })}
        />
        <FAB
          style={{
            position: "absolute",
            margin: 16,
            right: 10,
            bottom: 70,
            zIndex: 1,
          }}
          small
          icon="magnify"
          onPress={() => navigation.navigate("Search")}
        />
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <ProductItem
                name={item.name}
                indianName={item.indianName}
                imageUrl={item.imageUrl}
                price={item.price}
                Category={item.Category}
                subCategory={item.subCategory}
                quantity={item.quantity}
                _id={item._id}
                fetchData={fetchData}
                setIsLoading={setIsLoading}
              />
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

ProductScreen.navigationOptions = {
  headerShown: false,
};

export default ProductScreen;
