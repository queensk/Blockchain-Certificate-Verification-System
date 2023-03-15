import { useContext } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/SignUp/SignUp";
import UserPage from "./pages/UserPage/UserPage";
import School from "./pages/School/School";
import { AuthContext } from "./CustomHooks/Context/AuthProvider";
import SignUpSchoolPage from "./pages/SignUpSchoolPage/SignUpSchoolPage";
import Admin from "./pages/Admin/Admin";
import RequireAuth from "./components/RequireAuth/RequireAuth";

function App() {
  const {
    authenticated,
    userId,
    firstName,
    lastName,
    userRole,
    setToken,
    setAuthenticated,
  } = useContext(AuthContext);
  console.log(userRole);
  const ROLES = {
    User: "user",
    school: "school",
    Admin: 5150,
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Signup authenticated={authenticated} setToken={setToken} />}
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
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.school]} />}> */}
        <Route
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
        {/* </Route> */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.school]} />}> */}
        <Route
          path="/school/dashboard"
          element={
            <School userId={userId} firstName={firstName} lastName={lastName} />
          }
        />
        {/* </Route> */}
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
