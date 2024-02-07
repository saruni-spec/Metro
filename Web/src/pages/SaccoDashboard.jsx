import "./dashboard.css";
import "./sacco.css";
import { useNavigate } from "react-router-dom";

const SaccoDashboard = () => {
  return (
    <>
      <ul className="nav">
        <li>
          <a href="#">Sacco Details</a>
        </li>
        <li>
          <a href="/bus_registration">Buses</a>
        </li>
        <li>
          <a href="#">Transactions</a>
        </li>
        <li>
          <a href="#">View Sacco Reports</a>
        </li>
      </ul>
      <div>
        <h1>Welcome to Sacco Dashboard</h1>
      </div>
    </>
  );
};

export default SaccoDashboard;
