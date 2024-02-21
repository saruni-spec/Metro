import { useState } from "react";
import axios from "axios";
import TextInput from "../components/input";
import Button from "../components/Button";
import Background from "../components/Background";
import PasswordInput from "../components/PasswordInput";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import EmailInput from "../components/EmailInput";

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const checkPassword = (text) => {
    if (text !== password) {
      setPasswordMatch(false);
      setConfirmPassword(text);
    } else {
      setPasswordMatch(true);
      setConfirmPassword(text);
    }
  };

  handleRegister = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("http://192.168.0.104:5000/user_registration/", {
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
        confirmPassword,
      })
      .then((res) => {
        console.log(res.data);
        Alert.alert(
          "Success",
          "Account Registered",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ],
          { cancelable: false }
        );
      })

      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  return (
    <Background>
      <TextInput
        label="Fisrt Name"
        returnKeyType="next"
        autoCapitalize="words"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName}
        autoCapitalize="words"
        onChangeText={(text) => setLastName(text)}
      />
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

      <TextInput
        label="Phone Number"
        value={phoneNumber}
        returnKeyType="next"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        onChangeText={(text) => setPhoneNumber(text)}
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
        onChangeText={(text) => checkPassword(text)}
      />
      {confirmPassword !== "" && passwordMatch !== true && (
        <Text>Passwords don't match</Text>
      )}

      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
    </Background>
  );
};

export default Register;
