import React, { useState } from "react";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { View } from "react-native";
import { theme } from "../core/theme";
import styles from "../core/styles";

export default function Picker({ items }) {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.container}>
      <RNPicker
        selectedValue={selectedValue}
        height={50}
        width={150}
        style={styles.input}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        {Object.entries(items).map(([label, value], index) => (
          <RNPicker.Item key={index} label={label} value={value} />
        ))}
      </RNPicker>
    </View>
  );
}
