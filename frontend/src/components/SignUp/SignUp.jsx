import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import api from "../../api/api.jsx";
import MessagePopUp from "../MessagePopUp/MessagePopUp";

export default function SignUpInput() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  const data = {
    email: userEmail,
    password: userPassword,
    first_name: firstName,
    last_name: lastName,
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !userEmail || !userPassword) {
      setSignUpMessage("Please fill out all fields.");
      return;
    }
    api
      .post("/users", data)
      .then((response) => {
        if (response.status === 201) {
          setSignUpMessage(`Successfully SignUp ${response.data.email}`);
          setUserPassword("");
          setUserEmail("");
          setLastName("");
          setFirstName("");
        }
      })
      .catch((error) => {
        if (error.request.status === 500) {
          setSignUpMessage(`Error occurred while connecting to the server`);
        } else {
          setSignUpMessage(`Ensure you input correct details`);
        }
      });
  };
  return (
    <>
      {signUpMessage && (
        <MessagePopUp message={signUpMessage} setMessage={setSignUpMessage} />
      )}
      <form onClick={(e) => e.preventDefault}>
        <div>
          <h1>Sign Up</h1>
        </div>
        <TextInput
          label="first name"
          type="text"
          name="name"
          placeholder="First Name"
          value={firstName}
          setValue={setFirstName}
        />
        <TextInput
          label="Last name"
          type="text"
          name="name"
          placeholder="Last Name"
          value={lastName}
          setValue={setLastName}
        />
        <TextInput
          label="email"
          type="email"
          name="email"
          placeholder="email"
          value={userEmail}
          setValue={setUserEmail}
        />
        <TextInput
          label="password"
          type="password"
          name="password"
          placeholder="********"
          value={userPassword}
          setValue={setUserPassword}
        />
        <button className="btn_login button-block" onClick={handleFormSubmit}>
          Sign Up
        </button>
      </form>
    </>
  );
}
