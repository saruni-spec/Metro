import { View, Text } from "react-native";
import React, { useEffect } from "react";
import TextOutput from "../components/TextOutput";

const Index = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 5000);

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts.
  }, [navigation]);
  return (
    <View>
      <TextOutput>Metro</TextOutput>
    </View>
  );
};

export default Index;
