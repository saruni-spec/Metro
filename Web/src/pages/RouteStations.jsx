import Background from "../components/Background";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchableList from "../components/SearchableList";

const RoutesStations = () => {
  const [currentStations, setCurrentStations] = useState([]);
  const [stations, setStations] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedStations, setSelectedStations] = useState([]);
  const [route, setRoute] = useState("");

  const SearchItem = (item) => {
    setRoute(item);
    console.log(item, "item");
  };

  const addStation = (station) => {
    setCurrentStations([...currentStations, station]);
    console.log(currentStations);
    setSelectedStations(currentStations);
    console.log(selectedStations + "selectedStations");
  };

  useEffect(() => {
    axios
      .get("http://192.168.4.61:5000/get_routes/")
      .then((res) => {
        let route_names = [];
        for (let [key, value] of Object.entries(res.data.data)) {
          route_names.push(Object.keys(value)[0]);
        }
        setRoutes(route_names);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });

    axios
      .get("http://192.168.4.61:5000/stations")
      .then((res) => {
        console.log(res.data.data);

        let station_names = [];
        for (let [key, value] of Object.entries(res.data.data)) {
          station_names.push(Object.keys(value)[0]);
        }
        setStations(station_names);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addStations = () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios
      .post("http://192.168.4.61:5000/add_stations/", {
        route,
        currentStations,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  return (
    <Background>
      <div>
        <div className="form">
          <div className="input-box">
            <label>Route</label>
            <SearchableList
              data={routes}
              placeholder="From-To"
              onItemSelect={SearchItem}
            />
          </div>

          <div className="input-box">
            <label>Station</label>
            <SearchableList
              data={stations}
              placeholder="Station Name"
              onItemSelect={addStation}
            />
          </div>
          <div className="output-box">
            <label>Stations</label>
            <ul>
              {currentStations.map((station, index) => (
                <li key={index}>{station}</li>
              ))}
            </ul>
          </div>
          <button onClick={addStations}>Add All</button>
        </div>
      </div>
    </Background>
  );
};

export default RoutesStations;
