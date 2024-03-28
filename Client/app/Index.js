import { View, Text } from "react-native";
import React, { useEffect } from "react";
import TextOutput from "../components/TextOutput";

const Index = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 6000);

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts.
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextOutput>Metro Bus Booking</TextOutput>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Index;
