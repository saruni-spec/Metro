import Background from "../components/Background";

import { useState } from "react";
import axios from "axios";
import "./sacco.css";

const SaccoRegistration = () => {
  const [saccoName, setSaccoName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("http://localhost:5000/sacco_registration/", {
        saccoName,
        description,
        location,
        phoneNumber,
        email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Background>
      <div>
        <div className="form">
          <div className="input-box">
            <label>Name</label>
            <input
              type="text"
              placeholder="Sacco/Bus Name"
              required
              onChange={(text) => setSaccoName(text)}
            />
          </div>
          <div className="input-box">
            <label>Description</label>
            <input
              type="text"
              placeholder="Sacco/Bus Description"
              required
              onChange={(text) => setDescription(text)}
            />
          </div>
          <div className="column">
            <div className="input-box">
              <label>Phone Number</label>
              <input
                type="number"
                placeholder="Enter phone number"
                required
                onChange={(text) => setPhoneNumber(text)}
              />
            </div>
            <div className="input-box">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(text) => setEmail(text)}
              />
            </div>
          </div>

          <div className="input-box address">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter address"
              required
              onChange={(text) => setLocation(text)}
            />
            <div className="column">
              <input type="text" placeholder="Enter your city" required />
            </div>
            <div className="column">
              <input type="text" placeholder="Enter your region" required />
            </div>
          </div>
          <button onClick={handleRegister}>Submit</button>
        </div>
      </div>
    </Background>
  );
};

export default SaccoRegistration;
