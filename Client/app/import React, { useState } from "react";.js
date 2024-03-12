import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import validator from "validator";

export default function App() {
  // State to hold the email input
  const [email, setEmail] = useState("");
  // State to hold any validation error messages
  const [error, setError] = useState(null);
  // Function to validate the entered email
  const validateEmail = (input) => {
    // Update the email state with the input
    setEmail(input);
    // Check if the email input is empty
    if (!input) {
      setError("Email is required.");
      return;
    }
    // Check if the input is a valid email using the validator library
    if (validator.isEmail(input)) {
      setError("");
    } else {
      setError("Please enter a valid email address.");
    }
  };
  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          // On change of text, validate the email
          onChangeText={validateEmail}
          placeholder="Enter your email"
        />
        {/* Display the error/validation markers if applicable */}
        {error !== null &&
          (error ? (
            <Text style={styles.invalidMark}>✗</Text>
          ) : (
            <Text style={styles.validMark}>✓</Text>
          ))}
      </View>
      {/* Display the error message if there is one */}
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}
// Styles for the app components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row", // Align children horizontally
    alignItems: "center", // Align children vertically in the center
  },
  input: {
    flex: 1, // Take all available horizontal space
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorMessage: {
    color: "red",
  },
  validMark: {
    color: "green",
    marginLeft: 5,
    fontSize: 20,
  },
  invalidMark: {
    color: "red",
    marginLeft: 5,
    fontSize: 20,
  },
});
