import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import UserSelection from "./pages/UserSelection";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HostDashboard from "./pages/HostDashboard";
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
        <Route path="/userSelection" element={<UserSelection />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}

        {/* Protected Routes for Hosts */}
        <Route element={<ProtectedRoute allowedRoles={["host"]} />}>
          <Route path="/hostDashboard" element={<HostDashboard />} />
        </Route>

        {/* Protected Routes for Subscribers */}
        <Route element={<ProtectedRoute allowedRoles={["subscriber"]} />}>
          <Route path="/explorar-eventos" element={<EventsExplorer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
