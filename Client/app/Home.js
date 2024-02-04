import { View, TextInput, FlatList, Text } from "react-native";
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

const Home = () => {
  const mapRef = useRef();
  const [stations, setStations] = useState([]);

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

    axios
      .get("http://localhost:5000/stations")
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

  return (
    <Background>
      <View ref={mapRef} style={{ width: "80%", height: "80%" }}></View>
      <View>
        <SearchableList data={stations} placeholder="Pickup station" />
        <SearchableList data={stations} placeholder="Destination" />
      </View>
    </Background>
  );
};

export default Home;
