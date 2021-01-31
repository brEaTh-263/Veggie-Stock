import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { subCategories } from "../../../raw-data";
import { RadioButton } from "react-native-paper";

const SubCategories = ({ subCategory, setSubCategory, category }) => {
  return (
    <View style={{ margin: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Choose a sub-category
      </Text>
      <RadioButton.Group
        onValueChange={(newValue) => setSubCategory(newValue)}
        value={subCategory}
      >
        {subCategories.map((cat) => {
          if (cat.category === category) {
            return cat.subCategories.map((x) => {
              return (
                <View style={styles.radioButtonContainerStyle} key={x._id}>
                  <RadioButton value={x.name} />
                  <Text style={styles.radioButtonTextStyle}>{x.name}</Text>
                </View>
              );
            });
          }
        })}
      </RadioButton.Group>
    </View>
  );
};

export default SubCategories;

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
