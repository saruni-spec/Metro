import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import styles from "../core/styles";

export default function PasswordInput({ description, ...props }) {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        secureTextEntry={isPasswordSecure}
        {...props}
        right={
          <Input.Icon
            icon="eye"
            onPress={() => {
              setIsPasswordSecure(!isPasswordSecure);
            }}
          />
        }
      />
    </View>
  );
}
