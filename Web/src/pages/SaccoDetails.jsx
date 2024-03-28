import axios from "axios";
import Background from "../components/Background";
import { useEffect, useState } from "react";

const SaccoDetails = () => {
  const [details, setDetails] = useState(null);

  const [saccoName, setSaccoName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const getDetails = () => {
    console.log("details");
    axios
      .get("http://192.168.1.108:5000/sacco_registration/details", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);

        setDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleEdit = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.1.108:5000/sacco_registration/update",
        {
          name: saccoName,
          description: description,
          location: location,
          phone: phoneNumber,
          email: email,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        getDetails();
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
      {details && (
        <div>
          <div className="form">
            <div className="input-box">
              <label>Name</label>
              <input
                type="text"
                placeholder="Sacco/Bus Name"
                defaultValue={details.Name}
                required
                onChange={(event) => setSaccoName(event.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Description</label>
              <input
                type="text"
                placeholder="Sacco/Bus Description"
                defaultValue={details.Description}
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
                  defaultValue={details.phoneNumber}
                  required
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </div>
              <div className="input-box">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  defaultValue={details.email}
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
                defaultValue={details.location}
                required
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
            <button onClick={handleEdit}>Edit</button>
          </div>
        </div>
      )}
    </Background>
  );
};

export default SaccoDetails;
