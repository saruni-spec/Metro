import React from "react";
import { useState, useCallback } from "react";
import axios from "axios";
import Background from "../components/Background";
import TextOutput from "../components/TextOutput";
import { ScrollView, View } from "react-native";
import Button from "../components/Button";
import { useFocusEffect } from "@react-navigation/native";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const MyBooking = () => {
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const fetchBooking = () => {
    setBooking(null);
    setIsLoading(true);
    axios
      .get("http://192.168.4.61:5000/bookings/my_booking", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        setBooking(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
        }
        setIsLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchBooking();
    }, [])
  );
  const handleRefresh = () => {
    fetchBooking();
  };

  const handleCancel = (booking_id) => {
    console.log(booking_id, "booking");
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.4.61:5000/bookings/cancel",
        {
          booking_id: booking_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        fetchBooking();
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
  console.log(paymentStatus);

  const handlePayment = (booking_id) => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("http://192.168.4.61:5000/bookings/payment", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.response);
      })
      .then((res) => {
        console.log("pending payment 1");
      })
      .then((res) => {
        // Start loading icon
        console.log("pending payment 2");

        // Set an interval to check the payment status every 5 seconds
        let intervalId = setInterval(() => {
          axios
            .post("http://192.168.4.61:5000/bookings/payment/status", {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res.data.status, "status");
              if (res.data.status === "COMPLETE") {
                clearInterval(intervalId);
                setPaymentStatus("paid");
              }

              if (res.data.status === "FAILED") {
                // If the payment is made or cancelled, stop the interval
                clearInterval(intervalId);
                setPaymentStatus("cancelled");

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

  const downloadDetails = async () => {
    const bookingDetails = [
      "Metropolitan Bus Booking Receipt",
      "Booking Details",
      "Booking ID : " + booking.id,
      "Transaction ID : " + booking.transaction_id,
      "Vehicle : " + booking.vehicle,
      "Date : " + booking.date,
      "From : " + booking.pickup,
      "To : " + booking.destination,
      "Status : " + booking.status,
      "Fare : " + booking.fare,
    ];
    const txtContent = bookingDetails.join("\n");

    const fileName = FileSystem.documentDirectory + "booking_details.txt";
    await FileSystem.writeAsStringAsync(fileName, txtContent);

    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(fileName);
    }
  };

  return (
    <Background>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ width: "100%" }}>
          <Button mode="outlined" onPress={() => handleRefresh(booking)}>
            Refresh
          </Button>
          {isLoading ? (
            <TextOutput>Loading...</TextOutput>
          ) : booking ? (
            <>
              {booking.status === "confirmed" && (
                <>
                  {booking.transaction_status !== "completed" && (
                    <Button
                      mode="outlined"
                      onPress={() => handleCancel(booking)}
                    >
                      Cancel
                    </Button>
                  )}

                  <Button
                    mode="outlined"
                    onPress={downloadDetails}
                    icon="share-variant-outline"
                  >
                    Share
                  </Button>
                </>
              )}

              <View style={{ width: "100%", padding: 20 }}>
                <TextOutput>Metropolitan Bus Booking</TextOutput>
                <TextOutput>Booking ID : {booking.id}</TextOutput>
                <TextOutput>
                  Transaction ID : {booking.transaction_id}
                </TextOutput>
                <TextOutput>Vehicle Plate : {booking.vehicle}</TextOutput>
                <TextOutput>Date of Booking : {booking.date}</TextOutput>
                <TextOutput>From : {booking.pickup}</TextOutput>
                <TextOutput>To : {booking.destination}</TextOutput>
                <TextOutput>Booking {booking.status}</TextOutput>
                <TextOutput>Fare : {booking.fare} Ksh</TextOutput>
                <TextOutput>Payment : {booking.transaction_status}</TextOutput>
              </View>
              {booking.transaction_status !== "completed" && (
                <Button mode="outlined" onPress={() => handlePayment(booking)}>
                  Pay
                </Button>
              )}
            </>
          ) : (
            <TextOutput>No active booking</TextOutput>
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default MyBooking;
