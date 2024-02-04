import { View, Text } from "react-native";
import React, { useEffect } from "react";

const Index = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 1000);

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts.
  }, [navigation]);
  return (
    <View>
      <Text>Metro</Text>
    </View>
  );
};

export default Index;
