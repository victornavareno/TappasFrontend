import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Hero";
import Explorar from "./pages/Explorar";
import Podium from "./pages/Podium";
import Restaurant from "./pages/Restaurant"; // Importa el componente Restaurant

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/podium" element={<Podium />} />
        {/* Añade esta nueva ruta para los restaurantes */}
        <Route path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
