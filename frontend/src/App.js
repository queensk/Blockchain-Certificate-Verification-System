import { useContext } from "react";
import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Signup from "./pages/SignUp/SignUp";
import UserPage from "./pages/UserPage/UserPage";
import School from "./pages/School/School";
import { AuthContext } from "./CustomHooks/Context/AuthProvider";
import SignUpSchoolPage from "./pages/SignUpSchoolPage/SignUpSchoolPage";
import Admin from "./pages/Admin/Admin";
import VerifyCertificate from "./pages/VerifyCertificate/VerifyCertificate";
import AdminSignup from "./pages/AdminSignup/AdminSignup";
// import RequireAuth from "./components/RequireAuth/RequireAuth";
// import Unauthorized from "./components/Unauthorized/Unauthorized";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  userRole,
  allowedRoles,
  ...rest
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

const UserPageWrapper = () => {
  const { authenticated, userRole } = useContext(AuthContext);

  return (
    <ProtectedRoute
      isAuthenticated={authenticated}
      userRole={userRole}
      allowedRoles={["user"]}
      component={UserPage}
    />
  );
};

const SchoolWrapper = () => {
  const { authenticated, userRole } = useContext(AuthContext);
  return (
    <ProtectedRoute
      isAuthenticated={authenticated}
      userRole={userRole}
      allowedRoles={["school"]}
      component={School}
    />
  );
};

const AdminWrapper = () => {
  const { authenticated, userRole } = useContext(AuthContext);

  return (
    <ProtectedRoute
      isAuthenticated={authenticated}
      userRole={userRole}
      allowedRoles={["admin"]}
      component={Admin}
    />
  );
};

function App() {
  const { token, authenticated, setToken } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Signup
                authenticated={authenticated}
                setToken={setToken}
                token={token}
              />
            }
          />
          <Route path="/verify" element={<VerifyCertificate />} />
          {/* public routes */}
          <Route
            path="/school/signup"
            element={
              <SignUpSchoolPage
                authenticated={authenticated}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/admin/signup"
            element={
              <AdminSignup authenticated={authenticated} setToken={setToken} />
            }
          />
          {/* protected routes */}
          <Route path="/user/dashboard" element={<UserPageWrapper />} />
          <Route path="/school/dashboard" element={<SchoolWrapper />} />
          <Route path="/admin/dashboard" element={<AdminWrapper />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
