import React, { useCallback, useEffect, useState } from "react";
import { TextInput, RadioButton } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as productActions from "../store/actions/products";
import { useForm, Controller } from "react-hook-form";

import { Alert } from "react-native";

const EditScreen = ({ navigation, route }) => {
  const { productId, newProduct } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.Auth.token);
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.Products.products.filter((prod) => prod._id === productId)
  );
  // console.log(product);
  const {
    control,
    handleSubmit,
    errors,
    getValues,
    setValue,
    setError,
  } = useForm();

  const onSubmit = async ({
    name,
    indianName,
    subCategory,
    price,
    quantity,
    imageUrl,
    category,
  }) => {
    if (
      category !== "Vegetables" &&
      category !== "Fruits" &&
      category !== "Foodgrains,Oil and Vinegar" &&
      category !== "Fish and Meat" &&
      category !== "Dairy,Bakery and Eggs" &&
      category !== "Canned and Packaged" &&
      category !== "Snacks and Beverages" &&
      category !== "Self-care and Hygiene"
    ) {
      setError("category", {
        shouldFocus: true,
      });
      return;
    }
    try {
      setIsLoading(true);
      if (newProduct) {
        await dispatch(
          productActions.addProduct(
            {
              name,
              indianName,
              category,
              subCategory,
              price,
              quantity,
              imageUrl,
            },
            token
          )
        );
      } else {
        console.log(name, indianName, category, subCategory, price, imageUrl);
        await dispatch(
          productActions.editProduct(
            {
              _id: productId,
              name,
              indianName,
              category,
              subCategory,
              price,
              quantity,
              imageUrl,
            },
            token
          )
        );
      }

      setIsLoading(false);
      navigation.navigate("Product");
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      return Alert.alert(
        "Something went wrong",
        "Please try again with correct credentials",
        [{ text: "Okay" }]
      );
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 20, paddingRight: 10 }}
            onPress={handleSubmit(onSubmit)}
          >
            <AntDesign name="check" size={24} color="black" />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="Name"
            />
          </View>
        )}
        name="name"
        rules={{
          required: true,
        }}
        defaultValue={product.length ? product[0].name : ""}
      />
      {errors.name && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Wrong!!</Text>
        </View>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="Indian Name"
            />
          </View>
        )}
        name="indianName"
        rules={{}}
        defaultValue={product.length ? product[0].indianName : ""}
      />
      {errors.indianName && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Wrong!!</Text>
        </View>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="Category"
            />
          </View>
        )}
        name="category"
        rules={{
          required: true,
        }}
        defaultValue={product.length ? product[0].Category : ""}
      />
      {errors.category && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Must be Vegetables or Fruits or Grains or Non-Veg
          </Text>
        </View>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="Price"
            />
          </View>
        )}
        name="price"
        rules={{
          required: true,
          min: 0,
        }}
        defaultValue={product.length ? `${product[0].price}` : ""}
      />
      {errors.price && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Give a valid price
          </Text>
        </View>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="Image Url"
            />
          </View>
        )}
        name="imageUrl"
        rules={
          {
            // required: true,
          }
        }
        defaultValue={
          product.length ? (product[0].imageUrl ? product[0].imageUrl : "") : ""
        }
      />
      {errors.imageUrl && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Wrong!!</Text>
        </View>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="Quantity"
            />
          </View>
        )}
        name="quantity"
        rules={
          {
            // required: true,
          }
        }
        defaultValue={product.length ? `${product[0].quantity}` : ""}
      />
      {errors.quantity && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Wrong!!</Text>
        </View>
      )}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={{ margin: 15 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              label="Sub Category"
            />
          </View>
        )}
        name="subCategory"
        rules={
          {
            // required: true,
          }
        }
        defaultValue={product.length ? product[0].subCategory : ""}
      />
      {errors.subCategory && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>Wrong!!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 15,
  },
  errorMessage: {
    color: "red",
    marginHorizontal: 15,
  },
});

export default EditScreen;
