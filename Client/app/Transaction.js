import React, { useState } from "react";
import { View } from "react-native";
import TextOutput from "../components/TextOutput";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import Indicator from "../components/ActivityIndicator";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const Transaction = ({ prevStep, selectedBus, setStep, booking_id }) => {
  const navigation = useNavigation();
  const [response, setResponse] = useState({});
  const [status, setStatus] = useState("");

  const handlePayment = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("http://192.168.212.61:5000/bookings/payment", {
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
            .post(
              "http://192.168.212.61:5000/bookings/payment/status",
              { trip_id: selectedBus.trip.trip_id },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              console.log(res.data.status, "status");
              if (res.data.status === "COMPLETE") {
                clearInterval(intervalId);
                setStatus("paid");
                navigation.navigate("MyBooking");
              }

              if (res.data.status === "FAILED") {
                // If the payment is made or cancelled, stop the interval
                clearInterval(intervalId);
                setStatus("cancelled");
                prevStep();

                // Handle the payment status
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

  const handleCancel = (id) => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.212.61:5000/bookings/cancel",
        {
          id: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        Alert.alert(
          "Success",
          "Booking Cancelled",
          [
            {
              text: "OK",
              onPress: () => {
                setStep(1);
              },
            },
          ],
          { cancelable: false }
        );
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

  const downloadDetails = async () => {
    const rideDetails = [
      "Vehicle " + selectedBus.trip.vehicle,
      "Date " + selectedBus.trip.depature_time,
      "Route " + selectedBus.trip.route,
      "Fare " + selectedBus.trip.fare,
      "Status " + status,
    ];
    const txtContent = rideDetails.join("\n");

    const fileName = FileSystem.documentDirectory + "ride_details.txt";
    await FileSystem.writeAsStringAsync(fileName, txtContent);

    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(fileName);
    }
  };

  return (
    <View style={{ width: "100%", padding: 20, height: "80%", zIndex: 1 }}>
      <View>
        <TextOutput>Transaction status : {status}</TextOutput>
      </View>
      {status === "pending" && <Indicator />}
      {status === "cancelled" && <TextOutput>Payment Cancelled</TextOutput>}
      {status === "paid" && (
        <Button
          mode="contained"
          onPress={downloadDetails}
          icon="share-variant-outline"
        >
          Share
        </Button>
      )}
      <View>
        <TextOutput>{selectedBus.trip.route}</TextOutput>
      </View>
      <View>
        <TextOutput>Vehicle:{selectedBus.trip.vehicle}</TextOutput>
        <TextOutput>Depature:{selectedBus.trip.depature_time}</TextOutput>

        <TextOutput>Fare: {selectedBus.trip.fare}</TextOutput>
      </View>

      {status !== "paid" && (
        <Button mode="contained" onPress={handlePayment}>
          Pay
        </Button>
      )}
      <Button mode="contained" onPress={() => handleCancel("id")}>
        Cancel
      </Button>
    </View>
  );
};

export default Transaction;
