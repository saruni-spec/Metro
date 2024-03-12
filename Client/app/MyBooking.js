import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Background from "../components/Background";
import TextOutput from "../components/TextOutput";
import { View } from "react-native";
import Button from "../components/Button";

const MyBooking = () => {
  const [booking, setBooking] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://192.168.222.61:5000/bookings/my_booking", {
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
          setBooking({ status: "No active booking" });
        }
      });
  }, [setIsLoading]);

  const handleCancel = (booking_id) => {
    console.log(booking_id, "booking");
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.222.61:5000/bookings/cancel",
        {
          booking_id: booking_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setBooking({ status: "No active booking" });
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
    <Background>
      {isLoading ? (
        <TextOutput>Loading...</TextOutput>
      ) : booking ? (
        <>
          <Button mode="outlined" onPress={() => handleCancel(booking)}>
            Cancel
          </Button>
          <View
            style={{ width: "100%", padding: 20, height: "80%", zIndex: 1 }}
          >
            <TextOutput>{booking.vehicle}</TextOutput>
            <TextOutput>{booking.date}</TextOutput>
            <TextOutput>{booking.pickup}</TextOutput>
            <TextOutput>{booking.destination}</TextOutput>
            <TextOutput>{booking.status}</TextOutput>
          </View>
        </>
      ) : (
        <TextOutput>No active booking</TextOutput>
      )}
    </Background>
  );
};

export default MyBooking;
