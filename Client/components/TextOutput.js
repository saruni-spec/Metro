import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";
import styles from "../core/styles";
import { View } from "react-native";

export default function TextOutput(props) {
  return (
    <View style={styles.listItem}>
      <Text style={style.text} {...props} />
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 18,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 12,
    color: theme.colors.primary,
  },
});
