import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Hero";
import Explorar from "./pages/Explorar";
import Podium from "./pages/Podium";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/podium" element={<Podium />} />
      </Routes>
    </Router>
  );
}

export default App;
