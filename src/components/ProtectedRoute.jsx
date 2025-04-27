import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const role = localStorage.getItem("role");

  // Allow access if user is already logged in
  if (role && allowedRoles.includes(role)) {
    return <Outlet />;
  }

  // Allow role-based navigation before login (for role selection)
  if (location.state?.role && allowedRoles.includes(location.state.role)) {
    return <Outlet />;
  }

  // If role is missing or not allowed, redirect to login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
