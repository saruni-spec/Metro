import { useState, useEffect, useCallback } from "react";
import Background from "../components/Background";
import { TouchableOpacity, View, ScrollView } from "react-native";
import axios from "axios";
import { Divider, Text } from "react-native-paper";
import styles from "../core/styles";
import BackButton from "../components/BackButton";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../components/Button";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const History = () => {
  const [currentTrip, setCurrentTrip] = useState(null);
  const [history, setHistory] = useState([]);

  const viewTrip = (trip_id) => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.212.61:5000/profile/current_trip",
        {
          trip_id: trip_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data, "     //////");
        setCurrentTrip(res.data.data);
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
              "Trip does not exist.",
              [
                {
                  text: "OK",
                  onPress: () => {},
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
  };

  useFocusEffect(
    useCallback(() => {
      axios
        .get("http://192.168.212.61:5000/profile/driver_history", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.data.trips);

          setHistory(res.data.data.trips);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {currentTrip ? (
        <Trip trip={currentTrip} setCurrentTrip={setCurrentTrip} />
      ) : (
        <AllTrips history={history} viewTrip={viewTrip} />
      )}
    </ScrollView>
  );
};

const AllTrips = ({ history, viewTrip }) => {
  const downloadDetails = async () => {
    const header = ["Route", "Date"];
    const data = history.map((item) => [item.route, item.depature_time]);
    const csvContent = [header, ...data].map((e) => e.join(",")).join("\n");
    const fileName = FileSystem.documentDirectory + "all_history.csv";
    await FileSystem.writeAsStringAsync(fileName, csvContent);
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(fileName);
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <Button
        mode="outlined"
        onPress={downloadDetails}
        icon="share-variant-outline"
      >
        Share
      </Button>
      {history.map((item, key) => (
        <TouchableOpacity
          onPress={() => {
            viewTrip(item.trip_id);
          }}
          key={key}
          style={{ padding: 10, margin: 10 }}
        >
          <View>
            <Text>Trip ID : {item.trip_id}</Text>
            <Text>Route : {item.route}</Text>
            <Text>Date : {item.depature_time}</Text>

            <Divider />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Trip = ({ trip, setCurrentTrip }) => {
  const downloadDetails = async () => {
    const tripDetails = [
      ["Metropolitan Bus Booking Receipt", "Metropolitan Bus Booking Receipt"],
      ["Route", trip.route],
      ["Trip ID", trip.trip_id],
      ["Departure Time", trip.depature_time],
      ["Fare", trip.fare],
      ["Booked Seats", trip.booked_seats],
      ["Total Paid in Ksh", Number(trip.fare) * Number(trip.booked_seats)],
    ];

    const passengerHeader = [
      "Name",
      "Phone",
      "Booking ID",
      "Destination",
      "Amount in Ksh",
      "Status",
    ];
    const passengerData = trip.passengers.map((passenger) => [
      passenger.name,
      passenger.phone,
      passenger.booking_id,
      passenger.destination,
      passenger.amount,
      passenger.status,
    ]);

    const csvContent = [
      ...tripDetails,
      [], // empty row for separation
      passengerHeader,
      ...passengerData,
    ]
      .map((e) => e.join(","))
      .join("\n");

    const fileName = FileSystem.documentDirectory + "trip_details.csv";
    await FileSystem.writeAsStringAsync(fileName, csvContent);

    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(fileName);
    }
  };

  return (
    <>
      <BackButton goBack={() => setCurrentTrip(null)} />
      <Button
        mode="outlined"
        onPress={downloadDetails}
        icon="share-variant-outline"
      >
        Share
      </Button>
      <View style={{ width: "90%", padding: 20, margin: 10 }}>
        <Text>Metropolitan Bus Booking</Text>
        <Text>Trip ID : {trip.trip_id}</Text>
        <Text>Route : {trip.route}</Text>
        <Text>Deapture time: {trip.depature_time}</Text>
        <Text>Fare : {trip.fare}</Text>
        <Text>Booked seats : {trip.booked_seats}</Text>
        <Text>
          Total paid : {Number(trip.fare) * Number(trip.booked_seats)} Ksh
        </Text>
      </View>
      <View style={{ width: "90%", padding: 20, margin: 10 }}>
        {trip.passengers.map((passenger, key) => (
          <View key={key} style={{ padding: 5, margin: 5 }}>
            <Text>Name : {passenger.name}</Text>
            <Text>Phone Number : {passenger.phone}</Text>
            <Text>Booking ID : {passenger.booking_id}</Text>
            <Text>Destination : {passenger.destination}</Text>
            <Text>Amount : {passenger.amount} Ksh</Text>
            <Text>Payment Status : {passenger.status}</Text>

            <Divider />
          </View>
        ))}
      </View>
    </>
  );
};

export default History;
