import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SaccoRegistration from "./pages/SaccoRegistration";
import SaccoPassword from "./pages/SaccoPassword";
import SaccoDashboard from "./pages/SaccoDashboard";
import BusRegistration from "./pages/BusRegistration";
import MyRoutes from "./pages/Routes";
import RouteStations from "./pages/RouteStations";
import Stages from "./pages/Stages";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
