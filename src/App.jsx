import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Hero"; // Asegúrate de que la importación sea correcta
import Explorar from "./pages/Explorar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública principal */}
        <Route path="/" element={<Landing />} />

        {/* Ruta pública para explorar */}
        <Route path="/explorar" element={<Explorar />} />
      </Routes>
    </Router>
  );
}

export default App;
