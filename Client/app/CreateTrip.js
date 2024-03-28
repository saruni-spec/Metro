import React, { useState, useEffect, useRef, useCallback } from "react";
import Background from "../components/Background";
import SearchableList from "../components/searchable";
import axios from "axios";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import TextInput from "../components/input";
import Button from "../components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "../core/styles";
import { Picker } from "@react-native-picker/picker";
import TextOutput from "../components/TextOutput";
import { Alert } from "react-native";

const CreateTrip = () => {
  const [trip, setTrip] = useState({});

  const check_trip = () => {
    axios
      .get("http://192.168.212.61:5000/bus_route/check_trip", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);

        if (res.data.data) {
          console.log(res.data.data);
          setTrip(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useFocusEffect(
    useCallback(() => {
      check_trip();
    }, [])
  );

  console.log(trip, "trip");

  return (
    <Background>
      {Object.keys(trip).length !== 0 ? (
        <CurrenTrip trip={trip} setTrip={setTrip} />
      ) : (
        <OpenBooking setTrip={setTrip} />
      )}
    </Background>
  );
};

const OpenBooking = ({ setTrip }) => {
  const navigation = useNavigation();
  const [stations, setStations] = useState([]);
  const [fare, setFare] = useState(0);
  const [pickupStation, setPickupStation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [search, setSearch] = useState({ value: "", active: "" });
  const activeInputRef = useRef(null);
  const [showList, setShowList] = useState(false);

  const onSelectStation = (Pickup, destination) => {
    const coordinates = [Pickup, destination];
  };

  useEffect(() => {
    axios
      .get("http://192.168.212.61:5000/stations", {
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
  const filteredStationData = stations.filter((item) =>
    Object.keys(item)[0].toLowerCase().includes(search.value.toLowerCase())
  );
  console.log(filteredStationData, "filteredStationData");
  const setRoute = () => {
    console.log(pickupStation, destination, fare);
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.212.61:5000/bus_route/",
        {
          pickupStation,
          destination,
          fare,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);

        setTrip(res.data.data);
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
              "Route doesnt exist",
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

  const pickupSearch = (text) => {
    setPickupStation(text);
    setSearch({ value: text, active: "pickupStation" });
  };
  const destinationSearch = (text) => {
    setDestination(text);
    setSearch({ value: text, active: "destination" });
  };

  const onSelect = (item) => {
    const place = Object.keys(item)[0];
    if (search.active === "pickupStation") {
      setPickupStation(place);

      console.log(item, place, "pickupStation");
    } else if (search.active === "destination") {
      setDestination(place);

      console.log(item, place, "destination");
    }

    setSearch({ value: "", active: "" });
  };

  const focusInput = (input) => {
    activeInputRef.current = input;
    setSearch({ value: "", active: input });
    setShowList(true);
  };
  console.log(
    showList,
    "showList",
    search.active,
    "search.active",
    filteredStationData,
    "filteredStationData"
  );

  return (
    <ScrollView style={{ width: "100%", padding: 20, zIndex: 1 }}>
      <TextInput
        label="Pickup Station"
        returnKeyType="next"
        value={pickupStation}
        onChangeText={(text) => pickupSearch(text)}
        onFocus={() => focusInput("pickupStation")}
        autoCapitalize="none"
      />
      <TextOutput>From : {pickupStation}</TextOutput>

      {showList && search.active === "pickupStation" && (
        <View>
          {filteredStationData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(item)}
              style={styles.listItem}
            >
              <Text>{Object.keys(item)[0]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TextInput
        label="Destination"
        returnKeyType="next"
        value={destination}
        onChangeText={(text) => destinationSearch(text)}
        onFocus={() => focusInput("destination")}
        autoCapitalize="none"
      />
      <TextOutput>To : {destination}</TextOutput>
      {showList && search.active === "destination" && (
        <View>
          {filteredStationData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(item)}
              style={styles.listItem}
            >
              <Text>{Object.keys(item)[0]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TextInput
        label="Set Fare in Kshs"
        value={fare.toString()} // Convert to string
        returnKeyType="next"
        keyboardType="number-pad"
        onChangeText={(text) => setFare(text)}
      />

      <Button mode="contained" onPress={setRoute}>
        Confirm
      </Button>
    </ScrollView>
  );
};

const CurrenTrip = ({ trip, setTrip }) => {
  const navigation = useNavigation();

  const newTrip = (index) => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.212.61:5000/bus_route/close_trip",
        { index: index },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setTrip({});
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
    <View style={{ flex: 1, padding: 20 }}>
      <View
        style={{
          marginBottom: 20,
          borderStyle: "solid",
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Current Trip</Text>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Route : {trip.route}
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Fare : {trip.fare} Ksh
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Depature Time : {trip.depature_time}
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Available Seats : {trip.available_seats}
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Button
          icon="card-plus-outline"
          mode="contained"
          onPress={() => newTrip(0)}
        >
          Complete Trip
        </Button>
        <Button icon="cancel" mode="contained" onPress={() => newTrip(1)}>
          Cancel Trip
        </Button>
      </View>
    </View>
  );
};

export default CreateTrip;
