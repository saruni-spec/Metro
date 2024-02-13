import Background from "../components/Background";
import axios from "axios";
import { useState } from "react";

const MyRoutes = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [distance, setDistance] = useState(0);

  const addRoute = () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios
      .post("http://localhost:5000/add_route/", { start, end, distance })
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
            <label>Start Point</label>
            <input
              placeholder="From"
              type="text"
              onChange={(event) => setStart(event.target.value)}
            />
          </div>

          <div className="input-box">
            <label>End Point</label>
            <input
              placeholder="To"
              type="text"
              onChange={(event) => setEnd(event.target.value)}
            />
          </div>
          <div className="input-box">
            <label>Distance</label>
            <input
              placeholder="Distance"
              type="number"
              onChange={(event) => setDistance(event.target.value)}
            />
          </div>
          <button onClick={addRoute}>Register</button>
        </div>
      </div>
    </Background>
  );
};

export default MyRoutes;
