import Background from "../components/Background";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sacco.css";
import axios from "axios";

const SaccoLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  let navigate = useNavigate();

  const handleLogin = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.1.108:5000/sacco_registration/login",
        { password: password, email: email },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.role, "role");
        if (res.data.role === "sacco") {
          navigate("/sacco_dashboard");
        } else {
          navigate("/admin");
        }
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

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </Background>
  );
};

export default SaccoLogin;
