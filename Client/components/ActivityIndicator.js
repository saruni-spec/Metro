import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "../core/theme";

const Indicator = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={theme.colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Indicator;
