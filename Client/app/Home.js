import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
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
import Booking from "./Booking";
import Drawer from "../components/Drawer";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const [myStation, setMyStation] = useState({});
  const [mydestination, setMyDestination] = useState({});

  return region ? (
    <Background>
      <MapView
        style={{
          flex: 1,
          width: "100%",
          height: "50%",
        }}
        region={region}
        showsUserLocation={true}
      >
        {Object.keys(myStation).length !== 0 && (
          <Marker
            coordinate={{
              latitude: Object.values(myStation)[0][0],
              longitude: Object.values(myStation)[0][1],
            }}
            title={`Pickup ${Object.keys(myStation)[0]}`}
            description="My Pickup Station"
          />
        )}
        {Object.keys(mydestination).length !== 0 && (
          <Marker
            coordinate={{
              latitude: Object.values(mydestination)[0][0],
              longitude: Object.values(mydestination)[0][1],
            }}
            title={`Destination: ${Object.keys(mydestination)[0]}`}
            description="My Destination"
          />
        )}
      </MapView>
      <SafeAreaView style={{ height: "10%" }}>
        <Drawer>
          {step === 1 && (
            <SearchBus
              nextStep={nextStep}
              busdata={setBusData}
              setMyStation={setMyStation}
              setMyDestination={setMyDestination}
            />
          )}
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
        </Drawer>
      </SafeAreaView>
    </Background>
  ) : null;
};

const SearchBus = ({ nextStep, busdata, setMyDestination, setMyStation }) => {
  const navigation = useNavigation();
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState({ value: "", active: "" });
  const activeInputRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://192.168.222.61:5000/stations", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);

        setStations(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [stationSearch, setStationSearch] = useState("");

  const filteredStationData = stations.filter((item) =>
    Object.keys(item)[0].toLowerCase().includes(search.value.toLowerCase())
  );

  const onSelectStation = (Pickup, destination) => {
    const coordinates = [Pickup, destination];
  };
  const [pickupStation, setPickupStation] = useState("");
  const [destination, setDestination] = useState("");

  const findVehicle = () => {
    console.log(pickupStation, destination, "here");
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.222.61:5000/find_bus/",
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
    const place = Object.keys(item)[0];
    if (search.active === "pickupStation") {
      setPickupStation(place);
      setMyStation(item);
      console.log(item, place, "pickupStation");
    } else if (search.active === "destination") {
      setDestination(place);
      setMyDestination(item);
      console.log(item, place, "destination");
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
    <View style={{ width: "100%", padding: 20, zIndex: 1 }}>
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
              <Text>{Object.keys(item)[0]}</Text>
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

const BookBus = ({ nextStep, prevStep, busdata, selectedBus }) => {
  console.log(busdata, "BookBus");

  const bookingDetails = (item) => {
    console.log(item, "item");
    selectedBus(item);
    nextStep();
  };
  return (
    <View style={{ width: "100%", padding: 20, height: "80%", zIndex: 1 }} on>
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
