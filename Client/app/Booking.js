import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import TextOutput from "../components/TextOutput";
import Button from "../components/Button";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import styles from "../core/styles";
import BackButton from "../components/BackButton";
import { Alert } from "react-native";

const Booking = ({ prevStep, nextStep, selectedBus, setBookingId }) => {
  const navigation = useNavigation();
  console.log(selectedBus, "selectedBus");
  const [busBooked, setBusBooked] = useState(false);

  const bookBus = () => {
    setBusBooked(true);
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.4.61:5000/bookings/",
        {
          vehicle: selectedBus.trip.vehicle,
          trip_id: selectedBus.trip.trip_id,
          fare: selectedBus.trip.fare,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setBookingId(res.data.booking_id);
        nextStep();
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
          if (err.response.status === 404) {
            Alert.alert(
              "Failed",
              "You have an active booking. Please cancel it to book another bus.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("MyBooking");
                  },
                },
              ],
              { cancelable: false }
            );
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
    <ScrollView
      style={{ width: "100%", padding: 20, height: "80%", zIndex: 1 }}
    >
      {!busBooked && <BackButton goBack={prevStep} />}

      <View>
        <TextOutput>Metropolitan Bus Booking</TextOutput>
        <TextOutput>Trip Id : {selectedBus.trip.trip_id}</TextOutput>

        <TextOutput>{selectedBus.trip.route}</TextOutput>
      </View>
      <View>
        <TextOutput>Vehicle:{selectedBus.trip.vehicle}</TextOutput>
        <TextOutput>
          Available Seats:{selectedBus.trip.available_seats}
        </TextOutput>
        <TextOutput>Depature Time: {selectedBus.trip.depature_time}</TextOutput>
        <TextOutput>Fare: {selectedBus.trip.fare}</TextOutput>
      </View>
      <View>
        <TextOutput>Sacco:{selectedBus.trip.sacco}</TextOutput>
        <TextOutput>Driver:{selectedBus.trip.driver}</TextOutput>
      </View>

      {!busBooked && (
        <Button mode="contained" onPress={bookBus}>
          Book
        </Button>
      )}
      {busBooked && (
        <Button mode="contained" onPress={bookBus}>
          Proceed to Payment
        </Button>
      )}
    </ScrollView>
  );
};

export default Booking;
