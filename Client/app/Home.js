import { View, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import OLView from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Geolocation from "ol/Geolocation";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import axios from "axios";
import { set } from "ol/transform";
import SearchableList from "../components/searchable";
import Background from "../components/Background";
import { LineString } from "ol/geom";
import TextOutput from "../components/TextOutput";
import Button from "../components/Button";
import { theme } from "../core/theme";
import styles from "../core/styles";

const Home = () => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      target: mapRef.current, // Render the map inside the ref
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new OLView({
        center: [0, 0],
        zoom: 16,
      }),
    });

    // Create a geolocation object
    const geolocation = new Geolocation({
      // enable High-Accuracy
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: map.getView().getProjection(),
    });

    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: "#3399CC",
          }),
          stroke: new Stroke({
            color: "#fff",
            width: 2,
          }),
        }),
      })
    );

    // Create a vector source and add the feature to it
    const positionSource = new VectorSource({
      features: [positionFeature],
    });

    // Create a vector layer and add it to the map
    const positionLayer = new VectorLayer({
      source: positionSource,
    });
    map.addLayer(positionLayer);

    // Listen to changes in position
    geolocation.on("change", function () {
      const coordinates = geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
      map.getView().setCenter(coordinates);
    });

    // Start tracking the user's location
    geolocation.setTracking(true);
  }, []);

  const [coordinates, setCoordinates] = useState([]);

  // Create a LineString feature for the route
  const route = new LineString(coordinates);
  route.transform("EPSG:4326", "EPSG:3857"); // Transform from WGS 84 to Web Mercator

  // Create a vector source and add the route feature to it
  const vectorSource = new VectorSource({
    features: [new Feature(route)],
  });

  // Create a vector layer and add it to the map
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      stroke: new Stroke({
        color: "#ff0000", // Red
        width: 2,
      }),
    }),
  });

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const [busdata, setBusData] = useState([]);
  const [selectedBus, setSelectedBus] = useState({});

  return (
    <Background>
      <View ref={mapRef} style={{ width: "90%", height: "50%" }}></View>
      {step === 1 && <SearchBus nextStep={nextStep} busdata={setBusData} />}
      {step === 2 && (
        <BookBus
          nextStep={nextStep}
          prevStep={prevStep}
          busdata={busdata}
          selectedBus={setSelectedBus}
        />
      )}
      {step === 3 && <Booking prevStep={prevStep} selectedBus={selectedBus} />}
    </Background>
  );
};

const SearchBus = ({ nextStep, busdata }) => {
  const navigation = useNavigation();
  const [stations, setStations] = useState([]);
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
  const [stationSearch, setStationSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");

  const filteredStationData = stations.filter((item) =>
    item.toLowerCase().includes(stationSearch.toLowerCase())
  );
  const filteredDestinationData = stations.filter((item) =>
    item.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  const onSelectStation = (Pickup, destination) => {
    const coordinates = [Pickup, destination];
  };
  const [pickupStation, setPickupStation] = useState("");
  const [destination, setDestination] = useState("");

  destinationSelected = (destination) => {
    setDestination(destination);
  };

  pickupStationSelected = (pickup) => {
    setPickupStation(pickup);
  };

  const findVehicle = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://localhost:5000/find_bus/",
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
    <View>
      <FlatList
        style={styles.output}
        data={busdata}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => bookingDetails(item)}>
            <TextOutput>
              {item.trip.route},{item.trip.vehicle}
            </TextOutput>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home;
