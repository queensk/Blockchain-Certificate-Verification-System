import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SignUpSchool from "../../components/SignUpSchool/SignUpSchool";
import SignInSchool from "../../components/SignInSchool/SignInSchool";
import "./SignUpSchoolPage.css";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";

export default function SignUpSchoolPage() {
  const signUpRef = useRef(null);
  const logInRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(true);
  const navigate = useNavigate();
  const { authenticated, userRole, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated && userRole === "school") {
      navigate("/school/dashboard");
    }
  }, [authenticated, navigate, userRole]);

  function handleTabClick(event) {
    if (event.target === signUpRef.current) {
      setShowSignUp(true);
    } else if (event.target === logInRef.current) {
      setShowSignUp(false);
    }
  }

  return (
    <div className="SignUpForm">
      <ul className="ToggleForm">
        <li
          ref={signUpRef}
          className={showSignUp ? "Tab active" : "Tab"}
          onClick={handleTabClick}
        >
          Sign Up
        </li>
        <li
          ref={logInRef}
          className={!showSignUp ? "Tab active" : "Tab"}
          onClick={handleTabClick}
        >
          Log In
        </li>
      </ul>
      {showSignUp ? (
        <SignUpSchool setShowSignUp={setShowSignUp} />
      ) : (
        <SignInSchool
          authenticated={authenticated}
          setToken={setToken}
          userRole={userRole}
        />
      )}
    </div>
  );
}
