import Background from "../components/Background";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sacco.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AddAdmin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();

  let navigate = useNavigate();
  const details = location.state.details;
  const handleLogin = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.1.108:5000/sacco_registration/add_admin",
        { password: password, email: email, sacco_email: details.email },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/sacco_password", { state: { details } });
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
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-box">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button onClick={handleLogin}>Add</button>
        </div>
      </div>
    </Background>
  );
};

export default AddAdmin;
