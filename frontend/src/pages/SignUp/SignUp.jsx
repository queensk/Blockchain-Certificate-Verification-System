import React, { useState, useRef } from "react";
import SignUpInput from "../../components/SignUp/SignUp";
import SignIn from "../../components/SignIn/SignIn";
import "./SignUp.css";

export default function SignUp() {
  const signUpRef = useRef(null);
  const logInRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(true);

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
      {showSignUp ? <SignUpInput /> : <SignIn />}
    </div>
  );
}
