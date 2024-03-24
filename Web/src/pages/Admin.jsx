import axios from "axios";
import { useState, useEffect } from "react";
import "./sacco.css";
import { downloadCsv } from "../core/DownloadCsv";

const Admin = () => {
  const [showComponent, setShowComponent] = useState("");

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => {
            setShowComponent("routes");
          }}
        >
          Routes
        </button>
        <button
          type="button"
          onClick={() => {
            setShowComponent("bookings");
          }}
        >
          Bookings
        </button>
        <button
          type="button"
          onClick={() => {
            setShowComponent("buses");
          }}
        >
          Buses
        </button>
        <button
          type="button"
          onClick={() => {
            setShowComponent("stations");
          }}
        >
          Stations
        </button>
        <button
          type="button"
          onClick={() => {
            setShowComponent("transactions");
          }}
        >
          Transactions
        </button>
        <button
          type="button"
          onClick={() => {
            setShowComponent("passengers");
          }}
        >
          Users
        </button>
        <button
          type="button"
          onClick={() => {
            setShowComponent("trips");
          }}
        >
          Trips
        </button>
      </div>
      {showComponent === "routes" && <Route />}
      {showComponent === "bookings" && <Booking />}
      {showComponent === "buses" && <Bus />}
      {showComponent === "stations" && <Stage />}
      {showComponent === "transactions" && <Transaction />}
      {showComponent === "passengers" && <Passenger />}
      {showComponent === "trips" && <Trip />}
    </div>
  );
};

// Booking.js
const Booking = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.4.61:5000/admin/bookings")
      .then((res) => {
        setBookings(res.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Booking ID
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Pickup Point
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Destination
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Vehicle Plate
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Trip ID</th>
        </tr>
        {bookings.map((booking, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {booking.booking_id}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {booking.email}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {booking.phone}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {booking.date}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {booking.time}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {booking.pickup_point}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {booking.destination}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {booking.vehicle_plate}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {booking.Status}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {booking.trip_id}{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Route.js
const Route = () => {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.4.61:5000/admin/routes")
      .then((res) => {
        setRoutes(res.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Route ID</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Distance</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Endpoints
          </th>
        </tr>
        {routes.map((route, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {route.route_id}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {route.route_distance}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {route.route_name}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {JSON.stringify(route.endpoints)}{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Stage.js
const Stage = () => {
  const [stations, setStations] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.4.61:5000/admin/stations")
      .then((res) => {
        setStations(res.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Stage ID</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Latitude</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Longitude
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Description
          </th>
        </tr>
        {stations.map((stage, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {stage.stage_id}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {stage.latitude}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {stage.longitude}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {stage.stage_name}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {stage.stage_description}{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Transaction.js
const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.4.61:5000/admin/transactions")
      .then((res) => {
        setTransactions(res.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Transaction ID
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Vehicle ID
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Booking ID
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Amount</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rating</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Phone Number
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
        </tr>

        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {transaction.transaction_id}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {transaction.email}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {transaction.vehicle_id}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {transaction.date}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {transaction.time}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {transaction.booking_id}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {transaction.amount}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {transaction.rating}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {transaction.phone_number}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {transaction.status}{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Trip.js
const Trip = () => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.4.61:5000/admin/trips")
      .then((res) => {
        setTrips(res.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Trip ID</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Vehicle Plate
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Route</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Start Point
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Available Seats
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Booked Seats
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fare</th>
        </tr>
        {trips.map((trip, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {trip.trip_id}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {trip.vehicle_plate}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {trip.route}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {trip.ongoing ? "Ongoing" : "Completed"}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {trip.start_point}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {trip.available_seats}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {trip.booked_seats}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {trip.date}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {trip.time}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {trip.fare}{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// User.js
const Passenger = () => {
  const [passengers, setPassengers] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.4.61:5000/admin/passengers")
      .then((res) => {
        setPassengers(res.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>User ID</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            First Name
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Other Name
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Role</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Date Registered
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Sacco ID</th>
        </tr>
        {passengers.map((passenger, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {passenger.user_id}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {passenger.first_name}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {passenger.other_name}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {passenger.email}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {passenger.phone}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {passenger.role}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {passenger.date_registered}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {passenger.sacco_id}{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Vehicle.js
const Bus = () => {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.4.61:5000/admin/vehicles")
      .then((res) => {
        setVehicles(res.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Vehicle Type
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Plate Number
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Capacity</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Sacco ID</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Driver ID
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Date Registered
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Balance</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rating</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fare</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
        </tr>
        {vehicles.map((vehicle, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {vehicle.vehicle_type}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {vehicle.no_plate}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {vehicle.capacity}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {vehicle.sacco_id}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {vehicle.driver_id}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {vehicle.date_registered}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {vehicle.balance}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {vehicle.rating}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {vehicle.fare}{" "}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {" "}
              {vehicle.is_active ? "Active" : "Inactive"}{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Admin;
