import React, { useState, useCallback } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";
import ProductItem from "../Components/ProductItem";

const SearchScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const allProducts = useSelector((state) => state.Products.products);
  const [items, setItems] = useState([]);

  const fetchData = useCallback(async () => {
    navigation.navigate("Product");
  }, []);

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const onChangeSearch = async (text) => {
    const searched = allProducts.filter((product) => {
      let name = product.name.toLowerCase();
      let indianName;
      if (product.indianName) {
        indianName = product.indianName.toLowerCase();
      } else {
        indianName = product.name.toLowerCase();
      }
      if (
        name.includes(text.toLowerCase()) ||
        indianName.includes(text.toLowerCase())
      ) {
        return true;
      } else false;
    });
    console.log(searched);
    setItems(searched);
  };
  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <Searchbar
        style={{ margin: 10 }}
        placeholder="Search"
        onChangeText={onChangeSearch}
      />
      <FlatList
        data={items}
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
  );
};

SearchScreen.navigationOptions = {
  headerShown: false,
};

export default SearchScreen;
