import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import ProtectedRoute from "./components/ProtectedRoute";
import EventsExplorer from "./pages/EventsExplorer";
// import SubscriberDashboard from "./pages/SubscriberDashboard";
// import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        {/* Protected Routes for Hosts */}

        {/* Protected Routes for Subscribers */}
        <Route element={<ProtectedRoute allowedRoles={["subscriber"]} />}>
          <Route path="/explorar-eventos" element={<EventsExplorer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
