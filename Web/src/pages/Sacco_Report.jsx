import { useEffect, useState } from "react";
import Background from "../components/Background";
import axios from "axios";
import "./sacco.css";
import { useNavigate } from "react-router-dom";
import { downloadCsv } from "../core/DownloadCsv";

const Sacco_Report = () => {
  let navigate = useNavigate();

  const [report, setReport] = useState(null);
  const headers = [
    "Vehicle",
    "Driver",
    "Total_trips",
    "Total_income",
    "Total_bookings",
    "Trips_today",
    "Income_today",
    "Bookings_today",
  ];

  const getReport = () => {
    axios
      .get("http://192.168.1.108:5000/sacco_registration/report", {
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

  const changeDriver = (numberPlate) => {
    navigate("/add_driver", { state: { numberPlate: numberPlate } });
  };

  const handleCsvDownload = () => {
    downloadCsv(report, "Sacco_Report", headers);
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
      <button onClick={handleCsvDownload}>Download Report</button>
      {report && (
        <table
          className="table"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {header}
                </th>
              ))}
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {report.map((item, key) => (
              <tr key={key}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.vehicle}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.driver}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.Total_trips}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.Total_income}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.Total_bookings}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.Trips_today}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.Income_today}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.Bookings_today}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    type="button"
                    onClick={() => changeDriver(item.vehicle)}
                  >
                    Change Driver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!report && <p>No Report</p>}
    </Background>
  );
};

export default Sacco_Report;
