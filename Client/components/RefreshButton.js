import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const RefreshButton = ({ onRefresh }) => {
  return (
    <Button
      style={styles.refreshButton}
      onPress={onRefresh}
      icon="refresh"
    ></Button>
  );
};

const styles = StyleSheet.create({
  refreshButton: {
    marginRight: 16,
  },
});

export default RefreshButton;
