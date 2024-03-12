import React from "react";
import { StyleSheet } from "react-native";
import { Text, Divider } from "react-native-paper";
import { theme } from "../core/theme";
import styles from "../core/styles";
import { View } from "react-native";

export default function TextOutput(props) {
  return (
    <View style={style.container}>
      <Text style={style.text} {...props} />
      <Divider />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: 200,
    padding: 10,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 12,
    fontWeight: "semibold",
  },
});
