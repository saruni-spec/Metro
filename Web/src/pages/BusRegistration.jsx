import { useState } from "react";
import axios from "axios";
import "./sacco.css";
import { useNavigate } from "react-router-dom";

import Background from "../components/Background";

const BusRegistration = () => {
  let navigate = useNavigate();

  const [numberPlate, setNumberPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("bus");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("http://192.168.1.108:5000/bus_registration/", {
        numberPlate,
        capacity,
        vehicleType,
      })
      .then((res) => {
        console.log(res);
        navigate("/add_driver", { state: { numberPlate: numberPlate } });
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
          setSuccessMessage("Error registering vehicle!");
        }
      });
  };

  function isValidNumberPlate(numberPlate) {
    const regex = /^K[A-Z]{2}\s[0-9]{3}[A-Z]$/;
    return regex.test(numberPlate);
  }

  return (
    <Background>
      <a
        href="/sacco_dashboard"
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          padding: "5px",
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      >
        Home
      </a>
      <div>
        <div className="form">
          <div className="input-box">
            <label>Number Plate</label>
            <input
              placeholder="Number Plate"
              type="text"
              onChange={(event) => setNumberPlate(event.target.value)}
            />
            {numberPlate !== "" && isValidNumberPlate(numberPlate) ? null : (
              <div className="error">Invalid number plate</div>
            )}
          </div>
          <div className="input-box">
            <label>Vehicle Type</label>
            <select onChange={(event) => setVehicleType(event.target.value)}>
              <option value="bus">Bus</option>
              <option value="mini Bus">Matatu</option>
            </select>
          </div>
          <div className="input-box">
            <label>Capacity</label>
            <input
              placeholder="Capacity"
              type="number"
              onChange={(event) => setCapacity(event.target.value)}
            />
          </div>

          {successMessage && <div className="success">{successMessage}</div>}
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </Background>
  );
};

export default BusRegistration;
