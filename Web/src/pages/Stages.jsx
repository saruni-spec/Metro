import Background from "../components/Background";
import axios from "axios";
import { useState } from "react";

const Stages = () => {
  const [station, setStation] = useState("");

  const addStage = () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios
      .post("http://192.168.4.61:5000/reg_stations/", { station })
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
            <label>Station</label>
            <input
              placeholder="Station Name"
              type="text"
              onChange={(event) => setStation(event.target.value)}
            />
          </div>

          <button onClick={addStage}>Register</button>
        </div>
      </div>
    </Background>
  );
};

export default Stages;
