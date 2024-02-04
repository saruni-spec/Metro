import React from "react";
import { View } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";
import styles from "../core/styles";

export default function TextInput({ description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
    </View>
  );
}
