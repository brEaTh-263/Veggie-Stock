import React, { useCallback, useEffect, useState } from "react";
import {
  TextInput,
  RadioButton,
  Checkbox,
  Portal,
  Dialog,
  Button,
} from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import InputSpinner from "react-native-input-spinner";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as productActions from "../store/actions/products";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import Categories from "../Components/ProductItem/Categories";
import SubCategories from "../Components/ProductItem/SubCategories";

const EditScreen = ({ navigation, route }) => {
  const { productId, newProduct } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state.Auth.token);
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.Products.products.filter((prod) => prod._id === productId)
  );
  const {
    control,
    handleSubmit,
    errors,
    getValues,
    setValue,
    setError,
  } = useForm();

  const [weightOnly, setWeightOnly] = useState(
    product.length > 0 ? product[0].weightOnly : false
  );
  const [qty, setQty] = useState(product.length > 0 ? product[0].quantity : 0);
  const [category, setCategory] = useState(
    product.length > 0 ? product[0].Category : "Vegetables"
  );
  const [subCategory, setSubCategory] = useState(
    product.length > 0 ? product[0].subCategory : ""
  );
  const [image, setImage] = useState(
    product.length > 0
      ? product[0].imageUrl
      : "https://image.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg"
  );
  const [visible, setVisible] = useState(false);

  const clickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.7,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (E) {
      console.log(E);
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
  });

  const onSubmit = async ({ name, indianName, priceKg, priceQty }) => {
    try {
      setIsLoading(true);
      const manipResult = await ImageManipulator.manipulateAsync(image, [
        { resize: { width: 720, height: 540 } },
      ]);
      const body = new FormData();
      body.append("image", {
        uri: manipResult.uri,
        type: "image/jpg",
        name: "productPic.jpg",
      });
      if (!newProduct) {
        await dispatch(
          productActions.editProductPic(token, body, product[0]._id)
        );
        await dispatch(
          productActions.editProduct(
            {
              _id: productId,
              name,
              indianName,
              priceKg,
              priceQty,
              quantity: qty,
              weightOnly: weightOnly,
              category: category,
              subCategory: subCategory,
            },
            token
          )
        );
      } else {
        await dispatch(
          productActions.addProduct(
            {
              name,
              indianName,
              priceKg,
              priceQty,
              quantity: qty,
              weightOnly: weightOnly,
              category: category,
              subCategory: subCategory,
            },
            token
          )
        );
        await dispatch(
          productActions.addProductPic(token, body, name, category)
        );
      }

      setIsLoading(false);
      navigation.navigate("Product");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return Alert.alert(
        "Something went wrong",
        "Please try again with correct credentials",
        [{ text: "Okay" }]
      );
    }
  };

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Actions style={{ flexDirection: "column" }}>
            <Button onPress={() => clickImage()} style={{ width: "100%" }}>
              Take a picture!
            </Button>
            <Button onPress={() => pickImage()} style={{ width: "100%" }}>
              Choose from gallery
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={{ margin: 10, height: 300 }}>
        <Image
          source={{ uri: image, cache: "reload" }}
          resizeMode="contain"
          style={{ width: "100%", height: "100%", borderRadius: 20 }}
        />
      </View>
      <TouchableOpacity
        style={{ flexDirection: "row", margin: 20, alignItems: "center" }}
        onPress={() => {
          setVisible(true);
        }}
      >
        <AntDesign name="edit" size={24} color="black" />
        <Text style={{ fontSize: 18, marginHorizontal: 20 }}>Edit pic</Text>
      </TouchableOpacity>
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

      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Quantity in Stock
        </Text>
        <View style={{ alignItems: "center" }}>
          <InputSpinner
            max={100}
            min={0}
            step={1}
            type="int"
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            value={qty}
            onChange={(num) => {
              setQty(num);
            }}
          />
        </View>
      </View>

      <Categories category={category} setCategory={setCategory} />

      <SubCategories
        setSubCategory={setSubCategory}
        subCategory={subCategory}
        category={category}
      />

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
              label="Price/Kg"
            />
          </View>
        )}
        name="priceKg"
        rules={{
          required: true,
          min: 0,
        }}
        defaultValue={product.length ? `${product[0].priceKg}` : ""}
      />
      {errors.priceKg && (
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
              label="Price/Qty"
            />
          </View>
        )}
        name="priceQty"
        rules={{
          required: true,
          min: 0,
        }}
        defaultValue={product.length ? `${product[0].priceQty}` : ""}
      />
      {errors.priceQty && (
        <View style={styles.errorMessage}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Give a valid price
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Checkbox
          status={weightOnly ? "checked" : "unchecked"}
          onPress={() => {
            setWeightOnly(!weightOnly);
          }}
        />
        <Text>Check this box if this product supports Kgs only</Text>
      </View>
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
