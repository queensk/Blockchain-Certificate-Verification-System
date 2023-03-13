import React, { useState } from "react";
import api from "../../api/api.jsx";
import TextInput from "../TextInput/TextInput";
import MessagePopUp from "../MessagePopUp/MessagePopUp";

export default function SignIn({ authenticated, setToken }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

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
      .post("/login", data)
      .then((response) => {
        localStorage.setItem("appCertificate", response.data.token);
        setToken(localStorage.getItem("appCertificate"));
      })
      .catch((error) => {
        localStorage.clear();
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
    </>
  );
}
