import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";

const RequireAuth = ({ allowedRoles }) => {
  const { authenticated, userRole } = useContext(AuthContext);
  const location = useLocation();

  return [...userRole].find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : authenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
