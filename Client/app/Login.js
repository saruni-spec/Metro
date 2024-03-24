import { TouchableOpacity, View, Text } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import TextInput from "../components/input";
import Background from "../components/Background";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import TextOutput from "../components/TextOutput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.4.61:5000/login/",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.role === "driver") {
          navigation.navigate("CreateTrip");
        } else if (res.data.role === "admin") {
          navigation.navigate("Admin");
        } else if (res.data.role === "user") {
          navigation.navigate("Home");
        }
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          if (err.response.status === 400) {
            // Handle 400 error
            Alert.alert("Error", err.response.data.msg);
          } else {
            // Handle any other error status
            Alert.alert("Error", "An error occurred. Please try again.");
          }
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
          Alert.alert("Error", "No response from server. Please try again.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
          Alert.alert("Error", "An error occurred. Please try again.");
        }
      });
  };

  handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <Background>
      <TextOutput>Metro Bus Booking</TextOutput>

      <EmailInput
        label="Email"
        returnKeyType="next"
        value={email}
        setEmail={setEmail}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <PasswordInput
        label="password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <TouchableOpacity onPress={handleRegister}>
        <Text>Register</Text>
      </TouchableOpacity>
    </Background>
  );
};

export default Login;
