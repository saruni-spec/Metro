import "./dashboard.css";
import "./sacco.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../components/Background";

const SaccoDashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("http://192.168.4.61:5000/sacco_registration/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
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
      <ul className="nav">
        <li>
          <a href="/details">Sacco Details</a>
        </li>
        <li>
          <a href="/bus_registration">Register Buses</a>
        </li>

        <li>
          <a href="/report">View Sacco Reports</a>
        </li>
        <li>
          <button
            type="button"
            onClick={logout}
            style={{
              position: "fixed",
              top: "10px",
              left: "85%",
            }}
          >
            Logout
          </button>
        </li>
      </ul>
      <div>
        <h1>Welcome to Sacco Dashboard</h1>
      </div>
    </Background>
  );
};

export default SaccoDashboard;
