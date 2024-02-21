import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { Alert } from "react-native";
import SearchableList from "../components/searchable";
import Background from "../components/Background";
import TextInput from "../components/input";
import List from "../components/List";
import TextOutput from "../components/TextOutput";
import Button from "../components/Button";
import { theme } from "../core/theme";
import styles from "../core/styles";
import Transaction from "./Transaction";

const Home = () => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      );
    })();
  }, []);

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const [busdata, setBusData] = useState([]);
  const [selectedBus, setSelectedBus] = useState({});

  return region ? (
    <Background>
      <MapView
        style={{
          flex: 1,
          width: "100%",
          height: "50%",
        }}
        region={region}
      />
      {step === 1 && <SearchBus nextStep={nextStep} busdata={setBusData} />}
      {step === 2 && (
        <BookBus
          nextStep={nextStep}
          prevStep={prevStep}
          busdata={busdata}
          selectedBus={setSelectedBus}
        />
      )}
      {step === 3 && (
        <Booking
          prevStep={prevStep}
          nextStep={nextStep}
          selectedBus={selectedBus}
        />
      )}
      {step === 4 && (
        <Transaction prevStep={prevStep} selectedBus={selectedBus} />
      )}
    </Background>
  ) : null;
};

const SearchBus = ({ nextStep, busdata }) => {
  const navigation = useNavigation();
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState({ value: "", active: "" });
  const activeInputRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://192.168.0.104:5000/stations", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);

        let mystations = [];
        let station_names = [];
        for (let [key, value] of Object.entries(res.data.data)) {
          station_names.push(Object.keys(value)[0]);
          mystations.push(JSON.stringify(value));
        }
        setStations(station_names);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [stationSearch, setStationSearch] = useState("");

  const filteredStationData = stations.filter((item) =>
    item.toLowerCase().includes(search.value.toLowerCase())
  );

  const onSelectStation = (Pickup, destination) => {
    const coordinates = [Pickup, destination];
  };
  const [pickupStation, setPickupStation] = useState("");
  const [destination, setDestination] = useState("");

  const findVehicle = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.0.104:5000/find_bus/",
        {
          pickupStation,
          destination,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.data[0], "data here");
        busdata(res.data.data);
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
              "No bus found",
              [{ text: "OK", onPress: () => {} }],
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

  const onSelect = (item) => {
    if (search.active === "pickupStation") {
      setPickupStation(item);
      console.log(item, "pickupStation");
    } else if (search.active === "destination") {
      setDestination(item);
      console.log(item, "destination");
    }

    setSearch({ value: "", active: "" });
  };

  const pickupSearch = (text) => {
    setPickupStation(text);
    setSearch({ value: text, active: "pickupStation" });
  };
  const destinationSearch = (text) => {
    setDestination(text);
    setSearch({ value: text, active: "destination" });
  };

  return (
    <View style={{ width: "100%", padding: 20, height: "80%", zIndex: 1 }}>
      <TextInput
        label="Pickup Station"
        returnKeyType="next"
        value={pickupStation}
        onChangeText={(text) => pickupSearch(text)}
        onFocus={() => (activeInputRef.current = "pickupStation")}
        autoCapitalize="none"
      />
      <TextInput
        label="Destination"
        returnKeyType="next"
        value={destination}
        onChangeText={(text) => destinationSearch(text)}
        onFocus={() => (activeInputRef.current = "destination")}
        autoCapitalize="none"
      />
      {search.value !== "" && (
        <FlatList
          data={filteredStationData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={styles.listItem}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Button mode="contained" onPress={findVehicle}>
        Confirm
      </Button>
    </View>
  );
};

import Booking from "./Booking";

const BookBus = ({ nextStep, prevStep, busdata, selectedBus }) => {
  console.log(busdata, "BookBus");

  const bookingDetails = (item) => {
    console.log(item, "item");
    selectedBus(item);
    nextStep();
  };
  return (
    <View style={{ width: "100%", padding: 20, height: "80%", zIndex: 1 }}>
      <FlatList
        style={styles.output}
        data={busdata}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => bookingDetails(item)}
            style={styles.listItem}
          >
            <Text>
              {item.trip.route},{item.trip.vehicle}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home;
