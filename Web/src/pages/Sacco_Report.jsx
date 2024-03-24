import { useEffect, useState } from "react";
import Background from "../components/Background";
import axios from "axios";
import "./sacco.css";

const Sacco_Report = () => {
  const [report, setReport] = useState(null);

  const getReport = () => {
    axios
      .get("http://192.168.4.61:5000/sacco_registration/report", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);

        setReport(res.data.data);

        console.log(report[0], "report");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReport();
  }, []);

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
      {report && (
        <ul className="noList">
          {report.map((item, key) => (
            <li key={key}>
              <div>
                <p>Vehicle: {item.vehicle}</p>
                <p>Driver: {item.driver}</p>
                <p>Total trips: {item.Total_trips}</p>
                <p>Total earning: {item.Total_income}</p>
                <p>Total Bookings: {item.Total_bookings}</p>
                <p>Trips Today :{item.Trips_today}</p>
                <p>Income Today :{item.Income_today}</p>
                <p>Bookings Today :{item.Bookings_today}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!report && <p>No Report</p>}
    </Background>
  );
};

export default Sacco_Report;
