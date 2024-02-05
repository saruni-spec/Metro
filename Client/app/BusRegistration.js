import React from "react";
import Background from "../components/Background";
import TextInput from "../components/input";
import Button from "../components/Button";
import Picker from "../components/Picker";
import { useState } from "react";
import axios from "axios";

const BusRegistration = () => {
  const [numberPlate, setNumberPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const handleRegister = () => {};
  axios.defaults.xsrfCookieName = "csrf_token";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.post("http://localhost:5000/user_registration/", {}).then();

  return (
    <Background>
      <TextInput
        label="Number Plate"
        returnKeyType="next"
        value={numberPlate}
        onChangeText={(text) => setNumberPlate(text)}
      />
      <Picker
        items={{ bus: "Bus", "mini Bus": "Matatu" }}
        selectedValue={vehicleType}
        onValueChange={(itemValue) => setVehicleType(itemValue)}
      />

      <TextInput
        label="Capacity"
        value={capacity}
        returnKeyType="next"
        onChangeText={(text) => setCapacity(text)}
      />

      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
    </Background>
  );
};

export default BusRegistration;
