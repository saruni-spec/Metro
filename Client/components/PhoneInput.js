import React from "react";
import { View, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";
import styles from "../core/styles";

export default function PhoneInput({ description, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Phone Number</Text>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        render={(props) => (
          <Input
            {...props}
            value={
              props.value && props.value.startsWith("254")
                ? props.value
                : `254${props.value}`
            }
            onChangeText={(text) => {
              if (text.startsWith("254")) {
                props.onChangeText(text);
              } else {
                props.onChangeText(`254${text}`);
              }
            }}
          />
        )}
        {...props}
      />
    </View>
  );
}
