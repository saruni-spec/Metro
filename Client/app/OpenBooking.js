import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import SearchableList from "../components/searchable";
import axios from "axios";
import { View } from "react-native";
import TextInput from "../components/input";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const OpenBooking = () => {
  const navigation = useNavigation();
  const [stations, setStations] = useState([]);
  const [stationSearch, setStationSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [fare, setFare] = useState(0);
  const [pickupStation, setPickupStation] = useState("");
  const [destination, setDestination] = useState("");

  destinationSelected = (destination) => {
    setDestination(destination);
  };

  pickupStationSelected = (pickup) => {
    setPickupStation(pickup);
  };

  const filteredStationData = stations.filter((item) =>
    item.toLowerCase().includes(stationSearch.toLowerCase())
  );
  const filteredDestinationData = stations.filter((item) =>
    item.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  const onSelectStation = (Pickup, destination) => {
    const coordinates = [Pickup, destination];
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/stations", { withCredentials: true })
      .then((res) => {
        console.log(res.data.data);

        let stations = [];
        let station_names = [];
        for (let [key, value] of Object.entries(res.data.data)) {
          station_names.push(Object.keys(value)[0]);
          stations.push(JSON.stringify(value));
        }
        setStations(station_names);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setRoute = () => {
    console.log(pickupStation, destination, fare);
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://localhost:5000/bus_route/",
        {
          pickupStation,
          destination,
          fare,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);

        navigation.navigate("BusBookings");
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
      <View>
        <SearchableList
          data={stations}
          value={pickupStation}
          placeholder="Pickup station"
          onItemSelected={pickupStationSelected}
        />
        <SearchableList
          data={stations}
          value={destination}
          placeholder="Destination"
          onItemSelected={destinationSelected}
        />
        <TextInput
          label="Set Fare"
          value={fare}
          returnKeyType="next"
          onChangeText={(text) => setFare(text)}
        />
        <Button mode="contained" onPress={setRoute}>
          Confirm
        </Button>
      </View>
    </Background>
  );
};

export default OpenBooking;
