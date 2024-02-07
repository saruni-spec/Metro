import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SaccoRegistration from "./pages/SaccoRegistration";
import SaccoPassword from "./pages/SaccoPassword";
import SaccoDashboard from "./pages/SaccoDashboard";
import BusRegistration from "./pages/BusRegistration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saccoRagistration" element={<SaccoRegistration />} />
        <Route path="/sacco_password" element={<SaccoPassword />} />
        <Route path="/sacco_dashboard" element={<SaccoDashboard />} />
        <Route path="/bus_registration" element={<BusRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
