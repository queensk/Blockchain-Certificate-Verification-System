import React, { useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SignInAdmin from "../../components/AdminComponents/SignInAdmin/SignInAdmin";
import "./AdminSignup.css";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";

export default function AdminSignup() {
  const logInRef = useRef(null);
  const navigate = useNavigate();
  const { authenticated, userRole, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated && userRole === "admin") {
      navigate("/admin/dashboard");
    }
  }, [authenticated, navigate, userRole]);

  return (
    <div className="SignUpForm">
      <ul className="ToggleForm">
        <li ref={logInRef} className={"Tab active"}>
          Log In
        </li>
      </ul>
      <SignInAdmin
        authenticated={authenticated}
        setToken={setToken}
        userRole={userRole}
      />
    </div>
  );
}
