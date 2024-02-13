import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { theme } from "../core/theme";

export default function TextOutput(props) {
  return <Text style={styles.text} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 12,
    color: theme.colors.primary,
  },
});
