import { useContext } from "react";
import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Signup from "./pages/SignUp/SignUp";
import UserPage from "./pages/UserPage/UserPage";
import School from "./pages/School/School";
import { AuthContext } from "./CustomHooks/Context/AuthProvider";
import SignUpSchoolPage from "./pages/SignUpSchoolPage/SignUpSchoolPage";
import Admin from "./pages/Admin/Admin";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Unauthorized from "./components/Unauthorized/Unauthorized";
// import ProtectedRoute from "./pages/ProtectedRoute";

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
  console.log(authenticated);
  console.log(userRole);
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
  const {
    token,
    authenticated,
    userId,
    firstName,
    lastName,
    userRole,
    setToken,
    setAuthenticated,
  } = useContext(AuthContext);
  console.log(authenticated);
  console.log(userRole);
  const ROLES = {
    USER: "user",
    SCHOOL: "school",
    ADMIN: "admin",
  };
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
          {/* protected routes */}
          <Route path="/user/dashboard" element={<UserPageWrapper />} />
          <Route path="/school/dashboard" element={<SchoolWrapper />} />
          <Route path="/admin/dashboard" element={<AdminWrapper />} />
          {/* <Route
            path="/user/dashboard"
            element={
              <UserPage  />}
          />
          <Route
            path="/school/dashboard"
            element={
              <School />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <Admin />}
          /> */}
          {/* </Route> */}
          {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
{
  /* <Route
            path="/user/dashboard"
            element={<Private Component={UserPage} role="user" />}
          />
          <Route
            path="/school/dashboard"
            element={<Private Component={School} role="school" />}
          />
          <Route
            path="/admin/dashboard"
            element={<Private Component={Admin} role="admin" />}
          /> */
}

{
  /* <Route element={<RequireAuth allowedRoles={[ROLES.USER]} />}>
          <Route
            path="/user/dashboard"
            element={
              <UserPage
                userId={userId}
                firstName={firstName}
                lastName={lastName}
                setToken={setToken}
                setAuthenticated={setAuthenticated}
            }
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.SCHOOL]} />}>
          <Route
            path="/school/dashboard"
            element={
              <School
                userId={userId}
                firstName={firstName}
                lastName={lastName}
              />
            }
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin/dashboard" element={<Admin />} />
        </Route> */
}
{
  /* <Route
          path="/user/dashboard"
          element={
            <UserPage
              userId={userId}
              firstName={firstName}
              lastName={lastName}
              setToken={setToken}
              setAuthenticated={setAuthenticated}
            />
          }
        />
        <Route
          path="/school/dashboard"
          element={
            <School userId={userId} firstName={firstName} lastName={lastName} />
          }
        />
        <Route path="/admin/dashboard" element={<Admin />} /> */
}
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
