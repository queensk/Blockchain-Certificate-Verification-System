import React, { useState } from "react";
import api from "../../api/api.jsx";
import TextInput from "../TextInput/TextInput";
import MessagePopUp from "../MessagePopUp/MessagePopUp";
import { useNavigate } from "react-router-dom";

export default function SignInSchool({ authenticated, setToken, userRole }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const navigate = useNavigate();

  if (authenticated && userRole === "school") {
    navigate("/school/dashboard");
  }

  const handleSingIn = (event) => {
    event.preventDefault();
    if (!signInEmail || !signInPassword) {
      setSignUpMessage("Please fill out all fields.");
      return;
    }
    const data = {
      userMail: signInEmail,
      password: signInPassword,
    };

    api
      .post("/login-admin", data)
      .then((response) => {
        localStorage.setItem("appCertificate", response.data.token);
        setToken(localStorage.getItem("appCertificate"));
      })
      // .then(() => {
      //   navigate("/school/dashboard");
      // })
      .catch((error) => {
        console.log(error);
        setSignUpMessage("An error occurred while connecting th the server");
      });
  };

  return (
    <>
      {signUpMessage && (
        <MessagePopUp message={signUpMessage} setMessage={setSignUpMessage} />
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h1>Sign In</h1>
        </div>
        <TextInput
          label="school email"
          type="school email"
          name="school email"
          placeholder="school email"
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
    </>
  );
}
