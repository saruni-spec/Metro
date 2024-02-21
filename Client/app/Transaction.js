import React, { useState } from "react";
import { View } from "react-native";
import TextOutput from "../components/TextOutput";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import Indicator from "../components/ActivityIndicator";
import axios from "axios";

const Transaction = ({ prevStep, selectedBus }) => {
  const [response, setResponse] = useState({});
  const [status, setStatus] = useState("");

  const handlePayment = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("http://192.168.0.104:5000/bookings/payment", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.response);
        setResponse(res.data.response);
      })
      .then((res) => {
        console.log("pending payment 1");

        console.log(response);
      })
      .then((res) => {
        // Start loading icon
        console.log("pending payment 2");
        setStatus("pending");
        // Set an interval to check the payment status every 5 seconds
        let intervalId = setInterval(() => {
          axios
            .post("http://192.168.0.104:5000/bookings/payment/status", {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res.data.status, "status");
              if (
                res.data.status === "COMPLETE" ||
                res.data.status === "CANCELLED"
              ) {
                // If the payment is made or cancelled, stop the interval
                clearInterval(intervalId);

                // Handle the payment status
                if (res.data.status === "COMPLETE") {
                  // Handle successful payment
                  setStatus("paid");
                } else {
                  // Handle cancelled payment
                  setStatus("cancelled");
                }
              }
            })
            .catch((error) => console.error("Error:", error));
        }, 5000);
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
  };

  return (
    <View style={{ width: "100%", padding: 20, height: "80%", zIndex: 1 }}>
      {status !== "paid" && <BackButton onPress={prevStep} />}
      <View>
        <TextOutput>Transaction status : {status}</TextOutput>
      </View>
      {status === "pending" && <Indicator />}

      <View>
        <TextOutput>{selectedBus.trip.route}</TextOutput>
      </View>
      <View>
        <TextOutput>Vehicle:{selectedBus.trip.vehicle}</TextOutput>

        <TextOutput>Fare: {selectedBus.trip.fare}</TextOutput>
      </View>

      {status !== "paid" && (
        <Button mode="contained" onPress={handlePayment}>
          Pay
        </Button>
      )}
    </View>
  );
};

export default Transaction;
