import Background from "../components/Background";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sacco.css";

const SaccoRegistration = () => {
  const [saccoName, setSaccoName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  let navigate = useNavigate();

  const handleRegister = () => {
    const details = {
      saccoName: saccoName,
      description: description,
      location: location,
      phoneNumber: phoneNumber,
      email: email,
    };
    navigate("/sacco_password", { state: { details } });
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
              onChange={(event) => setSaccoName(event.target.value)}
            />
          </div>
          <div className="input-box">
            <label>Description</label>
            <input
              type="text"
              placeholder="Sacco/Bus Description"
              required
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="column">
            <div className="input-box">
              <label>Phone Number</label>
              <input
                type="number"
                placeholder="Enter phone number"
                required
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="input-box address">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter address"
              required
              onChange={(event) => setLocation(event.target.value)}
            />
            <div className="column">
              <input type="text" placeholder="Enter your city" required />
            </div>
            <div className="column">
              <input type="text" placeholder="Enter your region" required />
            </div>
          </div>
          <button onClick={handleRegister}>Proceed</button>
        </div>
      </div>
    </Background>
  );
};

export default SaccoRegistration;
