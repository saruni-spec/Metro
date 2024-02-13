import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import TextOutput from "../components/TextOutput";
import Button from "../components/Button";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Booking = ({ prevStep, selectedBus }) => {
  const navigation = useNavigation();
  console.log(selectedBus, "selectedBus");
  const [busBooked, setBusBooked] = useState(false);

  const bookBus = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://localhost:5000/bookings/",
        {
          vehicle: selectedBus.trip.vehicle,
          trip_id: selectedBus.trip.trip_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          if (err.response.status === 401) {
            navigation.navigate("Login");
          }
          if (err.response.status === 400) {
            // Handle 400 error
            console.log("Error", err.response.data.msg);
          } else {
            // Handle any other error status
            console.log("Error", "An error occurred. Please try again.");
          }
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
          console.log("Error", "No response from server. Please try again.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
          console.log("Error", "An error occurred. Please try again.");
        }
      });

    console.log("Booking Bus");
  };

  return (
    <View>
      {!busBooked && (
        <Button mode="contained" onPress={prevStep}>
          Back
        </Button>
      )}

      <View>
        <TextOutput>Trip Details</TextOutput>
      </View>
      <View>
        <TextOutput>{selectedBus.trip.route}</TextOutput>
      </View>
      <View>
        <TextOutput>{selectedBus.trip.vehicle}</TextOutput>
        <TextOutput>{selectedBus.trip.sacco}</TextOutput>
        <TextOutput>{selectedBus.trip.driver}</TextOutput>
      </View>
      <View>
        <TextOutput>{selectedBus.trip.available_seats}</TextOutput>
        <TextOutput>{selectedBus.trip.depature_time}</TextOutput>
        <TextOutput>{selectedBus.trip.fare}</TextOutput>
      </View>
      {!busBooked && (
        <Button mode="contained" onPress={bookBus}>
          Book
        </Button>
      )}
    </View>
  );
};

export default Booking;
