import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
const Categories = ({ setCategory, category }) => {
  return (
    <View style={{ margin: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Choose a category
      </Text>
      <RadioButton.Group
        onValueChange={(newValue) => setCategory(newValue)}
        value={category}
      >
        <View style={styles.radioButtonContainerStyle}>
          <RadioButton value="Vegetables" />
          <Text style={styles.radioButtonTextStyle}>Vegetables</Text>
        </View>
        <View style={styles.radioButtonContainerStyle}>
          <RadioButton value="Fruits" />
          <Text style={styles.radioButtonTextStyle}>Fruits</Text>
        </View>
        <View style={styles.radioButtonContainerStyle}>
          <RadioButton value="Foodgrains,Oil and Vinegar" />
          <Text style={styles.radioButtonTextStyle}>
            Foodgrains,Oil and Vinegar
          </Text>
        </View>
        <View style={styles.radioButtonContainerStyle}>
          <RadioButton value="Fish and Meat" />
          <Text style={styles.radioButtonTextStyle}>Fish and Meat</Text>
        </View>
        <View style={styles.radioButtonContainerStyle}>
          <RadioButton value="Dairy,Bakery and Eggs" />
          <Text style={styles.radioButtonTextStyle}>Dairy,Bakery and Eggs</Text>
        </View>
        <View style={styles.radioButtonContainerStyle}>
          <RadioButton value="Canned and Packaged" />
          <Text style={styles.radioButtonTextStyle}>Canned and Packaged</Text>
        </View>
        <View style={styles.radioButtonContainerStyle}>
          <RadioButton value="Snacks and Beverages" />
          <Text style={styles.radioButtonTextStyle}>Snacks and Beverages</Text>
        </View>
        <View style={styles.radioButtonContainerStyle}>
          <RadioButton value="Self-care and Hygiene" />
          <Text style={styles.radioButtonTextStyle}>Self-care and Hygiene</Text>
        </View>
      </RadioButton.Group>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  radioButtonContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonTextStyle: {
    fontStyle: "italic",
    fontSize: 18,
  },
});
