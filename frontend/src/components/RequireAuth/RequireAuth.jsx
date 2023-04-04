import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";

const RequireAuth = ({ allowedRoles }) => {
  const { authenticated, userRole } = useContext(AuthContext);
  const location = useLocation();

  return authenticated && [...userRole].find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : authenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
// authenticated && userRole === "user" ? (
//   <Navigate to="/user/dashboard" state={{ from: location }} replace />
// ) : authenticated && userRole === "school" ? (
//   <Navigate to="/school/dashboard" state={{ from: location }} replace />
// ) : authenticated && userRole === "admin" ? (
//   <Navigate to="/school/dashboard" state={{ from: location }} replace />
// ) : authenticated ? (
//   <Navigate to="/unauthorized" state={{ from: location }} replace />
// ) : (
//   <Navigate to="/" state={{ from: location }} replace />
// );
