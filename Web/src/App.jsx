import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SaccoRegistration from "./pages/SaccoRegistration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saccoRagistration" element={<SaccoRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
