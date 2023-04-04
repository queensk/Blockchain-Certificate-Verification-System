import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../CustomHooks/Context/AuthProvider";
// Define the roles that exist in the system
const ROLES = {
  USER: "user",
  SCHOOL: "school",
  ADMIN: "admin",
};

// Define a higher-order component that will check the user's role before allowing access
function ProtectedRoute({ role, component: Component, ...rest }) {
  const { authenticated, userRole } = useContext(AuthContext);

  // If the user's role matches the required role, render the component
  // Otherwise, redirect the user to the login page
  return authenticated && userRole === role ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/" replace />
  );
}
export default ProtectedRoute;

// Define the routes that are protected by role-based authentication
{
  /* <ProtectedRoute
  path="/user/dashboard"
  role={ROLES.USER}
  component={UserPage}
  userId={userId}
  firstName={firstName}
  lastName={lastName}
  setToken={setToken}
  setAuthenticated={setAuthenticated}
/>
<ProtectedRoute
  path="/school/dashboard"
  role={ROLES.SCHOOL}
  component={School}
  userId={userId}
  firstName={firstName}
  lastName={lastName}
/>
<ProtectedRoute
  path="/admin/dashboard"
  role={ROLES.ADMIN}
  component={Admin}
/> */
}
