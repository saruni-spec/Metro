import Background from "../components/Background";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./sacco.css";

const SaccoPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const details = location.state.details;

  const handleRegister = () => {
    const updatedDetails = {
      ...details,
      password: password,
    };
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("http://192.168.1.108:5000/sacco_registration/", updatedDetails)
      .then((res) => {
        console.log(res);
        navigate("/sacco_dashboard");
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
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="input-box">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <button onClick={handleRegister}>Submit</button>
        </div>
      </div>
    </Background>
  );
};

export default SaccoPassword;
