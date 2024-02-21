import React from "react";
import { View, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";
import styles from "../core/styles";
import validator from "validator";
import { useState } from "react";

export default function EmailInput({ setEmail, description, ...props }) {
  const [error, setError] = useState(null);

  const validateEmail = (input) => {
    setEmail(input);

    if (!input) {
      setError("Email is required.");
      return;
    }

    if (validator.isEmail(input)) {
      setError("");
    } else {
      setError("Please enter a valid email address.");
    }
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        onChangeText={(text) => validateEmail(text)}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
