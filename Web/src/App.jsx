import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SaccoRegistration from "./pages/SaccoRegistration";
import SaccoPassword from "./pages/SaccoPassword";
import SaccoDashboard from "./pages/SaccoDashboard";
import BusRegistration from "./pages/BusRegistration";
import MyRoutes from "./pages/Routes";
import RouteStations from "./pages/RouteStations";
import Stages from "./pages/Stages";
import SaccoLogin from "./pages/SaccoLogin";
import SaccoDetails from "./pages/SaccoDetails";
import AddAdmin from "./pages/AddAdmin";
import Sacco_Report from "./pages/Sacco_Report";
import Admin from "./pages/Admin";
import AddDriver from "./pages/AddDriver";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saccoRagistration" element={<SaccoRegistration />} />
        <Route path="/sacco_password" element={<SaccoPassword />} />
        <Route path="/sacco_dashboard" element={<SaccoDashboard />} />
        <Route path="/bus_registration" element={<BusRegistration />} />
        <Route path="/route_registration" element={<MyRoutes />} />
        <Route path="/route_stations" element={<RouteStations />} />
        <Route path="/stages" element={<Stages />} />
        <Route path="/login" element={<SaccoLogin />} />
        <Route path="/details" element={<SaccoDetails />} />
        <Route path="/add_admin" element={<AddAdmin />} />
        <Route path="/report" element={<Sacco_Report />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add_driver" element={<AddDriver />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
