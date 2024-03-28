import Background from "../components/Background";
import { useState } from "react";
import "./sacco.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddDriver = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const passwordMatch = password === confirmPassword;
  const emailValid = email.includes("@") && email.includes(".");

  const location = useLocation();

  const numberPlate = location.state.numberPlate;

  console.log(numberPlate);

  const handleLogin = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.1.108:5000/user_registration/driver_registration",
        {
          numberPlate: numberPlate,
          password: password,
          email: email,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setSuccessMessage("Driver added successfully!");
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
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div className="form">
          <div className="input-box">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="input-box">
            <label>Other Name</label>
            <input
              type="text"
              placeholder="Other Name"
              required
              onChange={(event) => setLastName(event.target.value)}
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
            {email !== "" && emailValid ? null : <div>Invalid email</div>}
          </div>
          <div className="input-box">
            <label>Phone Number</label>
            <input
              type="number"
              placeholder=""
              required
              value={
                phoneNumber && phoneNumber.startsWith("254")
                  ? phoneNumber
                  : `254${phoneNumber}`
              }
              onChange={(event) => {
                const inputValue = event.target.value;
                if (inputValue.startsWith("254")) {
                  setPhoneNumber(inputValue);
                } else {
                  setPhoneNumber(`254${inputValue}`);
                }
              }}
            />
          </div>
          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="input-box">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {passwordMatch ? null : <div>Passwords do not match</div>}
          </div>

          <button onClick={handleLogin}>Add</button>
        </div>
      </div>
    </Background>
  );
};

export default AddDriver;
