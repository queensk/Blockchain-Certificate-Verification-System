import React, { useState } from "react";
import api from "../../api/api.jsx";
import TextInput from "../TextInput/TextInput";
import MessagePopUp from "../MessagePopUp/MessagePopUp";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../Loading/Loading.jsx";

export default function SignIn({ authenticated, setToken, token }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (authenticated) {
    navigate("/user/dashboard");
  }

  const handleSingIn = (event) => {
    event.preventDefault();
    if (!signInEmail || !signInPassword) {
      setSignUpMessage("Please fill out all fields.");
      return;
    }
    setIsLoading(true); // set isLoading state to true when API call is made
    const data = {
      userMail: signInEmail,
      password: signInPassword,
    };

    api
      .post("/login", data)
      .then((response) => {
        localStorage.setItem("appCertificate", response.data.token);
        setToken(localStorage.getItem("appCertificate"));
      })
      .then(() => {
        navigate("/user/dashboard");
      })
      .catch((error) => {
        setSignUpMessage("An error occurred while connecting th the server");
      })
      .finally(() => {
        setIsLoading(false); // set isLoading state back to false after API call is finished
      });
  };

  return (
    <>
      {isLoading && <LoadingAnimation />}
      {signUpMessage && (
        <MessagePopUp message={signUpMessage} setMessage={setSignUpMessage} />
      )}
      {!isLoading && (
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <h1>Sign In</h1>
          </div>
          <TextInput
            label="email"
            type="email"
            name="email"
            placeholder="email"
            value={signInEmail}
            setValue={setSignInEmail}
          />
          <TextInput
            label="password"
            type="password"
            name="password"
            placeholder="********"
            value={signInPassword}
            setValue={setSignInPassword}
          />
          <button className="btn_login button-block" onClick={handleSingIn}>
            Sign In
          </button>
        </form>
      )}
    </>
  );
}
