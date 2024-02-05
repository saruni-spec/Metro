import React from "react";
import Background from "../components/Background";
import TextInput from "../components/input";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import axios from "axios";

const SaccoRegistration = () => {
  const [saccoName, setSaccoName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("http://localhost:5000/sacco_registration/", {
        saccoName,
        description,
        location,
        phoneNumber,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Background>
      <TextInput
        label="Sacco/Bus Name"
        returnKeyType="next"
        value={saccoName}
        onChangeText={(text) => setSaccoName(text)}
      />
      <TextInput
        label="Sacco/Bus Description"
        returnKeyType="next"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        label="Sacco/Bus General Location"
        returnKeyType="next"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <TextInput
        label="Contact Number"
        value={phoneNumber}
        returnKeyType="next"
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <PasswordInput
        label="password"
        returnKeyType="next"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <PasswordInput
        label="Confirm password"
        returnKeyType="done"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
    </Background>
  );
};

export default SaccoRegistration;
